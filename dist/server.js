"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./app/config/env");
const app_1 = __importDefault(require("./app"));
let server;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("Connected to DB!!");
        server = app_1.default.listen(5000, () => {
            console.log(`Server is listening to port ${env_1.envVars.PORT}`);
        });
        // Example usage: handle SIGTERM for clean shutdown
        process.on("SIGTERM", () => {
            console.log("SIGTERM received. Closing server...");
            server.close(() => {
                mongoose_1.default.disconnect();
                console.log("Server closed and DB disconnected");
            });
        });
    }
    catch (error) {
        console.error(error);
    }
};
startServer();
//# sourceMappingURL=server.js.map