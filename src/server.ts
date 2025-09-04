import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!!");

    server = app.listen(5000, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);
    });

    // Example usage: handle SIGTERM for clean shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Closing server...");
      server.close(() => {
        mongoose.disconnect();
        console.log("Server closed and DB disconnected");
      });
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
