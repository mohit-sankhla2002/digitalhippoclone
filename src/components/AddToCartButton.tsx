"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Product, User } from "@/payload-types";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CartProps {
    product: Product, 
    user: User | null
}

const AddToCartButton = ({ product, user }: CartProps) => {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { addItem } = useCart();

    useEffect(() => {
        const timeout = setTimeout(() => {setIsSuccess(false)}, 2000)

        return () => clearTimeout(timeout);
    }, [isSuccess])

  return (
    <Button onClick={() => {
        if (!user) {
          router.push("/sign-in");
          return;
        }
        addItem(product)
        setIsSuccess(true);

    }} size="lg" className="w-full">
      {isSuccess ? "Added!" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
