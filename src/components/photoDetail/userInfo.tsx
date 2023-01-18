import {ListItem, ListItemAvatar, ListItemText, Typography,} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import {getLocationMain} from "../../utils";
import {PhotoAction} from "./photoAction";
import {ProfileAvatar} from "../avatar/profileAvatar";
import {SetModal, User} from "./types";


type UserInfoProp = {
    photo: {
        id: string
        location: string
        user: User & {
            profile: {
                isFollowing: boolean
            }
        }
    },
    setModal: SetModal
}

export const UserInfo = ({photo, setModal}: UserInfoProp) => {
    return (
        <ListItem
            sx={{pt: 0, pl: 0, pr: 0, "& .MuiListItemSecondaryAction-root": {right: 0}}}
            secondaryAction={<PhotoAction photo={photo} setModal={setModal}/>}
        >
            <ListItemAvatar>
                <ProfileAvatar
                    component={RouterLink}
                    to={"/user/" + photo.user.id}
                    alt={photo.user.firstName.toUpperCase()}
                    src={photo.user.profile.avatar}
                    onClick={() => setModal({open: false, photoId: ""})}
                    sx={{textDecoration: 'none'}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography
                        component={RouterLink}
                        to={"/user/" + photo.user.id}
                        sx={{fontWeight: 'medium', textDecoration: 'none'}}
                        color='textPrimary'
                        onClick={() => setModal({open: false, photoId: ""})}
                    >
                        {photo.user.firstName + " " + photo.user.lastName}
                    </Typography>
                }
                secondary={
                    <Typography noWrap variant="body2" color="grey">
                        {getLocationMain(photo.location)}
                    </Typography>
                }
            />
        </ListItem>
    );
};
