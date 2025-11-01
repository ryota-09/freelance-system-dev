'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Contact Form Component
 * Implements inquiry form with Valibot validation
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: valibotResolver(contactFormSchema),
    defaultValues: {
      projectGoals: [],
      subsidyConsultation: false,
    },
  });

  const projectGoals = watch('projectGoals') || [];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || '確認メールをお送りしました',
        });
        reset(); // Clear form on success
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'エラーが発生しました。もう一度お試しください。',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'ネットワークエラーが発生しました。もう一度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProjectGoal = (goal: string) => {
    const current = projectGoals;
    const updated = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    setValue('projectGoals', updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">
          会社名 <span className="text-red-500">*</span>
        </Label>
        <Input id="companyName" {...register('companyName')} />
        {errors.companyName && (
          <p className="text-sm text-red-500" role="alert">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div className="space-y-2">
        <Label htmlFor="contactName">
          お名前 <span className="text-red-500">*</span>
        </Label>
        <Input id="contactName" {...register('contactName')} />
        {errors.contactName && (
          <p className="text-sm text-red-500" role="alert">
            {errors.contactName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          メールアドレス <span className="text-red-500">*</span>
        </Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && (
          <p className="text-sm text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">
          電話番号 <span className="text-red-500">*</span>
        </Label>
        <Input id="phone" type="tel" {...register('phone')} placeholder="090-1234-5678" />
        {errors.phone && (
          <p className="text-sm text-red-500" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">
          所在地 <span className="text-red-500">*</span>
        </Label>
        <Input id="location" {...register('location')} placeholder="福井県福井市" />
        {errors.location && (
          <p className="text-sm text-red-500" role="alert">
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Inquiry Type */}
      <div className="space-y-2">
        <Label htmlFor="inquiryType">
          お問い合わせ種別 <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={(value) => setValue('inquiryType', value as any)}>
          <SelectTrigger id="inquiryType">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web制作</SelectItem>
            <SelectItem value="system">システム開発</SelectItem>
            <SelectItem value="maintenance">保守運用</SelectItem>
            <SelectItem value="multiple">複数のサービス</SelectItem>
          </SelectContent>
        </Select>
        {errors.inquiryType && (
          <p className="text-sm text-red-500" role="alert">
            {errors.inquiryType.message}
          </p>
        )}
      </div>

      {/* Project Goals */}
      <div className="space-y-2">
        <Label>
          プロジェクトの目的 <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'lead-generation', label: '集客・リード獲得' },
            { value: 'recruitment', label: '採用強化' },
            { value: 'efficiency', label: '業務効率化' },
            { value: 'ec-sales', label: 'EC販売' },
            { value: 'multilingual', label: '多言語対応' },
            { value: 'branding', label: 'ブランディング' },
            { value: 'reservation-system', label: '予約システム' },
            { value: 'customer-management', label: '顧客管理' },
            { value: 'other', label: 'その他' },
          ].map((goal) => (
            <div key={goal.value} className="flex items-center space-x-2">
              <Checkbox
                id={`goal-${goal.value}`}
                checked={projectGoals.includes(goal.value)}
                onCheckedChange={() => toggleProjectGoal(goal.value)}
              />
              <Label htmlFor={`goal-${goal.value}`} className="font-normal">
                {goal.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.projectGoals && (
          <p className="text-sm text-red-500" role="alert">
            {errors.projectGoals.message}
          </p>
        )}
      </div>

      {/* Budget Range */}
      <div className="space-y-2">
        <Label htmlFor="budgetRange">
          ご予算 <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={(value) => setValue('budgetRange', value as any)}>
          <SelectTrigger id="budgetRange">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-300k">30万円未満</SelectItem>
            <SelectItem value="300k-500k">30万円〜50万円</SelectItem>
            <SelectItem value="500k-1m">50万円〜100万円</SelectItem>
            <SelectItem value="1m-3m">100万円〜300万円</SelectItem>
            <SelectItem value="over-3m">300万円以上</SelectItem>
            <SelectItem value="undecided">未定</SelectItem>
          </SelectContent>
        </Select>
        {errors.budgetRange && (
          <p className="text-sm text-red-500" role="alert">
            {errors.budgetRange.message}
          </p>
        )}
      </div>

      {/* Desired Timeline */}
      <div className="space-y-2">
        <Label htmlFor="desiredTimeline">
          希望納期 <span className="text-red-500">*</span>
        </Label>
        <Input id="desiredTimeline" {...register('desiredTimeline')} placeholder="例: 3ヶ月以内" />
        {errors.desiredTimeline && (
          <p className="text-sm text-red-500" role="alert">
            {errors.desiredTimeline.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2">
        <Label htmlFor="preferredContactMethod">
          希望連絡方法 <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={(value) => setValue('preferredContactMethod', value as any)}>
          <SelectTrigger id="preferredContactMethod">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">メール</SelectItem>
            <SelectItem value="phone">電話</SelectItem>
            <SelectItem value="line">LINE</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferredContactMethod && (
          <p className="text-sm text-red-500" role="alert">
            {errors.preferredContactMethod.message}
          </p>
        )}
      </div>

      {/* Subsidy Consultation */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="subsidyConsultation"
          checked={watch('subsidyConsultation')}
          onCheckedChange={(checked) => setValue('subsidyConsultation', checked as boolean)}
        />
        <Label htmlFor="subsidyConsultation" className="font-normal">
          補助金の相談も希望する
        </Label>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">その他ご要望（任意）</Label>
        <Textarea
          id="message"
          {...register('message')}
          rows={5}
          placeholder="具体的なご要望やご質問がありましたらご記入ください"
        />
        {errors.message && (
          <p className="text-sm text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Status */}
      {submitStatus && (
        <div
          className={`rounded-md p-4 ${
            submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
          role="alert"
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : 'お問い合わせを送信'}
      </Button>
    </form>
  );
}
