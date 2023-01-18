import {Box, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {StyleLoadingButton} from "../button/button";
import {useHandleGraphQLError} from "../../utils.jsx";
import {ProfileAvatar} from "../avatar/profileAvatar";
import imageCompression from "browser-image-compression";
import {useUploadAvatarMutation} from "../../gql/gql";

export type EditAvatarProp = {
    user:  {
        firstName: string
        lastName: string
        profile: {
            avatar: string
        }
    }
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const EditAvatar = function ({user, setOpen}: EditAvatarProp) {
    return (
        <Box
            position="relative"
            sx={{"&:hover": {cursor: "pointer"}}}
            onClick={() => setOpen(true)}
        >
            <ProfileAvatar
                sx={{height: 100, width: 100, fontSize: 50}}
                alt={user!.firstName + " " + user!.lastName}
                src={user!.profile.avatar}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 100,
                    height: 100,
                    lineHeight: 6.2,
                    borderRadius: 20,
                    backgroundColor: "black",
                    opacity: 0,
                    "&:hover": {opacity: 0.4}
                }}
            >
            </Box>
        </Box>
    )
}

export const UploadAvatar = function ({setOpen}: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState(false);
    const [uploadAvatar, {error}] = useUploadAvatarMutation({
        update(cache, {data}) {
            const profile = data!.uploadAvatar;
            cache.modify({
                id: cache.identify(profile),
                fields: {
                    avatar() {
                        return profile.avatar;
                    }
                }
            })
        }
    });

    useHandleGraphQLError([error]);

    const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            setLoading(true);
            const file = await imageCompression(e.target.files[0], {maxSizeMB: 0.2});
            await uploadAvatar({variables: {avatar: file}});
            setOpen(false);
            setLoading(false);
        }
    };

    return (
        <Paper sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 4,
            p: 2,
            minWidth: 400,
            minHeight: 120,
        }}
        >
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={3}>
                <Typography align="center" variant="h4" fontWeight="medium">Choose your picture</Typography>
                <input
                    accept="image/*"
                    id="upload-avatar"
                    type="file"
                    style={{display: "none"}}
                    onChange={handleUploadAvatar}
                />
                <StyleLoadingButton
                    loading={loading}
                    sx={{width: 160, fontSize: 15}}
                    loadingIndicator={<CircularProgress size={20} thickness={5} sx={{color: "white"}}/>}
                >
                    <label htmlFor="upload-avatar">
                        Choose you photo
                    </label>
                </StyleLoadingButton>
            </Stack>
        </Paper>
    )
}