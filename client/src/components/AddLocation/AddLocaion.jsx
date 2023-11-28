import React from "react";
import {useForm} from "@mantine/form"
import { validateString } from "../../utils/common";
import useCountries from "../../hooks/useCountries";
import { Button, Group, Select, TextInput } from "@mantine/core";
import {Map} from "../Map/Map";


const AddLocation = ({propertyDetails, setPropertydetails, nextStep}) => {
    const {getAll} = useCountries();
    const form = useForm({
        initialValues : {
            country : propertyDetails?.country,
            city  : propertyDetails?.city,
            address : propertyDetails?.address
        },

        validate : {
            country : (value) => validateString(value),
            city : (value) => validateString(value),
            address : (value) => validateString(value)
        }
    });

    const handleSubmit = () => {
        const {hasError} = form.validate();
        if(!hasError) {
            setPropertydetails((prev) => ({...prev, country : country, city, address}))
        }
        nextStep();
    }

    const {country, city, address} = form?.values;
    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >

            <div className="flexCenter" style={{
                justifyContent : "space-between",
                gap : "3rem",
                marginTop : "3rem"
            }}

            >
                {/* left side */}
                {/* inputs
                 */}

                 <div className="flexColStart" style={{gap : "1rem", flex : 1}}>
                    <Select
                        w={"100%"}
                        withAsterisk
                        label="Country"
                        clearable
                        searchable
                        data={getAll()}
                        
                        {...form.getInputProps("country", { type: "input" })}
                    />

                    <TextInput 
                        w={"100%"}
                        withAsterisk
                        label="City"
                        {...form.getInputProps("city", { type: "input" })}
                    />

                    <TextInput 
                        w={"100%"}
                        withAsterisk
                        label="Address"
                        {...form.getInputProps("address", { type: "input" })}
                    />

                 </div>
                    {/* right side */}
                    <div style={{flex: 1}}>
                        {/* I am at right */}
                        <Map
                        address={address}
                        city={city}
                        country={country}
                        ></Map>
                    </div>
            </div>
            
            <Group position="center" mt={"xl"}>
                <Button type="submit">Next Step</Button>
            </Group>

        </form>
    )
}

export {AddLocation};