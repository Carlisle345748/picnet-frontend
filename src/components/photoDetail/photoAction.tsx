import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {Dialog, IconButton, List, ListItem, ListItemButton, Stack, Typography} from "@mui/material";
import {FollowButton} from "../button/followButton";
import {MoreVertOutlined} from "@mui/icons-material";
import React, {useState} from "react";
import {useHandleGraphQLError} from "../../utils";
import {DeleteConfirm} from "./deleteConfirm";
import {TRelayNode} from "../../gql/types";
import {useDeletePhotoMutation} from "../../gql/gql";
import {SetModal} from "./types";

type MenuButtonProp = {
    text: string,
    color?: string,
    onClick: () => void
}

type PhotoActionProp = {
    photo: TRelayNode & {
        user: {
            id: string
            profile: {
                isFollowing: boolean
            }
        }
    }
    setModal: SetModal
}

export const MenuButton = ({text, color, onClick}: MenuButtonProp) => {
    return (
        <ListItem sx={{p: 0}}>
            <ListItemButton sx={{width: 400, height: 50}} onClick={onClick}>
                <Typography sx={{width: 1}} color={color} align='center'
                            fontWeight="medium">{text}</Typography>
            </ListItemButton>
        </ListItem>
    )
}

export const PhotoAction = ({photo, setModal}: PhotoActionProp) => {
    const loginUserId = useSelector(selectLoggedUserId);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const [deletePhoto, {error}] = useDeletePhotoMutation({
        update(cache) {
            cache.evict({id: cache.identify(photo)});
            cache.gc();
        }
    });

    const onDeletePhoto = async () => {
        setOpenDeleteConfirm(false);
        setOpenMenu(false);
        setModal({open: false, photoId: ""});
        await deletePhoto({variables: {photoId: photo.id}});
    };

    useHandleGraphQLError([error]);

    return (
        <Stack alignItems="center" direction="row" mb={1}>
            {
                loginUserId !== photo.user.id &&
                <FollowButton
                    user={photo.user}
                    sx={{
                        textTransform: "none",
                        width: 100,
                        height: 35,
                        color: photo.user.profile.isFollowing ? "black" : "white",
                        "&:hover": {
                            boxShadow: "none",
                            backgroundColor: photo.user.profile.isFollowing
                                ? "#efefef"
                                : "#ad081b",
                        },
                        backgroundColor: photo.user.profile.isFollowing ? "#ddd" : "#e60023",
                    }}
                />
            }
            {
                loginUserId === photo.user.id &&
                <IconButton onClick={() => setOpenMenu(true)}>
                    <MoreVertOutlined/>
                </IconButton>
            }
            <Dialog open={openMenu}
                    PaperProps={{sx: {width: 400, borderRadius: 4}}}
                    onClose={() => setOpenMenu(false)}>
                <List dense disablePadding>
                    <MenuButton text={"Delete"} color={"red"} onClick={() => setOpenDeleteConfirm(true)}/>
                    <MenuButton text={"Cancel"} onClick={() => setOpenMenu(false)}/>
                </List>
            </Dialog>
            <DeleteConfirm
                onDelete={onDeletePhoto}
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                title={"Delete Photo?"}
                subTitle={"Are you sure to delete this photo?"}
            />
        </Stack>
    )
}