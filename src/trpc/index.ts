import { QueryValidator } from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { router, publicProcedure } from "./trpc";
import { z } from 'zod';
import { getPayloadClient } from '../get-payload'
import { paymentRouter } from "./payment-router";
export const appRouter = router({
    auth: authRouter, 
    payment: paymentRouter, 
    getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, ...queryOpts } = query

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<
        string,
        { equals: string }
      > = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1;

      try {
        const {
            docs: items,
            hasNextPage,
            nextPage,
          } = await payload.find({
            collection: 'products',
            where: {
              approved_for_sale: {
                equals: 'approved',
              },
              ...parsedQueryOpts,
            },
            sort,
            depth: 1,
            limit,
            page,
          })
    
          return {
            items,
            nextPage: hasNextPage ? nextPage : null,
          }
      } catch (error) {
        console.log(error);
        throw new Error("Something Went Wrong");
      }

      
    }),
});

export type AppRouter = typeof appRouter;