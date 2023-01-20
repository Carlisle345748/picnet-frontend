import {Box, CircularProgress, Input, Stack, Typography} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {StyleLoadingButton} from "../button/button";
import {LocationInput} from "./locationInput/locationInput";
import {TagsInput} from "./tagsInput/tagsInput";
import {ProfileAvatar} from "../avatar/profileAvatar";

export type PhotoInfoProp = {
    user: {
        firstName: string
        lastName: string
        profile: {
            avatar: string
        }
    }
    loading: boolean
    width?: number | string
}


export const PhotoInfo = ({user, loading, width}: PhotoInfoProp) => {
    const {register} = useFormContext();

    return (
        <>
            {user &&
                <Stack spacing={2} width={width}>
                    <Stack direction='row' alignItems="center" spacing={1}>
                        <ProfileAvatar
                            src={user.profile.avatar}
                            alt={(user.firstName + " " + user.lastName).toUpperCase()}
                        />
                        <Typography color='textPrimary' fontWeight='medium'>
                            {user.firstName + " " + user.lastName}
                        </Typography>
                    </Stack>
                    <Input
                        multiline
                        rows={6}
                        placeholder="Tell a story"
                        {...register("description")}
                    />
                    <Typography fontWeight='medium'>
                        Tags
                    </Typography>
                    <TagsInput/>
                    <Typography fontWeight='medium'>
                        Location
                    </Typography>
                    <LocationInput/>
                    <Box flexGrow={1}/>
                    <Stack justifyContent='flex-end' direction='row' spacing={1}>
                        <StyleLoadingButton
                            loading={loading}
                            variant='contained'
                            type="submit"
                            loadingIndicator={<CircularProgress size={20} thickness={5} sx={{color: "white"}}/>}
                            sx={{
                                width: 100,
                                fontSize: 16,
                                fontWeight:
                                    'medium'
                            }}>
                            Post
                        </StyleLoadingButton>
                    </Stack>
                </Stack>}
        </>
    )
}