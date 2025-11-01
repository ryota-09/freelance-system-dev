'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { bookingFormSchema, type BookingFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Booking Form Component
 * Implements consultation booking form with Valibot validation
 */
export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [showLocationField, setShowLocationField] = React.useState(false);
  const [dateRanges, setDateRanges] = React.useState<
    Array<{ startDate: string; endDate: string; timeOfDay: string }>
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<BookingFormData>({
    resolver: valibotResolver(bookingFormSchema),
    defaultValues: {
      preferredFormat: 'online',
      preferredDateRanges: [],
    },
  });

  const preferredFormat = watch('preferredFormat');

  React.useEffect(() => {
    setShowLocationField(preferredFormat === 'in-person');
  }, [preferredFormat]);

  const addDateRange = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const newRange = {
      startDate: today.toISOString(),
      endDate: tomorrow.toISOString(),
      timeOfDay: 'anytime' as const,
    };

    const updatedRanges = [...dateRanges, newRange];
    setDateRanges(updatedRanges);
    setValue('preferredDateRanges', updatedRanges);
  };

  const removeDateRange = (index: number) => {
    const updatedRanges = dateRanges.filter((_, i) => i !== index);
    setDateRanges(updatedRanges);
    setValue('preferredDateRanges', updatedRanges);
  };

  const updateDateRange = (index: number, field: 'startDate' | 'endDate' | 'timeOfDay', value: string) => {
    const updatedRanges = dateRanges.map((range, i) =>
      i === index ? { ...range, [field]: value } : range
    );
    setDateRanges(updatedRanges);
    setValue('preferredDateRanges', updatedRanges);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/booking', {
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
          message: result.message || 'ご予約を承りました',
        });
        reset();
        setDateRanges([]);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="booking-companyName">
          会社名 <span className="text-red-500">*</span>
        </Label>
        <Input id="booking-companyName" {...register('companyName')} />
        {errors.companyName && (
          <p className="text-sm text-red-500" role="alert">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div className="space-y-2">
        <Label htmlFor="booking-contactName">
          お名前 <span className="text-red-500">*</span>
        </Label>
        <Input id="booking-contactName" {...register('contactName')} />
        {errors.contactName && (
          <p className="text-sm text-red-500" role="alert">
            {errors.contactName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="booking-email">
          メールアドレス <span className="text-red-500">*</span>
        </Label>
        <Input id="booking-email" type="email" {...register('email')} />
        {errors.email && (
          <p className="text-sm text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="booking-phone">
          電話番号 <span className="text-red-500">*</span>
        </Label>
        <Input id="booking-phone" type="tel" {...register('phone')} placeholder="090-1234-5678" />
        {errors.phone && (
          <p className="text-sm text-red-500" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Preferred Format */}
      <div className="space-y-2">
        <Label>
          相談形式 <span className="text-red-500">*</span>
        </Label>
        <Select
          onValueChange={(value) => {
            setValue('preferredFormat', value as 'online' | 'in-person');
            trigger('preferredFormat');
          }}
          defaultValue="online"
          name="preferredFormat"
        >
          <SelectTrigger id="preferredFormat" name="preferredFormat">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">オンライン（Zoom・Google Meet）</SelectItem>
            <SelectItem value="in-person">対面（福井県内のみ）</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferredFormat && (
          <p className="text-sm text-red-500" role="alert">
            {errors.preferredFormat.message}
          </p>
        )}
      </div>

      {/* Location (conditional) */}
      {showLocationField && (
        <div className="space-y-2">
          <Label htmlFor="booking-location">
            場所 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="booking-location"
            {...register('location')}
            placeholder="福井県福井市○○町"
          />
          {errors.location && (
            <p className="text-sm text-red-500" role="alert">
              {errors.location.message}
            </p>
          )}
          <p className="text-sm text-gray-500">
            ※対面相談は福井県内のみ対応しております
          </p>
        </div>
      )}

      {/* Preferred Date Ranges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>
            希望日時 <span className="text-red-500">*</span>
          </Label>
          <Button type="button" variant="outline" size="sm" onClick={addDateRange}>
            + 日時を追加
          </Button>
        </div>

        {dateRanges.map((range, index) => (
          <div key={index} className="space-y-2 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm">候補日時 {index + 1}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDateRange(index)}
              >
                削除
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor={`startDate-${index}`} className="text-sm">
                  開始
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="datetime-local"
                  value={range.startDate.slice(0, 16)}
                  onChange={(e) =>
                    updateDateRange(index, 'startDate', new Date(e.target.value).toISOString())
                  }
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor={`endDate-${index}`} className="text-sm">
                  終了
                </Label>
                <Input
                  id={`endDate-${index}`}
                  type="datetime-local"
                  value={range.endDate.slice(0, 16)}
                  onChange={(e) =>
                    updateDateRange(index, 'endDate', new Date(e.target.value).toISOString())
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor={`timeOfDay-${index}`} className="text-sm">
                時間帯
              </Label>
              <Select
                onValueChange={(value) => updateDateRange(index, 'timeOfDay', value)}
                defaultValue={range.timeOfDay}
              >
                <SelectTrigger id={`timeOfDay-${index}`}>
                  <SelectValue placeholder="時間帯を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">午前（9:00-12:00）</SelectItem>
                  <SelectItem value="afternoon">午後（13:00-17:00）</SelectItem>
                  <SelectItem value="evening">夕方（17:00-19:00）</SelectItem>
                  <SelectItem value="anytime">いつでも可</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}

        {dateRanges.length === 0 && (
          <p className="text-sm text-gray-500">
            「+ 日時を追加」ボタンから希望日時を追加してください（最大5つまで）
          </p>
        )}

        {errors.preferredDateRanges && (
          <p className="text-sm text-red-500" role="alert">
            {errors.preferredDateRanges.message}
          </p>
        )}
      </div>

      {/* Needs Description */}
      <div className="space-y-2">
        <Label htmlFor="needsDescription">
          相談内容 <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="needsDescription"
          {...register('needsDescription')}
          rows={5}
          placeholder="どのようなことについて相談されたいですか？"
        />
        {errors.needsDescription && (
          <p className="text-sm text-red-500" role="alert">
            {errors.needsDescription.message}
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
        {isSubmitting ? '送信中...' : '無料相談を予約する'}
      </Button>
    </form>
  );
}
