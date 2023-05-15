import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { ExampleRouter } from './api/ExampleRouter';
import { t } from './trpc';

export const appRouter = t.router({
  example: ExampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;