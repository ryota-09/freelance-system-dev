import * as v from 'valibot';

// Contact Form Validation Schema
export const contactFormSchema = v.object({
  companyName: v.pipe(
    v.string('会社名は必須です'),
    v.minLength(1, '会社名は必須です'),
    v.maxLength(200, '会社名は200文字以内で入力してください')
  ),
  contactName: v.pipe(
    v.string('お名前は必須です'),
    v.minLength(1, 'お名前は必須です'),
    v.maxLength(100, 'お名前は100文字以内で入力してください')
  ),
  email: v.pipe(
    v.string('メールアドレスは必須です'),
    v.email('有効なメールアドレスを入力してください'),
    v.maxLength(255, 'メールアドレスは255文字以内で入力してください')
  ),
  phone: v.pipe(
    v.string('電話番号は必須です'),
    v.regex(/^[0-9-]+$/, '電話番号は数字とハイフンのみで入力してください'),
    v.maxLength(50, '電話番号は50文字以内で入力してください')
  ),
  location: v.pipe(
    v.string('所在地は必須です'),
    v.minLength(1, '所在地は必須です'),
    v.maxLength(100, '所在地は100文字以内で入力してください')
  ),
  inquiryType: v.picklist(
    ['web', 'system', 'maintenance', 'multiple'],
    'お問い合わせ種別を選択してください'
  ),
  projectGoals: v.pipe(
    v.array(
      v.picklist([
        'lead-generation',
        'recruitment',
        'efficiency',
        'ec-sales',
        'multilingual',
        'branding',
        'reservation-system',
        'customer-management',
        'other',
      ])
    ),
    v.minLength(1, 'プロジェクトの目的を最低1つ選択してください'),
    v.maxLength(10, 'プロジェクトの目的は10個まで選択できます')
  ),
  budgetRange: v.picklist(
    ['under-300k', '300k-500k', '500k-1m', '1m-3m', 'over-3m', 'undecided'],
    'ご予算を選択してください'
  ),
  desiredTimeline: v.pipe(
    v.string('希望納期は必須です'),
    v.minLength(1, '希望納期は必須です'),
    v.maxLength(500, '希望納期は500文字以内で入力してください')
  ),
  referenceSiteUrls: v.optional(
    v.pipe(
      v.array(v.pipe(v.string(), v.url('有効なURLを入力してください'))),
      v.maxLength(5, '参考サイトURLは5つまで登録できます')
    )
  ),
  subsidyConsultation: v.boolean('補助金相談の有無を選択してください'),
  preferredContactMethod: v.picklist(
    ['email', 'phone', 'line'],
    '希望連絡方法を選択してください'
  ),
  message: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(2000, 'メッセージは2000文字以内で入力してください')
    )
  ),
});

export type ContactFormData = v.InferOutput<typeof contactFormSchema>;

// Booking Form Validation Schema
export const bookingFormSchema = v.object({
  companyName: v.pipe(
    v.string('会社名は必須です'),
    v.minLength(1, '会社名は必須です'),
    v.maxLength(200, '会社名は200文字以内で入力してください')
  ),
  contactName: v.pipe(
    v.string('お名前は必須です'),
    v.minLength(1, 'お名前は必須です'),
    v.maxLength(100, 'お名前は100文字以内で入力してください')
  ),
  email: v.pipe(
    v.string('メールアドレスは必須です'),
    v.email('有効なメールアドレスを入力してください'),
    v.maxLength(255, 'メールアドレスは255文字以内で入力してください')
  ),
  phone: v.pipe(
    v.string('電話番号は必須です'),
    v.regex(/^[0-9-]+$/, '電話番号は数字とハイフンのみで入力してください'),
    v.maxLength(50, '電話番号は50文字以内で入力してください')
  ),
  preferredFormat: v.picklist(
    ['online', 'in-person'],
    '相談形式を選択してください'
  ),
  preferredDateRanges: v.pipe(
    v.array(
      v.object({
        startDate: v.pipe(
          v.string('開始日時は必須です'),
          v.isoDateTime('有効な日時形式で入力してください')
        ),
        endDate: v.pipe(
          v.string('終了日時は必須です'),
          v.isoDateTime('有効な日時形式で入力してください')
        ),
        timeOfDay: v.picklist(
          ['morning', 'afternoon', 'evening', 'anytime'],
          '時間帯を選択してください'
        ),
      })
    ),
    v.minLength(1, '希望日時を最低1つ選択してください'),
    v.maxLength(5, '希望日時は5つまで選択できます')
  ),
  needsDescription: v.pipe(
    v.string('相談内容は必須です'),
    v.minLength(1, '相談内容は必須です'),
    v.maxLength(1000, '相談内容は1000文字以内で入力してください')
  ),
  location: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(100, '場所は100文字以内で入力してください')
    )
  ),
});

export type BookingFormData = v.InferOutput<typeof bookingFormSchema>;
