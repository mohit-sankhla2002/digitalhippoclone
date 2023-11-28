import { FC } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import Cart from "./Cart";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Navbar: FC = () => {

  // MOCKING User
  const user = null;

  return (
    <nav className="bg-white  sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile Nav */}
              <div className="ml-4 flex lg:ml-0 ">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : <Link href="/sign-in" className={cn(buttonVariants({ variant: 'ghost' }))}>Sign In</Link>}
                  {user ? null : <span className="h-6 w-px bg-gray-200" aria-hidden="true" />}
                  {user ? null : <Link href="/sign-up" className={cn(buttonVariants({ variant: 'ghost' }))}>Create Account</Link>}
                  {user ? <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> : null}
                  <div className="ml-4 flow-root">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  );
}

export default Navbar;