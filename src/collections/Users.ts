import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users", 
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                console.log("generating email");
                return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Click Here to Verify</a>`;
            },
        }
    }, 
    access: {
        read: () => true,
        create: () => true
    },
    fields: [
        {
            name: "role", 
            required: true, 
            defaultValue: "user", 
            type: "select", 
            options: [
                {
                    label: "Admin", 
                    value: "admin"
                }, 
                {
                    label: "User", 
                    value: "user"
                }
            ]
        }
    ]
}