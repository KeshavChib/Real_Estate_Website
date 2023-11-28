import React from "react";
import {Menu, Avatar, MantineProvider} from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { replace } from "lodash";

const ProfileMenu = ({user, logout}) => {
    const navigate = useNavigate();
    return (

        <Menu>
            <Menu.Target>
                <Avatar src={user?.picture} alt="user profile" radius={"xl"} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => navigate("/favourites", {replace : true})}>
                    Favourites
                </Menu.Item>
                <Menu.Item onClick={() => navigate("/bookings", {replace : true})}>Bookings</Menu.Item>
                <Menu.Item onClick={() => {
                    localStorage.clear()
                    logout()
                }}>LogOut</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export {ProfileMenu};