'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Course } from '../types/course'

// 导入所有课程数据
const allCourses: Course[] = [
  // 经管学院课程
  {
    id: 1,
    title: 'FIN 2010 - 公司金融',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '金融系',
    image: '/images/courses_images/fin2010.jpg',
    description: '公司金融基础理论与实践'
  },
  {
    id: 2,
    title: 'FIN 2020 - 投资学',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '金融系',
    image: '/images/courses_images/fin2020.jpg',
    description: '投资理论与组合管理'
  },
  {
    id: 3,
    title: 'FIN 3080 - 固定收益证券',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '金融系',
    image: '/images/courses_images/fin3080.jpg',
    description: '债券市场与固定收益证券分析'
  },
  {
    id: 4,
    title: 'FIN 4060 - 金融衍生品',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '金融系',
    image: '/images/courses_images/fin4060.jpg',
    description: '期权、期货及其他衍生品'
  },
  {
    id: 5,
    title: 'ECO 2010 - 微观经济学',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '经济系',
    image: '/images/courses_images/eco2010.jpg',
    description: '微观经济学原理与应用'
  },
  {
    id: 6,
    title: 'ECO 2011 - 宏观经济学',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '经济系',
    image: '/images/courses_images/eco2011.jpg',
    description: '宏观经济学原理与政策'
  },
  {
    id: 7,
    title: 'ECO 2121 - 计量经济学',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '经济系',
    image: '/images/courses_images/eco2121.jpg',
    description: '经济计量方法与应用'
  },
  {
    id: 8,
    title: 'ECO 3121 - 高级计量经济学',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '经济系',
    image: '/images/courses_images/eco3121.jpg',
    description: '进阶计量经济学方法'
  },
  {
    id: 9,
    title: 'MIS 2051 - 管理信息系统',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '管理系',
    image: '/images/courses_images/mis2051.jpg',
    description: '信息系统在管理中的应用'
  },
  {
    id: 10,
    title: 'MGT 2020 - 组织行为学',
    provider: 'SME',
    providerLogo: '/images/logos/sme-logo.jpg',
    type: '管理系',
    image: '/images/courses_images/mgt2020.jpg',
    description: '组织中的个人与群体行为'
  },

  // 数据学院课程
  {
    id: 16,
    title: 'STA2001 - 概率论',
    provider: 'SDS',
    providerLogo: '/images/logos/sds-logo.jpg',
    type: '统计系',
    image: '/images/courses_images/sta2001.jpg',
    description: '概率论基础理论'
  },
  {
    id: 17,
    title: 'STA2002 - 数理统计',
    provider: 'SDS',
    providerLogo: '/images/logos/sds-logo.jpg',
    type: '统计系',
    image: '/images/courses_images/sta2002.jpg',
    description: '统计学基础理论与方法'
  },
  {
    id: 18,
    title: 'STA2002H - 数理统计（荣誉）',
    provider: 'SDS',
    providerLogo: '/images/logos/sds-logo.jpg',
    type: '统计系',
    image: '/images/courses_images/sta2002h.jpg',
    description: '统计学进阶理论与方法'
  },
  {
    id: 19,
    title: 'STA4001 - 随机过程',
    provider: 'SDS',
    providerLogo: '/images/logos/sds-logo.jpg',
    type: '统计系',
    image: '/images/courses_images/sta4001.jpg',
    description: '随机过程理论与应用'
  },
  {
    id: 20,
    title: 'CSC3001 - 机器学习',
    provider: 'SDS',
    providerLogo: '/images/logos/sds-logo.jpg',
    type: '计算机系',
    image: '/images/courses_images/csc3001.jpg',
    description: '机器学习基础理论与应用'
  },
  {
    id: 21,
    title: 'DDA2001 - 数据分析导论',
    provider: 'SDS',
    providerLogo: '/images/logos/sds-logo.jpg',
    type: '数据科学系',
    image: '/images/courses_images/dda2001.jpg',
    description: '数据分析基础方法与实践'
  },

  // 理工学院课程
  {
    id: 31,
    title: 'MAT1002 - 线性代数',
    provider: 'SSE',
    providerLogo: '/images/logos/sse-logo.jpg',
    type: '数学系',
    image: '/images/courses_images/mat1002.jpg',
    description: '线性代数基础理论与应用'
  },
  {
    id: 32,
    title: 'MAT1002B - 线性代数（荣誉）',
    provider: 'SSE',
    providerLogo: '/images/logos/sse-logo.jpg',
    type: '数学系',
    image: '/images/courses_images/mat1002b.jpg',
    description: '线性代数进阶理论与应用'
  },
  {
    id: 33,
    title: 'MAT2041 - 数学分析I',
    provider: 'SSE',
    providerLogo: '/images/logos/sse-logo.jpg',
    type: '数学系',
    image: '/images/courses_images/mat2041.jpg',
    description: '数学分析基础理论'
  },
  {
    id: 34,
    title: 'MAT2040 - 数学分析II',
    provider: 'SSE',
    providerLogo: '/images/logos/sse-logo.jpg',
    type: '数学系',
    image: '/images/courses_images/mat2040.jpg',
    description: '数学分析进阶理论'
  },
  {
    id: 35,
    title: 'MAT3007 - 数值分析',
    provider: 'SSE',
    providerLogo: '/images/logos/sse-logo.jpg',
    type: '数学系',
    image: '/images/courses_images/mat3007.jpg',
    description: '数值计算方法与应用'
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          // 匹配课程描述
          course.description.toLowerCase().includes(query.toLowerCase()) ||
          // 匹配课程类型
          course.type.toLowerCase().includes(query.toLowerCase())
        );
      });

      setSearchResults(results);
      setIsLoading(false);
    };

    // 延迟执行搜索，模拟API调用
    const timer = setTimeout(searchCourses, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleCourseClick = (e: React.MouseEvent, courseId: number) => {
    e.preventDefault();
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">搜索结果</h1>
            <p className="mt-2 text-sm text-gray-500">
              搜索 "{query}" 的结果
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">搜索中...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map((course) => (
                <div
                  key={course.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer"
                >
                  <div className="aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none sm:h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-4 p-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={course.providerLogo}
                        alt={course.provider}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <span className="text-sm text-gray-600">{course.provider}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      <button 
                        onClick={(e) => handleCourseClick(e, course.id)}
                        className="block w-full text-left"
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {course.title}
                      </button>
                    </h3>
                    <p className="text-sm text-gray-500">{course.description}</p>
                    <div className="mt-auto">
                      <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                        {course.type}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">未找到相关课程</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 