import express from 'express';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from './trpc';
const app = express();

const port = Number(process.env.PORT) || 3000;
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ 
    req, 
    res
 })
const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app, 
            onInit: (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
            }
        }
    });
    app.use('/trpc/api', trpcExpress.createExpressMiddleware({
        router: appRouter, 
        createContext
    }));
    // forwarding our routing logic to next js
    app.use((req, res) => nextHandler(req, res));
    nextApp.prepare().then(() => {
        // payload.logger.info('Next.js Started');
        app.listen(port, () => {
            // payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        });
    }).catch();
}

start();
