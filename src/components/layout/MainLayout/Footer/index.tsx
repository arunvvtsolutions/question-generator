'use client';
import React, { Fragment, useEffect, useState } from 'react';
import data from './footerdata.json';
import FooterContent from './FooterContent';
import MobileFooter from './MobileFooter';
import Link from 'next/link';

export interface IFooterProps {
  subjectName: string;
  chapters: { name: string; link: string }[];
}

const Footer = () => {
  const [isDeskTop, setIsDeskTop] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') setIsDeskTop(window.innerWidth >= 1024);
  }, []);
  return (
    <footer className="bg-[#F5F5F5B3] dark:bg-[#1C1C1C] px-[16px] lg:px-[0] py-[30px] lg:py-[80px] flex justify-center">
      <div className="container px-3 mx-auto max-w-[1050px]">
        {isDeskTop && (
          <div className="lg:max-w-[100%] w-full hidden lg:grid grid-cols-2 gap-12 lg:grid-cols-4">
            {data.data.map((sub, index) => (
              <Fragment key={index}>
                <FooterContent
                  key={index}
                  data={sub}
                  className="hidden lg:flex"
                />
              </Fragment>
            ))}

            <div className="flex flex-col">
              <h2 className="text-[#101010] text-[20px] font-semibold mb-[20px] text-start dark:text-[#FFF]">
                More About Us
              </h2>
              <ul className="list-disc leading-[35px]">
                <li>
                  <Link
                    href={`/home`}
                    className="text-[14px] leading-[24px] block text-[#101010] hover:text-[#0b57d0] dark:hover:text-[#0385ff]   dark:text-[#FFFFFFCC] font-normal"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`https://questions.neet.guide/about`}
                    className="text-[14px] leading-[24px] block text-[#101010] hover:text-[#0b57d0] dark:hover:text-[#0385ff]   dark:text-[#FFFFFFCC] font-normal"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/blog`}
                    className="text-[14px] leading-[24px] block text-[#101010] hover:text-[#0b57d0] dark:hover:text-[#0385ff]   dark:text-[#FFFFFFCC] font-normal"
                  >
                    Our Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href={`https://questions.neet.guide/privacy-policy`}
                    className="text-[14px] leading-[24px] block text-[#101010] hover:text-[#0b57d0] dark:hover:text-[#0385ff]   dark:text-[#FFFFFFCC] font-normal"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {!isDeskTop && (
          <div className="w-full lg:hidden ">
            <MobileFooter data={data.data} />
            
          </div>
          
        )}
      </div>
    </footer>
  );
};

export default Footer;
