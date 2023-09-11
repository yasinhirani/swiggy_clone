import { ChevronDownIcon, LifebuoyIcon, UserIcon, GiftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="w-full flex items-center h-20 shadow-xl bg-white fixed top-0 px-6 py-3 z-10">
      <div className="w-full max-w-[76rem] mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <figure>
              <Image
                src="/images/swiggy.svg"
                alt="Swiggy"
                width={40}
                height={40}
                className="w-12 h-12 hover:scale-110 transition-transform"
              />
            </figure>
          </Link>
          <button type="button" className="text-sm flex items-center group">
            <span className="border-b-2 border-black font-bold group-hover:text-orange-500 group-hover:border-orange-500">
              Other
            </span>
            <span className="pl-2 text-gray-500 font-normal">
              Valsad, Gujarat India
            </span>
            <ChevronDownIcon className="w-5 h-5 text-orange-500 ml-2" />
          </button>
        </div>
        <div>
          <ul className="flex items-center space-x-12">
            <li>
              <Link
                href="/"
                className="text-base font-medium flex items-center space-x-2"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base font-medium flex items-center space-x-2"
              >
                <GiftIcon className="w-5 h-5" />
                <span>Offers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base font-medium flex items-center space-x-2"
              >
                <LifebuoyIcon className="w-5 h-5" />
                <span>Help</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base font-medium flex items-center space-x-2"
              >
                <UserIcon className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base font-medium flex items-center space-x-2"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
