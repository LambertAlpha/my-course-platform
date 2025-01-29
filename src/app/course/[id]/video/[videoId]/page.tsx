'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Video {
  id: string;
  title: string;
  duration: string;
}

// 模拟视频数据
const getVideoData = (videoId: string): Video => {
  return {
    id: videoId,
    title: videoId === '1' ? '24Spring Final' : 
           videoId === '2' ? '24Spring Mid' : 
           videoId === '3' ? '24Fall Final' : 
           videoId === '4' ? '24Fall Mid' : '视频',
    duration: '120分钟'
  }
}

export default function VideoPage() {
  const params = useParams()
  const videoId = params.videoId as string
  const [video, setVideo] = useState<Video | null>(null)

  useEffect(() => {
    const videoData = getVideoData(videoId)
    setVideo(videoData)
  }, [videoId])

  if (!video) {
    return <div>加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link
            href={`/course/${params.id}`}
            className="text-indigo-600 hover:text-indigo-500 flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回课程
          </Link>
        </div>

        {/* 视频标题 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
            <p className="mt-1 text-sm text-gray-500">时长：{video.duration}</p>
          </div>

          {/* 视频播放器 */}
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              src="https://example.com/video.mp4"
              poster="/images/video-placeholder.jpg"
            >
              您的浏览器不支持视频播放
            </video>
          </div>

          {/* 视频信息 */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  已解锁
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}