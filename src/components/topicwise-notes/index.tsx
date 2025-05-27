'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSidebarDataSuccess } from '@/store/slices/syllabus';
import { getSyllabus } from '@/utils/api/ncert-solutions';
import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Topic {
  id: number;
  topicName: string;
  shortUrl: string;
}

interface Chapter {
  id: number;
  chapterName: string;
  shortUrl: string;
  topics: Topic[]; // Corrected type for topics
  Classes: {
    id: number;
    className: string;
    shortUrl: string;
  };
}

interface Subject {
  subjectName: string;
  shortUrl: string;
  chapters: Chapter[]; // Corrected type for chapters
  topics: Topic[]; // Assuming a separate list of topics for the subject itself
}

interface SubjectChaptersProps {
  urls: Subject[]; // Corrected type for urls
}

const TopicwiseNotes = () => {
  const [syllabus, setSyllabus] = useState<any[]>([]); // To store the syllabus data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error message state
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subjects = ['Physics', 'Chemistry', 'Botany', 'Zoology'];

  const currentTab = useMemo(() => {
    const matchedSubject = subjects.find((subject) => pathname?.toLowerCase().includes(subject.toLowerCase()));
    return matchedSubject ? matchedSubject.toLowerCase() : subjects[0].toLowerCase();
  }, [pathname, subjects]);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await getSyllabus();
        if (response?.success && response.data) {
          setSyllabus(response.data);
          dispatch(getSidebarDataSuccess(response.data));
        } else {
          throw new Error(response?.message || 'Failed to fetch syllabus data.');
        }
      } catch (error) {
        throw new Error( `error when fetching syllabus: ${error instanceof Error ?  error.message : String(error)}`)
      }
    };

    fetchSyllabus();
  }, [dispatch]);

  const generateUrls = useCallback((syllabusData: any) => {
    if (!syllabusData || !Array.isArray(syllabusData.syllabus)) return [];

    const baseUrl = '/revision-notes/';
    return syllabusData.syllabus.map((subject: any) => {
      const subjectUrl = `${baseUrl}${subject.shortUrl}`;
      const chaptersWithUrls = subject.chapters.map((chapter: any) => {
        const classUrl = `${subjectUrl}/${chapter.Classes.shortUrl}`;
        const chapterUrl = `${classUrl}-${chapter.shortUrl}`;
        return { ...chapter, url: chapterUrl, classUrl };
      });

      return { ...subject, url: subjectUrl, chapters: chaptersWithUrls };
    });
  }, []);

  const urls = useMemo(() => generateUrls(syllabus), [syllabus, generateUrls]);

  const filterChapters = useCallback(
    (subject: string) => {
      return urls?.filter((item: any) => item.subjectName.toLowerCase() === subject.toLowerCase());
    },
    [urls]
  );

  const handleTabChange = (subject: string) => {
    const formattedSubject = subject.toLowerCase();
    router.push(`/${formattedSubject}-topicwise-notes`);
  };

  return (
    // <div>
    //   <div className="mx-auto container">
    //     <h2 className="text-lg font-bold text-center md:text-start mb-6">Topic Wise Notes</h2>

    //     <div className="flex justify-center space-x-2 border-b border-gray-300 dark:border-gray-700 pb-4 mb-6">
    //       {urls.map((subject: Subject, i: number) => (
    //         <button
    //           key={i}
    //           onClick={() => {
    //             setActiveTab(subject.subjectName); // Update the active tab state
    //             handleTabChange(subject.subjectName); // Call the handleTabChange function with the subject name
    //           }}
    //           className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
    //             activeTab === subject.subjectName
    //               ? 'bg-blue-500 text-white'
    //               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    //           }`}
    //         >
    //           {subject.subjectName}
    //         </button>
    //       ))}
    //     </div>

    //     <div className="grid gap-6 ">
    //       {urls
    //         .filter((subject: Subject) => subject.subjectName === activeTab)
    //         .map((subject: Subject, i: number) => (
    //           <div key={i} className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
    //               {subject.chapters.map((chapter: Chapter, j: number) => (
    //                 <div key={j}>
    //                   {chapter.topics.map((topic: Topic, i: number) => (
    //                     <Link
    //                       href={`/ncert-solutions/${subject.shortUrl}/${chapter.Classes.shortUrl}-${chapter.shortUrl}/${topic.shortUrl}`}
    //                       key={i}
    //                     >
    //                       <div className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow h-28 overflow-hidden">
    //                         {/* Topic Title */}
    //                         <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
    //                           {topic.topicName} Important Formula
    //                         </h4>

    //                         {/* View Notes Text */}
    //                         <span className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 block cursor-pointer">
    //                           View Notes
    //                         </span>
    //                       </div>
    //                     </Link>
    //                   ))}
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ))}
    //     </div>
    //   </div>
    // </div>
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList className="flex justify-center space-x-1 md:space-x-1.5 bg-white dark:bg-gray-900 border-0 py-2">
        {subjects.map((subject) => (
          <TabsTrigger
            key={subject}
            value={subject.toLowerCase()}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-colors hover:border-gray-400 hover:text-gray-900 dark:hover:text-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500"
          >
            {subject}
          </TabsTrigger>
        ))}
      </TabsList>

      {subjects.map((subject) => (
        <TabsContent key={subject} value={subject.toLowerCase()} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filterChapters(subject)?.[0]?.chapters?.map((chapter: any) => (
            <div
              key={chapter.url}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(chapter.url)}
            >
              <h3 className="font-semibold text-lg mb-1">{chapter.chapterName} Important Formula</h3>

              <span className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 block cursor-pointer">
                View Notes
              </span>
            </div>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TopicwiseNotes;
