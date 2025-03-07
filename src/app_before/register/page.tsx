'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    return email.endsWith('@link.cuhk.edu.cn')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 验证邮箱格式
    if (!validateEmail(email)) {
      setError('请使用CUHK(SZ)邮箱注册')
      return
    }

    // 验证密码
    if (password.length < 6) {
      setError('密码长度至少为6位')
      return
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    try {
      setLoading(true)
      
      // 发送验证码
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '验证码发送失败')
      }

      // 存储注册信息到localStorage，供验证页面使用
      localStorage.setItem('registerEmail', email)
      localStorage.setItem('registerPassword', password)

      // 跳转到验证码页面
      router.push('/verify')
    } catch (error) {
      console.error('发送验证码失败:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('验证码发送失败，请稍后重试')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            注册 CUHK(SZ) 学习平台
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            请使用您的CUHK(SZ)邮箱注册
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                CUHK(SZ) 邮箱
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="student@link.cuhk.edu.cn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                确认密码
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? '发送验证码中...' : '发送验证码'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            已有账号？{' '}
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              返回登录
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 