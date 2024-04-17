import Image from "next/image";
import Link from "next/link";

import MobileNav from "./MobileNav";
const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link className="flex items-center gap-1"
        href='/'>
        <Image alt="Yoom logo"
          className="max-sm:size-10"
          height={32}
          src='/icons/logo.svg'
          width={32}/>
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
      </Link>
      <div className="flex-between gap-5">
        {/* clerk */}
        <MobileNav/>
      </div>
    </nav>
  );
};

export default Navbar;