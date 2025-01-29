'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}

export default function PricingModal({ isOpen, onClose, courseId }: PricingModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handlePayment = async (tier: 'hobby' | 'enterprise') => {
    try {
      // 模拟支付过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/course/${courseId}`);
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-50">
        <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">支付确认</h2>
            <p className="mt-2 text-balance text-3xl font-semibold tracking-tight text-gray-900">
              确认购买此课程？
            </p>
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => handlePayment('hobby')}
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              确认支付
            </button>
            <button
              onClick={onClose}
              className="rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 