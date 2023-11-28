import { Button, Modal } from "@mantine/core";
import {DatePicker} from '@mantine/dates';
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModel = ({opened, propertyId, email, setOpened}) => {
    const [value, setValue] = useState(null);
    const {userDetails : {token}, setUserDetails} = useContext(UserDetailContext);
    

    const handleBookingSuccess = () => {
        toast.success("You have booked your visits.", {
            position : 'bottom-right'
        })
        setUserDetails((prev) => ({
            ...prev,
            bookings : [
                ...prev.bookings,
                {
                    id : propertyId, date : dayjs(value).format("DD/MM/YYYY")
                }
            ]
        }));
    }

    const {mutate, isLoading} = useMutation({
        mutationFn : () => bookVisit(value, propertyId, email,token ),
        onSuccess : () => handleBookingSuccess(),
        onError : ({res}) => toast.error(res.data.message),
        onSettled : () => setOpened(false)
    }
    );
    return (
        <Modal
            opened = {opened}
            onClick={() => setOpened(false)}
            title = "Select a date of visit"
            centered
        >
            <div className="flexColCenter" style={{gap : "1rem"}}>
                <DatePicker value={value} onChange={setValue} minDate={new Date()} />
                <Button 
                    disabled={!value || isLoading}
                    onClick={() => mutate()}

                >Book Visit</Button>
            </div>
        </Modal>
    )
}

export default BookingModel;