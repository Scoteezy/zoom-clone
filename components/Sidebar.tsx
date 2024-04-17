"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  // pathname.startsWith(link.route)
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col 
    justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map(link=>{
          const isActive = pathname===link.route;

          return(
            <Link className={cn("flex gap-4 items-center p-4 rounded-lg justify-start",{
              "bg-blue-1": isActive
            })}
            href={link.route}
            key={link.label}>
              <Image alt={link.label}
                height={24}
                src={link.imgUrl}
                width={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}

              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;