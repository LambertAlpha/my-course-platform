'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '../../types/course'

// 理工学院课程数据
const sseCourses: Course[] = [
  {
    id: 31,
    title: 'MAT1002 - 线性代数',
    provider: 'SSE',
    type: '数学系',
    image: '/images/courses_images/mat1002.jpg'
  },
  {
    id: 32,
    title: 'MAT1002B - 线性代数（荣誉）',
    provider: 'SSE',
    type: '数学系',
    image: '/images/courses_images/mat1002b.jpg'
  },
  {
    id: 33,
    title: 'MAT2041 - 数学分析I',
    provider: 'SSE',
    type: '数学系',
    image: '/images/courses_images/mat2041.jpg'
  },
  {
    id: 34,
    title: 'MAT2040 - 数学分析II',
    provider: 'SSE',
    type: '数学系',
    image: '/images/courses_images/mat2040.jpg'
  },
  {
    id: 35,
    title: 'MAT3007 - 数值分析',
    provider: 'SSE',
    type: '数学系',
    image: '/images/courses_images/mat3007.jpg'
  }
];

export default function SSECoursesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            理工学院课程</h1>
          <p className="mt-2 text-sm text-gray-500">
            探索数学、物理等基础理工课程
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sseCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/sse-logo.jpg"
                    alt={course.provider}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full"
                  />
                  <span className="text-xs text-gray-500">{course.type}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 