import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthChecks from "../../hooks/useAuthChecks";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { toFav } from "../../utils/api";
import { checkfavourites, updateFavourites } from "../../utils/common";

const Heart = ({id}) => {

    const [heartColor, setHeartColor] = useState('white');
    const {validateLogin} = useAuthChecks();
    const {user} = useAuth0();
    const {userDetails : {token, favourites}, setUserDetails} = useContext(UserDetailContext);

    useEffect(() => {
        setHeartColor(() => checkfavourites(id, favourites))
    }, [favourites]);

    const {mutate} = useMutation({
        mutationFn : () => toFav(id, user?.email, token),
        onSuccess : () => {
            setUserDetails((prev) => (
                {
                    ...prev,
                    favourites : updateFavourites(id, prev.favourites)
                }
            ))
        }
    })

    const handleLike = () => {
        if(validateLogin()){
            mutate()
            setHeartColor(prev => prev === "fa3e5f"? "white" : "fa3e5f") 
        }
    }

    return (
        <AiFillHeart size={25} color={heartColor} onClick={(e)  => {
            e.stopPropagation()
            handleLike()
        }} />
    )
}
export default Heart;