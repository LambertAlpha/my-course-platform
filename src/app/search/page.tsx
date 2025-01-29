'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '../types/course'

// 导入所有课程数据
const allCourses: Course[] = [
  // 经管学院课程
  {
    id: 1,
    title: 'FIN2010',
    provider: 'SME',
    image: '/images/courses_images/fin2010.jpg'
  },
  {
    id: 2,
    title: 'FIN2020',
    provider: 'SME',
    image: '/images/courses_images/fin2020.jpg'
  },
  {
    id: 3,
    title: 'FIN3080',
    provider: 'SME',
    image: '/images/courses_images/fin3080.jpg'
  },
  {
    id: 4,
    title: 'FIN4060',
    provider: 'SME',
    image: '/images/courses_images/fin4060.jpg'
  },
  {
    id: 5,
    title: 'ECO2010',
    provider: 'SME',
    image: '/images/courses_images/eco2010.jpg'
  },
  {
    id: 6,
    title: 'ECO2011',
    provider: 'SME',
    image: '/images/courses_images/eco2011.jpg'
  },
  {
    id: 7,
    title: 'ECO2121',
    provider: 'SME',
    image: '/images/courses_images/eco2121.jpg'
  },
  {
    id: 8,
    title: 'ECO3121',
    provider: 'SME',
    image: '/images/courses_images/eco3121.jpg'
  },
  {
    id: 9,
    title: 'MIS2051',
    provider: 'SME',
    image: '/images/courses_images/mis2051.jpg'
  },
  {
    id: 10,
    title: 'MGT2020',
    provider: 'SME',
    image: '/images/courses_images/mgt2020.jpg'
  },

  // 数据学院课程
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
  },

  // 理工学院课程
  {
    id: 31,
    title: 'MAT1002',
    provider: 'SSE',
    image: '/images/courses_images/mat1002.jpg'
  },
  {
    id: 32,
    title: 'MAT1002B',
    provider: 'SSE',
    image: '/images/courses_images/mat1002b.jpg'
  },
  {
    id: 33,
    title: 'MAT2041',
    provider: 'SSE',
    image: '/images/courses_images/mat2041.jpg'
  },
  {
    id: 34,
    title: 'MAT2040',
    provider: 'SSE',
    image: '/images/courses_images/mat2040.jpg'
  },
  {
    id: 35,
    title: 'MAT3007',
    provider: 'SSE',
    image: '/images/courses_images/mat3007.jpg'
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // 搜索逻辑
    const searchCourses = () => {
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, '');
      
      const results = allCourses.filter(course => {
        // 移除课程标题中的空格，便于匹配课程编号
        const normalizedTitle = course.title.toLowerCase().replace(/\s+/g, '');
        
        return (
          // 匹配课程编号（移除空格后）
          normalizedTitle.includes(normalizedQuery) ||
          // 匹配课程名称
          course.title.toLowerCase().includes(query.toLowerCase())
        );
      });

      setSearchResults(results);
      setIsLoading(false);
    };

    // 延迟执行搜索，模拟API调用
    const timer = setTimeout(searchCourses, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            搜索结果</h1>
          <p className="mt-2 text-sm text-gray-500">
            找到 {searchResults.length} 门相关课程
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((course) => (
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 