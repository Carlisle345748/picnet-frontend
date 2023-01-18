import {Box, Dialog, IconButton, Modal, Stack, Typography,} from "@mui/material";
import {useState} from "react";
import FollowList from "./followList";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../../loginRegister/loginSlice";
import {FollowCount, FollowCountProp} from "./followCount";
import {FollowButton, FollowButtonProp} from "../../button/followButton";
import CloseIcon from "@mui/icons-material/Close";
import {EditAvatar, EditAvatarProp, UploadAvatar} from "../../editProfile/editAvatar";
import {StyleButton} from "../../button/button";
import {useNavigate} from "react-router";
import {ProfileAvatar} from "../../avatar/profileAvatar";
import {FollowListModalState} from "../types";

type BasicInfoProp = {
    user: EditAvatarProp["user"]
        & FollowCountProp["user"]
        & FollowButtonProp["user"]
        & {
        id: string
        username: string
        profile: {
            description: string
        }
    }
}


export default function BasicInfo({user}: BasicInfoProp) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const loggedUserId = useSelector(selectLoggedUserId);
    const [modal, setModal] = useState<FollowListModalState>({open: false, list: null});

    return (
        <>
            {user &&
                <Stack justifyContent="center" alignItems="center" spacing={1}>
                    {
                        loggedUserId === user.id
                            ? <EditAvatar user={user} setOpen={setOpen}/>
                            : <ProfileAvatar
                                sx={{height: 100, width: 100, fontSize: 50}}
                                alt={user.firstName + " " + user.lastName}
                                src={user.profile.avatar}
                            />
                    }
                    <Stack justifyContent="center" alignItems="center">
                        <Typography variant="h4" sx={{fontWeight: 450}}>
                            {user.firstName + " " + user.lastName}
                        </Typography>
                        <Typography sx={{color: "gray", fontSize: 15}}>
                            {"@" + user.username}
                        </Typography>
                        <Typography sx={{maxWidth: 600, textAlign: "center", mt: 0.3}}>
                            {user.profile.description}
                        </Typography>
                        <FollowCount user={user} setModal={setModal}/>
                    </Stack>
                    {
                        loggedUserId !== user.id
                            ? <FollowButton user={user} sx={{fontSize: 18, py: 1, borderRadius: 10}}/>
                            : <StyleButton
                                onClick={() => navigate("/editProfile")}
                                sx={{
                                    width: 130,
                                    fontSize: 17,
                                    borderRadius: 10,
                                    py: 1,
                                    color: 'black',
                                    "&:hover": {
                                        boxShadow: "none",
                                        backgroundColor: "#ddd",
                                    },
                                    backgroundColor: "#efefef",
                                }}
                            >
                                Edit Profile
                            </StyleButton>
                    }
                    <Dialog
                        open={modal.open}
                        onClose={() => setModal({open: false, list: null})}
                        PaperProps={{
                            sx: {
                                boxShadow: 24,
                                borderRadius: 2,
                                width: '40%',
                                minWidth: 350,
                                maxWidth: 500,
                                minHeight: 300,
                            }
                        }}
                    >
                        {modal.open && <IconButton
                            sx={{position: 'absolute', top: "5.2%", right: "10%"}}
                            onClick={() => setModal({open: false, list: null})}
                            children={<CloseIcon/>}
                        />}
                        <FollowList userId={user.id} listType={modal.list} setModal={setModal}/>
                    </Dialog>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box><UploadAvatar setOpen={setOpen}/></Box>
                    </Modal>
                </Stack>

            }
        </>

    );
}
