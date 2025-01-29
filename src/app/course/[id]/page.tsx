'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import PricingModal from '../../components/PricingModal'
import Link from 'next/link'

interface Section {
  id: number;
  title: string;
  duration: string;
  type: 'video';
  status: 'locked' | 'available' | 'completed';
}

interface CourseDetail {
  id: number;
  title: string;
  image: string;
  instructor: string;
  sections: Section[];
}

// 生成考试视频部分
function generateExamSections(startYear: number = 22): Section[] {
  const currentYear = 24;
  const sections: Section[] = [];
  let id = 1;

  for (let year = currentYear; year >= startYear; year--) {
    // Spring Final
    sections.push({
      id: id++,
      title: `${year}Spring Final`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });

    // Spring Mid
    sections.push({
      id: id++,
      title: `${year}Spring Mid`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });

    // Fall Final
    sections.push({
      id: id++,
      title: `${year}Fall Final`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });

    // Fall Mid
    sections.push({
      id: id++,
      title: `${year}Fall Mid`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });
  }

  return sections;
}

const courseDetails: Record<string, CourseDetail> = {
  // 金融系课程
  '1': {
    id: 1,
    title: 'FIN 2010',
    image: '/images/courses_images/fin2010.jpg',
    instructor: 'Prof. Wang',
    sections: generateExamSections()
  },
  '2': {
    id: 2,
    title: 'FIN 2020',
    image: '/images/courses_images/fin2020.jpg',
    instructor: 'Prof. Li',
    sections: generateExamSections()
  },
  '3': {
    id: 3,
    title: 'FIN 3080 - 固定收益证券',
    image: '/images/courses_images/fin3080.jpg',
    instructor: 'Prof. Chen',
    sections: generateExamSections()
  },
  '4': {
    id: 4,
    title: 'FIN 4060 - 金融衍生品',
    image: '/images/courses_images/fin4060.jpg',
    instructor: 'Prof. Liu',
    sections: generateExamSections()
  },

  // 经济系课程
  '5': {
    id: 5,
    title: 'ECO 2010 - 微观经济学',
    image: '/images/courses_images/eco2010.jpg',
    instructor: 'Prof. Zhang',
    sections: generateExamSections()
  },
  '6': {
    id: 6,
    title: 'ECO 2011 - 宏观经济学',
    image: '/images/courses_images/eco2011.jpg',
    instructor: 'Prof. Wu',
    sections: generateExamSections()
  },
  '7': {
    id: 7,
    title: 'ECO 2121 - 计量经济学',
    image: '/images/courses_images/eco2121.jpg',
    instructor: 'Prof. Yang',
    sections: generateExamSections()
  },
  '8': {
    id: 8,
    title: 'ECO 3121 - 高级计量经济学',
    image: '/images/courses_images/eco3121.jpg',
    instructor: 'Prof. Zhao',
    sections: generateExamSections()
  },

  // 管理系课程
  '9': {
    id: 9,
    title: 'MIS 2051 - 管理信息系统',
    image: '/images/courses_images/mis2051.jpg',
    instructor: 'Prof. Sun',
    sections: generateExamSections()
  },
  '10': {
    id: 10,
    title: 'MGT 2020 - 组织行为学',
    image: '/images/courses_images/mgt2020.jpg',
    instructor: 'Prof. Lin',
    sections: generateExamSections()
  },

  // 统计系课程
  '16': {
    id: 16,
    title: 'STA2001 - 概率论',
    image: '/images/courses_images/sta2001.jpg',
    instructor: 'Prof. Huang',
    sections: generateExamSections()
  },
  '17': {
    id: 17,
    title: 'STA2002 - 数理统计',
    image: '/images/courses_images/sta2002.jpg',
    instructor: 'Prof. Gao',
    sections: generateExamSections()
  },
  '18': {
    id: 18,
    title: 'STA2002H - 数理统计（荣誉）',
    image: '/images/courses_images/sta2002h.jpg',
    instructor: 'Prof. Xu',
    sections: generateExamSections()
  },
  '19': {
    id: 19,
    title: 'STA4001 - 随机过程',
    image: '/images/courses_images/sta4001.jpg',
    instructor: 'Prof. Feng',
    sections: generateExamSections()
  },

  // 计算机系课程
  '20': {
    id: 20,
    title: 'CSC3001 - 机器学习',
    image: '/images/courses_images/csc3001.jpg',
    instructor: 'Prof. Zhu',
    sections: generateExamSections()
  },
  '21': {
    id: 21,
    title: 'DDA2001 - 数据分析导论',
    image: '/images/courses_images/dda2001.jpg',
    instructor: 'Prof. Qian',
    sections: generateExamSections()
  },

  // 数学系课程
  '31': {
    id: 31,
    title: 'MAT1002 - 线性代数',
    image: '/images/courses_images/mat1002.jpg',
    instructor: 'Prof. Ding',
    sections: generateExamSections()
  },
  '32': {
    id: 32,
    title: 'MAT1002B - 线性代数（荣誉）',
    image: '/images/courses_images/mat1002b.jpg',
    instructor: 'Prof. He',
    sections: generateExamSections()
  },
  '33': {
    id: 33,
    title: 'MAT2041 - 数学分析I',
    image: '/images/courses_images/mat2041.jpg',
    instructor: 'Prof. Tang',
    sections: generateExamSections()
  },
  '34': {
    id: 34,
    title: 'MAT2040',
    image: '/images/courses_images/mat2040.jpg',
    instructor: 'Prof. Xie',
    sections: generateExamSections()
  },
  '35': {
    id: 35,
    title: 'MAT3007',
    image: '/images/courses_images/mat3007.jpg',
    instructor: 'Prof. Peng',
    sections: generateExamSections()
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courseDetails[courseId];
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">课程不存在</p>
      </div>
    );
  }

  const handleSectionClick = (section: Section) => {
    if (section.status === 'locked') {
      setIsPricingOpen(true);
    }
  };

  const getStatusIcon = (status: Section['status']) => {
    switch (status) {
      case 'locked':
        return (
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* 课程标题和描述 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-sm text-gray-500">授课教师：{course.instructor}</p>
          </div>

          {/* 课程内容列表 */}
          <div className="divide-y divide-gray-200">
            {course.sections.map((section) => (
              section.status === 'locked' ? (
                <div
                  key={section.id}
                  onClick={() => handleSectionClick(section)}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer opacity-50"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.duration}</p>
                    </div>
                  </div>
                  {getStatusIcon(section.status)}
                </div>
              ) : (
                <Link
                  key={section.id}
                  href={`/course/${courseId}/video/${section.id}`}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.duration}</p>
                    </div>
                  </div>
                  {getStatusIcon(section.status)}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* 付款弹窗 */}
        <PricingModal 
          isOpen={isPricingOpen} 
          onClose={() => setIsPricingOpen(false)}
          courseId={Number(courseId)}
        />
      </div>
    </div>
  );
}