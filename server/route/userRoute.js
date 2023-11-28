import express from "express";
import { allFav, bookVisit, cancelBooking, createUser, getAllBookings, toFav } from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0config.js";

const router = express.Router();

router.post('/register' , jwtCheck, createUser);
router.post('/bookVisit/:id',jwtCheck, bookVisit);
router.post('/getAllBookings', jwtCheck, getAllBookings);
router.post('/removeBooking/:id', jwtCheck, cancelBooking);
router.post('/toFav/:rid', jwtCheck, toFav);
router.post('/allFav', jwtCheck, allFav);

export {router as userRoute};