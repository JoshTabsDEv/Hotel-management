"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key, fallback) => {
    var _a;
    const value = (_a = process.env[key]) !== null && _a !== void 0 ? _a : fallback;
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
exports.env = {
    nodeEnv: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development",
    port: Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5000),
    db: {
        host: getEnv("DB_HOST", "localhost"),
        port: Number((_c = process.env.DB_PORT) !== null && _c !== void 0 ? _c : 3306),
        user: getEnv("DB_USER", "root"),
        password: getEnv("DB_PASSWORD", ""),
        database: getEnv("DB_NAME", "hotel_management"),
    },
};
//# sourceMappingURL=env.js.map