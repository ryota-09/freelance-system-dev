import { NextRequest, NextResponse } from 'next/server';
import * as v from 'valibot';
import { bookingFormSchema } from '@/lib/validations';
import { sendBookingConfirmation, sendBookingNotification } from '@/lib/email';

// Rate limiting: Simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // More restrictive for bookings

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Booking API Route
 * POST /api/booking
 * Handles consultation booking submissions with validation and email sending
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate with Valibot using safeParse
    const result = v.safeParse(bookingFormSchema, body);

    if (!result.success) {
      // Extract validation errors
      const errors = result.issues.map((issue) => ({
        path: issue.path?.map((p) => p.key).join('.'),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    const validatedData = result.output;

    // Validate location for in-person consultations (Fukui Prefecture only)
    if (validatedData.preferredFormat === 'in-person') {
      if (!validatedData.location) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: [{ path: 'location', message: '対面相談の場合、場所の入力は必須です' }],
          },
          { status: 400 }
        );
      }

      // Check if location is in Fukui Prefecture
      if (!validatedData.location.includes('福井')) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: [
              {
                path: 'location',
                message: '対面相談は福井県内のみ対応しております。オンライン相談をご検討ください。',
              },
            ],
          },
          { status: 400 }
        );
      }
    }

    // Send confirmation email to client
    try {
      await sendBookingConfirmation({
        companyName: validatedData.companyName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        preferredFormat: validatedData.preferredFormat,
        needsDescription: validatedData.needsDescription,
      });
    } catch (emailError) {
      console.error('Error sending booking confirmation email:', emailError);
      // Continue even if confirmation email fails
    }

    // Send booking notification to freelancer
    try {
      await sendBookingNotification({
        companyName: validatedData.companyName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        preferredFormat: validatedData.preferredFormat,
        preferredDateRanges: validatedData.preferredDateRanges,
        needsDescription: validatedData.needsDescription,
        location: validatedData.location,
      });
    } catch (emailError) {
      console.error('Error sending booking notification email:', emailError);
      // This is critical - return error if notification fails
      return NextResponse.json(
        {
          error: 'Failed to send booking notification. Please try again or contact us directly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'ご予約を承りました。確認メールをお送りしましたので、ご確認ください。1営業日以内に日程調整のご連絡をいたします。',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing booking:', error);

    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
