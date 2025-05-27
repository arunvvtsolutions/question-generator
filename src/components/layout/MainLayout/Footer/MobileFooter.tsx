import { AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Accordion } from '@radix-ui/react-accordion';
import React from 'react';
import { IFooterProps } from '.';
import Link from 'next/link';
import AccordionTrigger from './AccordionTrigger';

const MobileFooter = ({ data }: { data: IFooterProps[] }) => {
  return (
    <Accordion type="single" collapsible>
      {data.map((sub, index) => {
        return (
          <AccordionItem value={sub.subjectName} key={index}>
            <AccordionTrigger className="!no-underline text-[#101010] text-[16px] font-semibold mb-[-10px] text-start dark:text-[#FFF] ml-[10px]">
              {sub.subjectName}
            </AccordionTrigger>
            <AccordionContent className="px-[30px]">
              <ul className="leading-[35px] !list-disc">
                {sub.chapters.map((chp, index) => {
                  return (
                    <li key={`chapter-${index}`}>
                      <Link
                        href={chp.link}
                        className="text-[14px] text-[#101010] dark:text-[#FFFFFFCC] font-normal block"
                      >
                        {chp.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
      <AccordionItem value="home">
        <AccordionTrigger className="!no-underline text-[#101010] text-[16px] font-semibold mb-[-10px] text-start dark:text-[#FFF] ml-[10px]">
          More About Us
        </AccordionTrigger>
        <AccordionContent className="px-[30px]">
          <ul className="leading-[35px] !list-disc">
            <li>
              <Link
                href={`/home`}
                className="text-[14px] text-[#101010] dark:text-[#FFFFFFCC] font-normal block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`https://questions.neet.guide/about`}
                className="text-[14px] text-[#101010] dark:text-[#FFFFFFCC] font-normal block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={`/blog`}
                className="text-[14px] text-[#101010] dark:text-[#FFFFFFCC] font-normal block"
              >
                Our Blogs
              </Link>
            </li>
            <li>
              <Link
                href={`https://questions.neet.guide/privacy-policy`}
                className="text-[14px] text-[#101010] dark:text-[#FFFFFFCC] font-normal block"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileFooter;
