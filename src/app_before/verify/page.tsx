'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 从localStorage获取注册邮箱
    const storedEmail = localStorage.getItem('registerEmail')
    if (!storedEmail) {
      router.push('/register')
      return
    }
    setEmail(storedEmail)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (verificationCode.length !== 6) {
      setError('请输入6位验证码')
      return
    }

    try {
      setLoading(true)
      const password = localStorage.getItem('registerPassword')

      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          verificationCode,
        }),
      })

      if (!response.ok) {
        throw new Error('验证失败')
      }

      // 清除localStorage中的临时注册信息
      localStorage.removeItem('registerEmail')
      localStorage.removeItem('registerPassword')

      // 注册成功，跳转到登录页
      router.push('/')
    } catch (error) {
      setError('验证码错误或已过期')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            验证您的邮箱
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            我们已向 {email} 发送验证码
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
              验证码
            </label>
            <input
              id="verification-code"
              name="verification-code"
              type="text"
              required
              maxLength={6}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入6位验证码"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
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
              {loading ? '验证中...' : '验证'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => router.push('/register')}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            返回注册页面
          </button>
        </div>
      </div>
    </div>
  )
} 