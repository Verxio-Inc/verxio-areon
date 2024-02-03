"use client";
import React from "react";
import Connect from "./connect"
import { useEffect, useState } from "react";
import { Logo, SidebarMenuItem } from "./atoms";
import Image from "next/image";
import AxiosLogo from "../assets/AxiosLogo.svg";
import { useNav } from "../context/nav_context";
import { NavigationItems } from "../lib/data/sideBarData";
import { getAccount } from '@wagmi/core'

const Sidebar = () => {

  const { isOpen, setUser } = useNav();

  useEffect(() => {
    const user = getAccount();
    if(user){
      setUser(user)
    }
  }, []);


  return (
    <>
      <nav
        className={`
      ${
        isOpen ? "translate-x-0 absolute h-full z-50" : "max-lg:hidden"
      } w-[300px] bg-primary z-50 h-screen `}
      >
        <div className="border-b border-dashed flex justify-center items-center px-[5%]">
          <Logo className="py-12" />
        </div>

        <div className="flex justify-between flex-col h-[calc(100%-200px)] p-3 ">
          <ul className="">
            {NavigationItems.map((item, index) => (
              <SidebarMenuItem key={`sidebar-item-${index}`} {...item} />
              // <div></div>
            ))}
          </ul>
          <div className="flex justify-center">

              <Connect/>
          </div>
          {/* {user ? <LogoutButton /> : <LoginButton />} */}

          <button className=" flex items-center  mx-auto w-[80%] gap-3">
            <p className="text-white text-[12px]">Powered by</p>
            <Image src={AxiosLogo} alt="Axios Logo" width={50} height={50} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
