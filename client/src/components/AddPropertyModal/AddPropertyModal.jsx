import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { AddLocation } from "../AddLocation/AddLocaion";
import { useAuth0 } from "@auth0/auth0-react";

import BasicDetails from "../BasicDetails/BasicDetails.jsx";
import { UploadImage } from "../UploadImage/UploadImage.jsx";
import Facilities from "../Facilities/Facilities.jsx";

const AddPropertyModal = ({opened, setOpened}) => {
    const [active, setActive] = useState(0);
    const {user} = useAuth0();

    const [propertyDetails, setPropertydetails] = useState({
        title : "",
        description : "",
        price : 0,
        country : "",
        city : "",
        address : "",
        image : null,
        facilities : {
            bedrooms : 0,
            parkings : 0,
            bathrooms : 0
        },
        userEmail : user?.email,
    });

    const nextStep = () => {
        setActive((current) => (current < 4 ? current + 1 : current));
    };
    
      const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
    };

    return (
        <Modal
            opened = {opened}
            onClose={() => setOpened(false)}
            closeOnClickOutside
            size={"90rem"}
        >
            <Container h={"40rem"} w={"100%"}>
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} >
                <Stepper.Step label="Location" description="Address">
                    <AddLocation
                        nextStep = {nextStep}
                        propertyDetails = {propertyDetails}
                        setPropertydetails = {setPropertydetails}
                    />
                    
                </Stepper.Step>

                <Stepper.Step label="Images" description="Upload">
                    <UploadImage
                        nextStep = {nextStep}
                        prevStep = {prevStep}
                        propertyDetails = {propertyDetails}
                        setPropertydetails = {setPropertydetails}
                    />
                </Stepper.Step>

                <Stepper.Step label="Basics" description="Details">
                    <BasicDetails
                        nextStep = {nextStep}
                        prevStep = {prevStep}
                        propertyDetails = {propertyDetails}
                        setPropertydetails = {setPropertydetails}
                    />
                </Stepper.Step>

                <Stepper.Step>
                    <Facilities
                        setActiveStep = {setActive}
                        setOpened = {setOpened}
                        prevStep = {prevStep}
                        propertyDetails = {propertyDetails}
                        setPropertydetails = {setPropertydetails}
                    />
                </Stepper.Step>


                <Stepper.Completed>
                Completed, click back button to get to previous step
                </Stepper.Completed>
                </Stepper>

            </Container>
        </Modal>
    )

}

export default AddPropertyModal;