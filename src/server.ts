// FIXME: Default import alias is not working and I don't know the exact reason for it

import express from 'express';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';
const app = express();

const port = Number(process.env.PORT) || 3000;
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ 
    req, 
    res
 })
export type ExpressContext = inferAsyncReturnType<typeof createContext>
const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app, 
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
            }
        }
    });
    
    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter, 
        createContext
    }));
    // forwarding our routing logic to next js
    app.use((req, res) => nextHandler(req, res));
    nextApp.prepare().then(() => {
        payload.logger.info('Next.js Started');
        app.listen(port, () => {
            payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        });
    }).catch((e) => {
        console.log(e);
    });
}

start();
