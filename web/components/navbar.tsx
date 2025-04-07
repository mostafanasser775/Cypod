import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="border shadow">
      <NavbarContent className="flex basis-1/5 sm:basis-full justify-between" justify="start">
     
     
        <NavbarItem as={NextLink} href="/" className="flex items-center">
          Devices
        </NavbarItem>
       
      </NavbarContent>
      <NavbarContent className="flex basis-1/5 sm:basis-full justify-between" justify="end">
     
  
     <NavbarItem as={NextLink} href="/login" className="flex items-center">
       Sign In
     </NavbarItem>
   </NavbarContent>
    </HeroUINavbar>
  );
};
