import dotenv from "dotenv";
import path from 'path';
import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import nodemailer from 'nodemailer';
dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mohittest64@gmail.com',
      pass: "wboxcxguycayxmgm",
    },
  })

let cached = (global as any).payload;

if (!cached) {
    cached = {
        email: {
            transport: transporter, 
            fromAddress: "mohittest64@gmail.com",
            fromName: "mohitsankhla"
        },
        client: null, 
        promise: null
    };
    (global as any).payload = cached;
}

interface Args {
    initOptions ?: Partial<InitOptions>
}

export const getPayloadClient = async ({ initOptions } : Args = {}): Promise<Payload> => {
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error("PAYLOAD_SECRET is missing");
    }

    if (cached.client) {
        return cached.client;
    }

    if (!cached.promise) {
        cached.promise = payload.init({
            secret: process.env.PAYLOAD_SECRET!,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        });
    }

    try {
        cached.client = await cached.promise;
    } catch (e: unknown) {
        cached.promise = null;
        throw e;
    }

    return cached.client;
}