import axios from 'axios';
import dayjs from 'dayjs';
import {toast} from 'react-toastify';

export const api = axios.create({
    baseURL : "http://localhost:8000/api",
});


export const getAllProperties = async() => {
    try{
        const responce = await api.get('/residency/allresd', {
            timeout : 10 * 1000,
        });

        if(responce.status === 400 || responce.status === 500){
            throw responce.data;
        }
        return responce.data;
    }catch(error){
        toast.error("something went wrong");
        throw error;
    }
}

export const getProperty = async(id) => {
    try {
        const responce = await api.get(`/residency/${id}`, {
            timeout : 10 * 1000,
        });

        if(responce.status === 400 || responce.status === 500){
            throw responce.data;
        }
        return responce.data;
    } catch (error) {
        toast.error("something went wrong.");
        throw error;
    }
}

export const createUser = async (email, token) => {
    try{
        api.post('/user/register', {email : email}
        , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        );
    }
    catch(error){
        console.log("in");
        toast.error("Something went wrong, Please try again.");
        throw error;
    }
};

export const bookVisit = async(date, propertyId, email,token ) => {
    try{
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            id : propertyId,
            date : dayjs(date).format("DD/MM/YYYY")
        },
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        )
    }catch(error){
        toast.error("Sometihing went wrong! Please try Again.");
        throw error;
    }
}


export const removeBooking = async(id, email, token) => {
    try{
        await api.post(`/user/removeBooking/${id}`, {
            email
        }, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
    }catch(error){
        toast.error("Sometihing went wrong! Please try Again.");
        throw error;
    }
}

export const toFav = async(id, email, token) =>  {
    try{
        await api.post(`user/toFav/${id}`, {
            email
        },
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    }
    catch(error){
        toast.error("Sometihing went wrong! Please try Again.");
        throw error;
    }
}

export const getAllFav = async(email, token) => {
    if(!token) return;
    try {
        const res = await api.post('/user/allFav', {
            email
        }, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data["favResidenciesID"];
    }catch(err){
        toast.error("Something went wrong while fetching favourits.")
        throw err
    }
}

export const getAllBookings = async(email, token) => {
    if(!token) return;
    try {
        const res = await api.post('/user/getAllBookings', {
            email
        }, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data["bookedVisits"];
    }catch(err){
        toast.error("Something went wrong while fetching Bookings.")
        throw err
    }
}


export const createResidency = async(data, token) => {
    console.log(data);
    console.log(token);
    try{
        const res = await api.post("/residency/create/", {
            data
        }, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    }catch(error) {
        toast.error("Something went wrong while adding properties.");
        throw error;
    }
}