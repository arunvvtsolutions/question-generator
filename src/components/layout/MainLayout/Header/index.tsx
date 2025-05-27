import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import newLogo from '@/../public/images/newLogo.png';
import neetDarkLogo from '@/../public/images/neetGuideDarkLogo.png';
import dynamic from 'next/dynamic';
import AutoSearchSkelton from '@/components/common/AutoSearchSkelton';
import { memo } from 'react';
import Button from '@/components/common/Button';
import { useSelector } from '@/store';
import { useRouter } from 'next/navigation';
const MobileSearch = dynamic(() => import('./MobileSearch'));
const MobileSidebar = dynamic(() => import('../Sidebar/MobileSidebar'));
const UserNav = dynamic(() => import('./MenuItems'));
const Search = dynamic(() => import('./Search'), {
  loading: () => <AutoSearchSkelton />,
});
interface HeaderProps {
  className?: string;
  sidebarVisible?: boolean;
  hideSearchBar?: boolean;
}
const Header: React.FC<HeaderProps> = ({ className, hideSearchBar = true, sidebarVisible }) => {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const router = useRouter()
  return (
    <div className="w-full supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-30 bg-background/95 backdrop-blur">
      <div className={cn('border-b px-4', className)}>
        <nav
          className="flex h-14 items-center justify-between"
          aria-label="Neet guide navbar"
        >
          <div className="flex ">
            <div className={cn("block lg:!hidden me-2")}>
              <MobileSidebar sidebarVisible={sidebarVisible}/>
            </div>
            <div className=" lg:block">
              <Link href={'/home'}>
              <Image
                  src={newLogo}
                  width={100}
                  // height={214}
                  alt="logo"
                  className="dark:hidden"
               />
                <Image
                  src={neetDarkLogo}
                  width={80}
                  height={80}
                  alt="logo"
                  className="hidden dark:block"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!hideSearchBar && (
              <>
                <Search />
                <MobileSearch />
              </>
            )}
            {isAuthenticated && <Button dataTestId=''  ariaLabel='' className=' h-7 bg-[#0B57D0] text-[12px] mr-3 ' text='Buy Credits' onClick={() => {router.push('/pricing-plans')}} />}
            <UserNav />
            {/* --------- un command theme to show the theme toggle ---------- */}
            {/* <ThemeToggle /> */}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default memo(Header);