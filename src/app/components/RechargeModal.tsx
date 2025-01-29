'use client'

import React, { useState } from 'react'

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecharge: (amount: number) => void;
  currentBalance?: number;
}

const RECHARGE_OPTIONS = [
  { coins: 24, price: 6, discount: '' },
  { coins: 128, price: 30, originalPrice: 32, discount: '9.5折' },
  { coins: 424, price: 98, originalPrice: 106, discount: '9.2折' },
  { coins: 1280, price: 288, originalPrice: 320, discount: '9.0折' },
  { coins: 2352, price: 518, originalPrice: 588, discount: '8.8折' },
  { coins: 3752, price: 798, originalPrice: 938, discount: '8.5折' },
];

export default function RechargeModal({ isOpen, onClose, onRecharge, currentBalance = 0 }: RechargeModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleRecharge = () => {
    if (selectedAmount) {
      // 找到对应的充值选项
      const selectedOption = RECHARGE_OPTIONS.find(option => option.price === selectedAmount);
      if (selectedOption) {
        // 传递分豆豆数量而不是价格
        onRecharge(selectedOption.coins);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">我的钱包</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">关闭</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 text-2xl">
          <span className="text-yellow-500">●</span>
          <span className="font-bold">{currentBalance}</span>
          <span className="text-gray-500 text-base">我的分豆豆</span>
        </div>

        <div className="mb-6">
          <div className="text-lg font-medium mb-2">充值金额</div>
          <div className="grid grid-cols-2 gap-4">
            {RECHARGE_OPTIONS.map((option) => (
              <div
                key={option.coins}
                onClick={() => setSelectedAmount(option.price)}
                className={`
                  p-4 rounded-lg border cursor-pointer relative
                  ${selectedAmount === option.price ? 'border-indigo-600' : 'border-gray-200'}
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">●</span>
                  <span className="text-xl font-semibold">{option.coins}</span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-900">¥{option.price}</span>
                  {option.originalPrice && (
                    <span className="text-gray-400 line-through ml-2">¥{option.originalPrice}</span>
                  )}
                </div>
                {option.discount && (
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {option.discount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleRecharge}
          disabled={!selectedAmount}
          className={`
            w-full py-3 rounded-md text-white font-semibold
            ${selectedAmount 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-gray-300 cursor-not-allowed'}
          `}
        >
          确认充值
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          充值金额将实时到账，如遇问题请联系客服
        </p>
      </div>
    </div>
  )
} 