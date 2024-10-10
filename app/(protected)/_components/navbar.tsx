"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-around items-center p-2 w-full shadow-sm">
      <div className="flex gap-x-2 max-w-[calc(100vw-200px)] flex-wrap gap-y-2">
        <Button
          asChild
          variant={pathname === "/places" ? "default" : "outline"}
        >
          <Link href="/places">尋找設施</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/timerecord" ? "default" : "outline"}
        >
          <Link href="/timerecord">我要記錄</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
