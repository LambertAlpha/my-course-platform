'use client'

import React, { useState } from 'react'

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecharge: (amount: number) => void;
}

const PRESET_AMOUNTS = [
  { value: 50, label: '¥50' },
  { value: 100, label: '¥100' },
  { value: 200, label: '¥200' },
  { value: 500, label: '¥500' },
  { value: 1000, label: '¥1000' },
];

export default function RechargeModal({ isOpen, onClose, onRecharge }: RechargeModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  if (!isOpen) return null;

  const handleRecharge = () => {
    const amount = isCustom ? Number(customAmount) : selectedAmount;
    if (amount && amount > 0) {
      onRecharge(amount);
      onClose();
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允许输入数字和小数点
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-50">
        <div className="relative top-20 mx-auto max-w-xl bg-white rounded-xl shadow-lg p-6">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">关闭</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">账户充值</h2>

          {/* 预设金额选项 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount.value}
                onClick={() => {
                  setSelectedAmount(amount.value);
                  setIsCustom(false);
                }}
                className={`
                  py-3 px-4 rounded-lg text-center transition-colors
                  ${!isCustom && selectedAmount === amount.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }
                `}
              >
                {amount.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsCustom(true);
                setSelectedAmount(null);
              }}
              className={`
                py-3 px-4 rounded-lg text-center transition-colors
                ${isCustom
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }
              `}
            >
              自定义
            </button>
          </div>

          {/* 自定义金额输入框 */}
          {isCustom && (
            <div className="mb-6">
              <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
                输入充值金额
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">¥</span>
                </div>
                <input
                  type="text"
                  id="custom-amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="block w-full rounded-md border-0 py-3 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}

          {/* 充值按钮 */}
          <button
            onClick={handleRecharge}
            disabled={!selectedAmount && !customAmount}
            className={`
              w-full py-3 px-4 rounded-lg text-white text-center transition-colors
              ${(!selectedAmount && !customAmount)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
              }
            `}
          >
            确认充值
          </button>

          <p className="mt-4 text-sm text-gray-500 text-center">
            充值金额将实时到账，如遇问题请联系客服
          </p>
        </div>
      </div>
    </div>
  )
} 