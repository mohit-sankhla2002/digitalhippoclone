import { appRouter } from "../../../../trpc"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler = (req: Request) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req, 
        router: appRouter,
        // @ts-expect-error context already passed on using middleware
        createContext: () => ({req, res})
    })
}

export { handler as GET, handler as POST };