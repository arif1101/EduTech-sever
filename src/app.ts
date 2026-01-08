import express, { Request, Response } from "express";
import { router } from "./app/routes";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

// app.set("trust proxy", 1);

app.use(cookieParser())
app.use(express.json())
app.set("trust proxy",1)

// -------------- NextJS ---------
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }))

app.use(cors({
    origin: ["https://edu-mart-client.vercel.app","http://localhost:3000"],
    credentials: true
}))

// ---------- for react -------- 
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
// app.use(cors({
//     origin: "https://edu-tech-client-one.vercel.app",
//     credentials: true
// }))
app.use("/api", router)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to EduTech"
    })
})
// app.use(globalErrorHandler)
// app.use(notFound)

export default app