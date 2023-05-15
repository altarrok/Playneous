import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "playneous-api";
 
export const trpc = createTRPCReact<AppRouter>();