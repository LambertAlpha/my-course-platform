'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '../../types/course'

// 数据学院课程数据
const sdsCourses: Course[] = [
  {
    id: 16,
    title: 'STA2001',
    provider: 'SDS',
    image: '/images/courses_images/sta2001.jpg'
  },
  {
    id: 17,
    title: 'STA2002',
    provider: 'SDS',
    image: '/images/courses_images/sta2002.jpg'
  },
  {
    id: 18,
    title: 'STA2002H',
    provider: 'SDS',
    image: '/images/courses_images/sta2002h.jpg'
  },
  {
    id: 19,
    title: 'STA4001',
    provider: 'SDS',
    image: '/images/courses_images/sta4001.jpg'
  },
  {
    id: 20,
    title: 'CSC3001',
    provider: 'SDS',
    image: '/images/courses_images/csc3001.jpg'
  },
  {
    id: 21,
    title: 'DDA2001',
    provider: 'SDS',
    image: '/images/courses_images/dda2001.jpg'
  }
];

export default function SDSCoursesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            数据学院课程</h1>
          <p className="mt-2 text-sm text-gray-500">
            探索数据科学与统计的前沿课程
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sdsCourses.map((course) => (
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
                <h3 className="text-base font-medium text-gray-900">
                  {course.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 