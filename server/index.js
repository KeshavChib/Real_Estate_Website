import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./route/userRoute.js";
import { residencyRoute } from "./route/residencyRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoute);
app.use ('/api/residency', residencyRoute);


// yarn add cookie-parser cors dotenv express express-async-handler express-oauth2-jwt-bearer nodemon prisma @prisma/client