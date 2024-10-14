"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import NavItems from "@/components/shared/navitems";
import MobileNav from "@/components/shared/mobilenav";
import { LoginButton } from "../auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "../auth/logout-button";
import Link from "next/link";

export const Navbar = () => {
  const user = useCurrentUser();
  const isLoggedIn = !!user;

  return (
    <div className="fixed top-0 w-full h-20 z-10 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <nav className="md:flex-between hidden w-full max-w-lg p-regular-18">
          <NavItems />
        </nav>
        <MobileNav />
        <div className="md:flex-between max-w-xs space-x-4 md:block md:w-auto items-center justify-between hidden w-full">
          {isLoggedIn ? (
            <Button variant="ghost" size="lg">
              <Link href="/timerecord">我要記錄</Link>
            </Button>
          ) : (
            <></>
          )}
           {isLoggedIn ? (
            <LogoutButton>
              <Button variant="default" size="lg">
                登出
              </Button>
            </LogoutButton>
          ) : (
            <LoginButton asChild>
              <Button variant="default" size="lg">
                登入
              </Button>
            </LoginButton>
          )}
        </div>
      </div>
    </div>
  );
};
