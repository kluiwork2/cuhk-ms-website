import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/oldman.png" alt="Logo" height={30} width={30} />
        <p className={cn("text-3xl text-neutral-700 pb-1")}>代謝症候群</p>
      </div>
    </Link>
  );
};
