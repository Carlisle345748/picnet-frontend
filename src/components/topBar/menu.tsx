import {ListItemAvatar, ListItemText, Menu, MenuItem, Typography,} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import {useApolloClient} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectLoggedUserId} from "../loginRegister/loginSlice";
import {useHandleGraphQLError} from "../../utils";
import {useNavigate} from "react-router";
import {ProfileAvatar} from "../avatar/profileAvatar";
import {useGetLoginUserBasicQuery, useLogoutMutation} from "../../gql/gql";
import {AnchorElState, SetAnchorEl} from "./types";

type ProfileMenuProp = {
    anchorEl: AnchorElState
    setAnchorEl: SetAnchorEl
}

export default function ProfileMenu({anchorEl, setAnchorEl}: ProfileMenuProp) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const client = useApolloClient();
    const loginUserId = useSelector(selectLoggedUserId);

    const {error: queryErr, data} = useGetLoginUserBasicQuery({
        variables: {id: loginUserId},
        skip: !Boolean(loginUserId),
    });
    const [sendLogout, {error: logoutErr}] = useLogoutMutation();

    useHandleGraphQLError([queryErr, logoutErr]);

    const handleLogout = async () => {
        await sendLogout();
        setAnchorEl(null);
        dispatch(logout());
        await client.resetStore();
    };

    const handleEditProfile = () => {
        setAnchorEl(null);
        navigate("editProfile");
    }

    return (
        !data?.user ? <></> : (
            <Menu
                id="memu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: 2,
                        boxShadow: 1,
                        paddingLeft: 1,
                        paddingRight: 1,
                    },
                }}
            >
                <MenuItem
                    component={Link}
                    to={`/user/${loginUserId}`}
                    onClick={() => setAnchorEl(null)}
                    sx={{mb: 1, borderRadius: 5}}
                >
                    <ListItemAvatar>
                        <ProfileAvatar
                            alt={data.user.firstName + " " + data.user.lastName}
                            src={data.user.profile.avatar}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography fontWeight="medium" fontSize={17}>
                                {data.user.firstName + " " + data.user.lastName}
                            </Typography>
                        }
                        secondary={data.user.username}
                    />
                </MenuItem>
                <MenuItem onClick={handleEditProfile} sx={{borderRadius: 5}}>
                    <Typography fontWeight="medium">Edit Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{borderRadius: 5}}>
                    <Typography fontWeight="medium">Log out</Typography>
                </MenuItem>
            </Menu>
        )
    );
}
