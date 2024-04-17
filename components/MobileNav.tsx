
"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image alt="Hamburger Icon"
            className="cursor-pointer sm:hidden"
            height={36}
            src='/icons/hamburger.svg'
            width={36}
          />
        </SheetTrigger>
        <SheetContent className="border-none bg-dark-1"
          side='left'>
          <Link className="flex items-center gap-1"
            href='/'>
            <Image alt="Yoom logo"
              className="max-sm:size-10"
              height={32}
              src='/icons/logo.svg'
              width={32}/>
            <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map(link=>{
                  const isActive = pathname===link.route;

                  return(
                    <SheetClose asChild
                      key={link.label}>
                      <Link className={cn("flex gap-4 items-center p-4 rounded-lg w-full max-w-60",{
                        "bg-blue-1": isActive
                      })}
                      href={link.route}
                      >
                        <Image alt={link.label}
                          height={20}
                          src={link.imgUrl}
                          width={20}
                        />
                        <p className="font-semibold">
                          {link.label}

                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>

          </div>
        </SheetContent>
      </Sheet>

    </section>
  );
};

export default MobileNav;