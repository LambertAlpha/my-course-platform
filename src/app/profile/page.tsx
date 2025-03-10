'use client'

import { useState } from 'react'
import Image from 'next/image'
import RechargeModal from '../components/RechargeModal'
import { PRESET_AVATARS_LIST } from '../utils/avatarGenerator'

interface UserProfile {
  name: string;
  email: string;
  balance: number;
  avatar: string;
  purchasedCourses: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "快乐冰激凌",
    email: "zhangsan@example.com",
    balance: 1000,
    avatar: "/images/avatars/preset-1.jpg",
    purchasedCourses: 3,
  });

  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profile.name);
  const [isSelectingAvatar, setIsSelectingAvatar] = useState(false);

  const handleRecharge = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  const handleNameSubmit = () => {
    if (newName.trim()) {
      setProfile(prev => ({
        ...prev,
        name: newName.trim()
      }));
      setIsEditingName(false);
    }
  };

  const handleAvatarSelect = (avatarPath: string) => {
    setProfile(prev => ({
      ...prev,
      avatar: avatarPath
    }));
    setIsSelectingAvatar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 个人信息卡片 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-indigo-600">
            <h3 className="text-lg font-medium leading-6 text-white">个人主页</h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0 relative group">
                <Image
                  className="h-20 w-20 rounded-full cursor-pointer"
                  src={profile.avatar}
                  alt="用户头像"
                  width={80}
                  height={80}
                  onClick={() => setIsSelectingAvatar(true)}
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-sm">更换头像</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  {isEditingName ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={handleNameSubmit}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        确定
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-indigo-600 hover:text-indigo-500 text-sm"
                      >
                        修改昵称
                      </button>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            {/* 头像选择弹窗 */}
            {isSelectingAvatar && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">选择头像</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {PRESET_AVATARS_LIST.map((avatar, index) => (
                      <div
                        key={index}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => handleAvatarSelect(avatar)}
                      >
                        <Image
                          src={avatar}
                          alt={`头像 ${index + 1}`}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsSelectingAvatar(false)}
                    className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}

            {/* 账户信息卡片 */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* 余额卡片 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">分豆豆余额</dt>
                        <dd className="text-lg font-medium text-gray-900">{profile.balance} 豆</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button
                      onClick={() => setIsRechargeModalOpen(true)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      充值分豆豆
                    </button>
                  </div>
                </div>
              </div>

              {/* 已购课程卡片 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">已购课程</dt>
                        <dd className="text-lg font-medium text-gray-900">{profile.purchasedCourses} 门</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">查看全部</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近购买的课程列表 */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">最近购买的课程</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {/* 这里可以循环显示最近购买的课程 */}
            </ul>
          </div>
        </div>
      </div>

      {/* 充值模态框 */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onRecharge={handleRecharge}
        currentBalance={profile.balance}
      />
    </div>
  )
} 