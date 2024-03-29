"use client";

import { FC, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CartItem from "./CartItem";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";

const Cart: FC = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const [isMounted, setIsMounted] = useState<boolean>(false); 

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce((total, { product }) => (total + product.price), 0);

  const fee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2 ">
        <ShoppingCartIcon
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0} 
        </span>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {items.map(({ product }, index) => (
                <CartItem key={index} product={product}/>
              ))}
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transation Fee</span>
                  <span>
                    {formatPrice(fee, {
                      currency: "INR",
                    })}
                  </span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>
                    {formatPrice((cartTotal + fee))}
                  </span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={cn(
                      buttonVariants({
                        className: "w-full",
                      })
                    )}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                aria-hidden="true"
                src="/hippo-empty-cart.png"
                alt="hippo"
                fill
              />
            </div>
            <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add Items to Your Cart To Checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
