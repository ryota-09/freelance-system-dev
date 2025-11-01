import { NextRequest, NextResponse } from 'next/server';
import * as v from 'valibot';
import { contactFormSchema } from '@/lib/validations';
import { sendContactConfirmation, sendContactNotification } from '@/lib/email';

// Rate limiting: Simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

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
 * Contact Form API Route
 * POST /api/contact
 * Handles contact form submissions with validation and email sending
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
    const result = v.safeParse(contactFormSchema, body);

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

    // Send confirmation email to client
    try {
      await sendContactConfirmation({
        companyName: validatedData.companyName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        inquiryType: validatedData.inquiryType,
        message: validatedData.message,
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue even if confirmation email fails
    }

    // Send notification email to freelancer
    try {
      await sendContactNotification({
        companyName: validatedData.companyName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        location: validatedData.location,
        inquiryType: validatedData.inquiryType,
        projectGoals: validatedData.projectGoals,
        budgetRange: validatedData.budgetRange,
        desiredTimeline: validatedData.desiredTimeline,
        message: validatedData.message,
      });
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // This is critical - return error if notification fails
      return NextResponse.json(
        {
          error: 'Failed to send notification email. Please try again or contact us directly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: '確認メールをお送りしました。1営業日以内にご連絡いたします。',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

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
