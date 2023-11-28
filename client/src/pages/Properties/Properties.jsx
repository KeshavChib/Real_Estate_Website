import React, { useState } from "react";
import "./properties.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useProperties } from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import { PropertyCard } from "../../components/Propertycard/PropertyCard";
import { property } from "lodash";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  if (isError) {
    return (
      <div>
        <span>Error while fetching the data.</span>
      </div>
    );
  }

  if (isLoading) {
    console.log("herre");
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
          {/* {data.map((card, i) => (
            <PropertyCard card={card} key={i} />
          ))} */}

          {
            data.
            filter((property) => property.title.toLowerCase().includes(filter.toLowerCase()) ||
            property.city.toLowerCase().includes(filter.toLowerCase()) ||
            property.country.toLowerCase().includes(filter.toLowerCase()))
            .map((card, i) => (
              <PropertyCard card={card} key={i} />))
          }
        </div>
      </div>
    </div>
  );
};

export { Properties };
