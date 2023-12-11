"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Product } from "@/payload-types";
import { useCart } from "@/hooks/use-cart";

interface CartProps {
    product: Product
}

const AddToCartButton = ({ product }: CartProps) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { addItem } = useCart();

    useEffect(() => {
        const timeout = setTimeout(() => {setIsSuccess(false)}, 2000)

        return () => clearTimeout(timeout);
    }, [isSuccess])

  return (
    <Button onClick={() => {
        addItem(product)
        setIsSuccess(true);

    }} size="lg" className="w-full">
      {isSuccess ? "Added!" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
