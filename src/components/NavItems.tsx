"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { FC } from "react";
import { useState } from "react";
import NavItem from "./NavItem";

const NavItems: FC = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = index === activeIndex;

        return <NavItem key={category.value} category={category} handleOpen={handleOpen} isOpen={isOpen} isAnyOpen={activeIndex !== null}/>;
      })}
    </div>
  );
};

export default NavItems;
