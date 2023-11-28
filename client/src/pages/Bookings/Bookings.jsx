import React, { useContext, useState } from "react";
import "../Properties/Properties.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useProperties } from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import { PropertyCard } from "../../components/Propertycard/PropertyCard";
import UserDetailContext from "../../context/UserDetailContext";
import { property } from "lodash";
const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {userDetails : {bookings}} = useContext(UserDetailContext);
  if (isError) {
    return (
      <div>
        <span>Error while fetching the data.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-lable="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar 
          filter={filter}
          setFilter={setFilter}
        />

        <div className="paddings flexCenter prperties">

          {
            data?.
            filter((property) => bookings?.map((booking) => booking.id).includes(property.id)).
            filter((property) => property?.title?.toLowerCase().includes(filter?.toLowerCase()) ||
            property?.city?.toLowerCase().includes(filter?.toLowerCase()) ||
            property?.country?.toLowerCase().includes(filter?.toLowerCase()))
            .map((card, i) => (
              <PropertyCard card={card} key={i} />))
          }
        </div>
      </div>
    </div>
  );
};

export { Bookings };
