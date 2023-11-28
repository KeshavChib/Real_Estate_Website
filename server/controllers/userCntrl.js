import asyncHandler from 'express-async-handler';

import {prisma} from '../config/prismaConfig.js';
export const createUser = asyncHandler(async (req, res) => {
    console.log("creating a user");
    let {email} = req.body;
    const userExist = await prisma.user.findUnique({where : {email : email}});
    if(!userExist)  {
        const user = await prisma.user.create({data : req.body});
        res.send({
            message : "User registered successfully",
            user : user
        });
    }
    else {
        res.status(201).send({message : "User already registered", user : userExist});
    }
    console.log(email);
});

// function to book a visit to a residency
export const bookVisit = asyncHandler(async (req, res) => {
    const {email, date} = req.body;
    const {id} = req.params;

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where : {email},
            select : {bookedVisits : true}
        });

        if(alreadyBooked.bookedVisits.some((visit) => visit.id === id)){
            res.status(404).json({message : "This residency is already booked by you."});
        }
        else {
            await prisma.user.update({
                where : {email},
                data : {
                    bookedVisits : {push : {id, date}}
                }
            });
            res.send("Your visit is booked successfully.");
        }
    }
    catch(err) {
        throw new Error(err.message);
    }
});


// function to get all the bookings

export const getAllBookings = asyncHandler(async (req, res) => {
    const {email} = req.body;

    try{
        const bookings = await prisma.user.findUnique({
            where : {email},
            select : {bookedVisits : true}
        })
        res.status(200).send(bookings);
    }catch(err){
        throw new Error(err.message);
    }
});

// function to cancel the booking

export const cancelBooking = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const {id} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where : {email : email},
            select : {bookedVisits : true}
        });


        const index = user.bookedVisits.findIndex((visits) => visits.id === id); 

        if(index === -1) {
            res.status(404).json("Booking not found");
        }
        else {
            user.bookedVisits.splice(index, 1);

            await prisma.user.update({
                where : {email},
                data : {
                    bookedVisits : user.bookedVisits
                }
            });

            res.send("Booking cancelled successfully.");
        }
    }catch (err){
        throw new Error(err.message);
    }
});


// function to add a residency in fvrt list of the user

export const toFav = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const {rid} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where : {email : email}
        });

        if(user.favResidenciesID.includes(rid)){
            const updateUser = await prisma.user.update({
                where : {email},
                data : {
                    favResidenciesID : {
                        set : user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            });

            res.send({
                message : "Removed From Faviorites",
                user : updateUser
            })
        }
        else{
            const updateuser = await prisma.user.update({
                where : {email},
                data : {
                    favResidenciesID : {push : rid}
                }
            });

            res.send({
                message : "Updated favorites",
                user : updateuser
            });
        }
    }
    catch(err){
        throw new Error(err.message);
    }
});

// function to get all fav residecies of a user

export const allFav = asyncHandler(async (req, res) => {
    const {email} = req.body;

    try {
        const fvrtResd = await prisma.user.findUnique({
            where : {email},
            select : {
                favResidenciesID : true
            }
        });

        res.status(200).send(fvrtResd);
    }catch(err) {
        throw new Error(err.message);
    }
});