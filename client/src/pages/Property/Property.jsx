import React, { useContext, useState } from "react";
import "./Property.css";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { Map } from "../../components/Map/Map";
import useAuthChecks from "../../hooks/useAuthChecks";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModel from "../../components/BookingModel/BookingModel";
import UserDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const {user} = useAuth0();

  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const {userDetails : {token, bookings}, setUserDetails} = useContext(UserDetailContext);

  const [modelOpened, setModelOpened] = useState();
  const {validateLogin} = useAuthChecks();

  const {mutate : cancelBooking, isLoading : cancelling} = useMutation({
    mutationFn : () => removeBooking(id, user?.email, token),
    onSuccess : () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings : prev.bookings.filter((booking) => booking?.id !== id)
      }))
      toast.success("Booking Cancelled", {position : 'bottom-right'})
    }
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the data.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          {/* <AiFillHeart size={25} color="white" /> */}
          <Heart id= {id}/>
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />
        <div className="flexCenter property-details">
          {/* left side */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText">$ {data?.price}</span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parkings</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.rooms} Rooms</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {" "}
                {data?.city} {" "}
                {data?.country}
              </span>
            </div>

            {/* Booking button */}


            {
              bookings?.map(booking => booking.id).includes(id)? (
                <>
                <Button variant="outline" w ={"100%"} color="red" onClick={() => cancelBooking()} disabled={cancelling}>
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for date {bookings?.filter((booking) => booking.id === id)[0].date}
                </span>
                </>
              ) : (
                <button className="button"
                onClick={() => {
                  validateLogin() && setModelOpened(true)
                }}
                >Book your visit</button>
              )
            }

            <BookingModel 
              opened = {modelOpened}
              setOpened = {setModelOpened}
              propertyId = {id}
              email = {user?.email}
            />
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            ></Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Property };
