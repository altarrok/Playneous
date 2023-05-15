import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import { prisma } from "../server/prisma";

dotenv.config();


// created for each request
export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
    prisma
  });
  type Context = inferAsyncReturnType<typeof createContext>;
  
export const t = initTRPC.context<Context>().create();
