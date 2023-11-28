import asyncHandler from 'express-async-handler';

import {prisma} from '../config/prismaConfig.js';

export const createResidency = asyncHandler(async (req, res) => {
    const {title, description, price, address, city, 
    country, facilities, userEmail, image} = req.body.data;
    // console.log(req.body.data);

    try{
        const residency = await prisma.Residency.create({
            data : {title, description, price, address, city, 
                country, facilities, image,
                owner : {connect : {email : userEmail}}
            }
        });
        res.send({
            message : "residency created succesfully.", 
            residency
        })
    }
    catch(err){
        if(err.code === "P2002"){
            throw new Error("A residency with this residency already exist.");
        }
        else new Error(err.message);
    }
});

// function to get all the residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.Residency.findMany({
        orderBy : {
            createdAt : "desc"
        }
    });
    res.send(residencies);
});

// function to get in a single residency
export const getResidency = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const residency = await prisma.Residency.findUnique({
            where : {
                id : id
            }
        });
        res.send(residency);
    }catch(err) {
        throw new console.error(err.message);
    }
});

