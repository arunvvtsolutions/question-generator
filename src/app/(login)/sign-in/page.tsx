import SignInForm from '@/components/authentication/authentication-modal/forms/SignInForm';
import Image from 'next/image';
import React from 'react';
import darkLogo from '@/../public/images/neetGuideDarkLogo.png';
import newlogo from '@/../public/images/newLogo.png';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex justify-center items-center max-w-1/2 ml-auto mr-auto mt-[5rem] flex-col">
      <div>
        <Link scroll href="/">
          <Image
            src={darkLogo}
            alt="dark logo"
            width={100}
            height={100}
            className="hidden dark:block"
          />
        </Link>
        <Link href="/">
          <Image
            src={newlogo}
            alt=" logo"
            width={145}
            height={100}
            className="block dark:hidden"
          />
        </Link>
      </div>
      <SignInForm isSignInPage/>
    </div>
  );
};

export default Page;
