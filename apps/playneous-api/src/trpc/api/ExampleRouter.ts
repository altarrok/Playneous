import { z } from "zod";
import { t } from "../trpc";

export const ExampleRouter = t.router({
    example: t.procedure
        .input(z.never())
        .mutation(async ({ input, ctx }) => {
        })
})