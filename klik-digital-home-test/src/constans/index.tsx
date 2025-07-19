import { sidebarItemsTypes } from "@/types";
import { GearSixIcon } from "@phosphor-icons/react";
import { LayoutDashboard } from "lucide-react";

export const sidebarItems: sidebarItemsTypes[] = [
  {
    label: "Dashboard",
    icon: (
      <LayoutDashboard className="w-5 h-5 group-hover/link:text-white text-blue-400" />
    ),
    key: "dashboard",
    link: "/",
    hasDropdown: false,
  },
  {
    label: "Setting",
    icon: (
      <GearSixIcon className="w-5 h-5 group-hover/link:text-white text-blue-400" />
    ),
    key: "setting",
    hasDropdown: true,
    subItems: [
      {
        label: "Group Management",
        key: "group-management",
        // link: "/category",
        link: "/group-management",
      },
      {
        label: "Management",
        key: "management",
        // link: "/sub-category",
        link: "/management",
      },
    ],
  },
];
