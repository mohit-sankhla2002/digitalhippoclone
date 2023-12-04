import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product Details",
    },
    {
      name: "price",
      type: "number",
      label: "Price in INR",
      min: 0,
      max: 100000,
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      type: "relationship",
      label: "Product File(s)",
      relationTo: "product_files",
      required: true,
      hasMany: false,
    },
    {
      name: "approved_for_sale",
      label: "Product Status",
      type: "select",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending Verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
      defaultValue: "pending",
    },
    {
      name: "price_id",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripe_id",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
        name: "images", 
        type: "array", 
        label: "Product Images",
        minRows: 1, 
        maxRows: 4, 
        required: true,
        labels: {
            singular: "Image", 
            plural: "Images"
        },
        fields: [
            {
                name: "image", 
                type: "upload", 
                relationTo: "media", 
                required: true
            }
        ]
    }
  ],
};
