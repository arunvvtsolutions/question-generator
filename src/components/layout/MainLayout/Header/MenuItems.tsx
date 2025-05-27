'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { userLogout } from '@/context/jwtContext';
import { AUTHENTICATION } from '@/service/enums/texts';
import { useSelector } from '@/store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function UserNav() {
  const router = useRouter();
  const { user, isInitialized } = useSelector((state) => state.authReducer);

  // this is for make sure that user came by web or directly came
  const handleAuth = useCallback(
    (path: string) => {
      localStorage.setItem(AUTHENTICATION.USER_FROM_WEB, 'true');
      router.push(path);
    },
    [router]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isInitialized ? (
          user ? (
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback>{user?.name?.[0] || ''}</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <>
              <div className="hidden lg:flex">
                <Button className="mr-2" onClick={() => handleAuth('/sign-in')}>
                  {AUTHENTICATION.SIGN_IN}
                </Button>
                <Button onClick={() => handleAuth('/sign-up')}>
                  {AUTHENTICATION.SIGN_UP}
                </Button>
              </div>
              <div className="flex lg:hidden">
                <Button variant="link" onClick={() => handleAuth('/sign-in')}>
                  {AUTHENTICATION.SIGN_IN}
                </Button>
                <Button variant="link" onClick={() => handleAuth('/sign-up')}>
                  {AUTHENTICATION.SIGN_UP}
                </Button>
              </div>
            </>
          )
        ) : (
          <>
            <div className="flex gap-[1.25rem] lg:gap-1 pl-[20px] pr-[20px] lg:p-0">
              <Skeleton className="h-3 lg:h-[36px] w-12 lg:w-[78px]" />
              <Skeleton className="h-3 lg:h-[36px] w-12 lg:w-[83.5px]" />
            </div>
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal mb-1">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/payment-history')}>
          {AUTHENTICATION.TRANSACTION_HISTORY}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={userLogout}>
          {AUTHENTICATION.LOGOUT}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
