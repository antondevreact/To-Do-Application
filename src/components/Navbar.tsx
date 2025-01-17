"use client";

import { FC } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { logoutUser } from "@/services/user";
import { usePathname, useRouter } from "next/navigation";
import { navLinks, PRIVATE_ROUTES, ROUTE } from "@/lib/constatns";

export const Navbar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const shouldHideLogout = PRIVATE_ROUTES.includes(pathname);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      router.push(ROUTE.LOGIN);
    } catch {
      console.error("Failed to log out");
    }
  };

  return (
    <nav className="flex py-3 items-center flex-wrap justify-around text-white">
      <h1 className="text-lg font-semibold">TodoApp</h1>
      <ul className="flex gap-5 text-sm items-center">
        {navLinks.map((navLink) => (
          <li key={navLink.path}>
            <Link href={navLink.path}>{navLink.label}</Link>
          </li>
        ))}
        {!shouldHideLogout && (
          <Button
            type="button"
            className="bg-transparent"
            onClick={handleLogOut}
            size="icon"
          >
            <LogOut className="text-white size-5" />
          </Button>
        )}
      </ul>
    </nav>
  );
};
