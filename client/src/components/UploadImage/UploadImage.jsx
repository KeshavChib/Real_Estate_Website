import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";


const UploadImage = ({nextStep, prevStep, propertyDetails, setPropertydetails}) => {
    const [imageUrl, setImageUrl] = useState(propertyDetails?.image);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName:  import.meta.env.VITE_CLOUDNAME,
                uploadPreset : import.meta.env.VITE_UPLOADPRESET,
                maxFiles : 1
            },
            (err, result) => {
                if(result.event === "success") {
                    setImageUrl(result.info.secure_url)
                }
            }
        )
    }, [])

    const handleNext = () => {
        setPropertydetails((prev) => ({...prev, image : imageUrl}))
        nextStep();
    }

    return (
        <div className="flexColCenter uploadWrapper"

        >
            {
                !imageUrl? 
                (<div className="flexColCenter uploadZone"
                    onClick={() => widgetRef.current?.open()}
                >
                    <AiOutlineCloudUpload size={50} color = "grey" />
                    <span>Upload Image</span>
                </div>) : (
                    <div className="uploadedImage"
                    onClick={() => widgetRef.current?.open()}
                    >
                        <img src={imageUrl} alt="uploadedImage" />
                    </div>
                )
            }
            <Group position="center" mt={"xl"}>
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={handleNext} disabled={!imageUrl}>Next</Button>
            </Group>
        </div>
    )
};

export {UploadImage};