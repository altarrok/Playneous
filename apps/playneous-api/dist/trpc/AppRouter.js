"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const ExampleRouter_1 = require("./api/ExampleRouter");
const trpc_1 = require("./trpc");
exports.appRouter = trpc_1.t.router({
    example: ExampleRouter_1.ExampleRouter,
});
