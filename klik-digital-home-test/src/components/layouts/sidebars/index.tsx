"use client";

import logo from "../../../../public/Logo.png";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sidebarItems } from "@/constans";
import { sidebarItemsTypes } from "@/types";

export default function Sidebars() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [dropdowns, setDropdowns] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setDropdowns((prev) => (prev === key ? null : key));
  };

  const handleItemClick = (key: string) => {
    if (isExpanded) {
      toggleDropdown(key);
    }
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  return (
    <aside
      className={`z-0 hover:z-[999] duration-300 transition-all overflow-y-auto custom-scrollbar ${
        isExpanded
          ? "w-[250px] pt-2 py-5 bg-blue-100"
          : "w-[85px] bg-blue-100 pt-4"
      } px-4 h-screen flex flex-col fixed`}
      style={{
        transition: "width 0.3s ease-in-out, opacity 0.2s ease-in-out",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
      {!isExpanded && (
        <div className="w-full flex flex-col items-center justify-center gap-x-3">
          <Link href={"/"} className="w-full h-[30px]">
            <Image
              src={logo}
              alt="Klik Digital"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      )}

      {isExpanded && (
        <div className="w-full flex flex-col items-center justify-center gap-x-3">
          <Link href={"/"} className="w-full">
            <Image
              src={logo}
              alt="Klik Digital"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      )}

      <div className={`${isExpanded ? "mt-4" : "mt-4"}`}>
        <ul
          className={`flex flex-col gap-y-1.5 ${
            isExpanded ? "ml-2 space-y-2" : "items-center space-y-3"
          }`}>
          {sidebarItems?.map((item: sidebarItemsTypes, index: number) => {
            const isActive =
              ("subItems" in item &&
                item.subItems?.some(
                  (subItem) =>
                    "link" in subItem && pathname.includes(subItem.link)
                )) ||
              ("link" in item && pathname.includes(item.link));
            const isDropdownOpen = dropdowns === item.key;
            return (
              <li key={index} className="relative group">
                {"link" in item && item.link ? (
                  <Link href={item.link}>
                    <div
                      className={`p-3 rounded-full flex items-center group/link hover:bg-gradient-to-bl from-blue-400 to-blue-300 group-hover/link:bg-opacity-25 space-x-2 justify-between transition-all border ${
                        isActive
                          ? "bg-gradient-to-bl from-blue-400 to-blue-300 bg-opacity-25 text-white"
                          : "border-transparent bg-neutral-300 hover:bg-blue-400 hover:text-blue-400 hover:border-blue-400"
                      } cursor-pointer`}>
                      <div className="flex space-x-2 items-center">
                        {item.icon}
                        {isExpanded && (
                          <p
                            className={`text-sm ${
                              isActive ? "text-white" : ""
                            } text-blue-40 group-hover/link:text-white`}>
                            {item.label}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`p-3 rounded-full group/link hover:bg-gradient-to-bl from-blue-400 to-blue-300 group-hover/link:bg-opacity-25 flex items-center space-x-2 justify-between transition-all border ${
                      isActive
                        ? "bg-gradient-to-bl from-blue-400 to-blue-300 bg-opacity-25 text-white"
                        : "border-transparent bg-neutral-30 hover:bg-white hover:text-blue-400 hover:border-neutral-400"
                    } cursor-pointer`}
                    onClick={() => handleItemClick(item.key)}>
                    <div className="flex space-x-2 items-center">
                      {item.icon}
                      {isExpanded && (
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : ""
                          } text-blue-400 group-hover/link:text-white`}>
                          {item.label}
                        </p>
                      )}
                    </div>
                    {"subItems" in item && item.subItems && isExpanded && (
                      <ChevronDown
                        className={`w-5 h-5 duration-200 transition-transform ${
                          isDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                  </div>
                )}

                {"subItems" in item && item.subItems && isExpanded && (
                  <ul
                    className={`overflow-hidden mt-2 space-y-1 rounded-lg bg-blue-4000 transition-all duration-300 ${
                      isDropdownOpen
                        ? "w-full max-h-[500px] overflow-y-auto custom-scrollbar"
                        : "max-h-0"
                    }`}>
                    {item.subItems.map(
                      (
                        subItem:
                          | { label: string; key: string; link: string }
                          | {
                              label: string;
                              key: string;
                              sub: {
                                label: string;
                                key: string;
                                link: string;
                              }[];
                            },
                        index: number
                      ) => {
                        if ("sub" in subItem) {
                          return (
                            <div key={index}>
                              <p className="text-neutral-400 text-sm px-3 pt-2 font-semibold">
                                {subItem.label}
                              </p>
                              <ul>
                                {subItem.sub.map(
                                  (
                                    subSubItem: {
                                      label: string;
                                      key: string;
                                      link: string;
                                    },
                                    index: number
                                  ) => (
                                    <li key={index} className="text-sm my-2">
                                      <Link
                                        href={subSubItem.link}
                                        className="hover:underline cursor-pointer block px-3 py-1">
                                        {subSubItem.label}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          );
                        } else {
                          return (
                            <li key={index} className="text-sm my-2">
                              <Link
                                href={subItem.link}
                                className="hover:underline cursor-pointer block px-3 py-1">
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        }
                      }
                    )}
                    {item.subItems.length === 0 && (
                      <p className="text-sm my-2 p-2 text-center italic">
                        Tidak ada sub item
                      </p>
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
