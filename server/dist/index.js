"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});
app.use("/api/hotels", hotelRoutes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Unexpected server error" });
});
app.listen(env_1.env.port, () => {
    console.log(`API running on http://localhost:${env_1.env.port}`);
});
//# sourceMappingURL=index.js.map