"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../server/prisma");
dotenv_1.default.config();
// created for each request
const createContext = ({ req, res, }) => ({
    prisma: prisma_1.prisma
});
exports.createContext = createContext;
exports.t = server_1.initTRPC.context().create();
