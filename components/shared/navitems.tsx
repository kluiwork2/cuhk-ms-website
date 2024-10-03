"use client";

import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavItems = () => {
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row font-bold">
      <li>
        <Link href={"/"}>主頁</Link>
      </li>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger>不良因素</DropdownMenuTrigger>
          <DropdownMenuContent className="font-bold">
            <DropdownMenuItem>
              <Link href={"/general/highblood"}>高血壓</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/general/diabetes"}>糖尿病</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/general/cholesterol"}>膽固醇</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/general/obese"}>超重或肥胖</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li>
        <Link href={"/general/smoke"}>吸煙</Link>
      </li>
      <li>
        <Link href={"/general/sports"}>做運動</Link>
      </li>
      <li>
        <Link href={"/general/diet"}>健康飲食</Link>
      </li>
      <li>
        <Link href={"/general/tips"}>慢活放鬆</Link>
      </li>
    </ul>
  );
};

export default NavItems;
