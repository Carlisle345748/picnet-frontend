import {Box, CardMedia, Stack, Typography, useTheme} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ErrorIcon from '@mui/icons-material/Error';
import {useFormContext, useWatch} from "react-hook-form";


export const PhotoPlaceHolder = () => {
    const {formState: {errors} } = useFormContext();
    const theme = useTheme();
    return (
        <Stack
            sx={{
                backgroundColor: errors.photo ? "#fcd6d6": theme.palette.grey['300'],
                border: errors.photo ? "2px solid red": "",
                width: 480,
                height: 600,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
            }}>
            <Stack
                component="label"
                htmlFor="upload-photo"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: theme.palette.grey.A400,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    width: 0.9,
                    height: 0.93,
                    '&:hover': {cursor: 'pointer'}
                }}
            >
                {
                    errors.photo
                        ? <ErrorIcon fontSize='large' color='error'/>
                        : <FileUploadIcon fontSize='large' color='action'/>
                }
                <Typography color={errors.photo ? "#d32f2f": "textPrimary"}>
                    {errors.photo ? errors.photo.message as string : "Click to upload photo"}
                </Typography>
            </Stack>
        </Stack>
    )
}

export const Photo = ({photo}: {photo: File}) => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="black"
            borderRadius={2}
            component="label"
            htmlFor="upload-photo"
            sx={{
                width: 480,
                height: 600,
                '&:hover': {
                    cursor: 'pointer',
                }
            }}
        >
            <CardMedia
                sx={{maxHeight: "100%", objectFit: "contain"}}
                component="img"
                image={URL.createObjectURL(photo)}
            />
        </Stack>
    )
}

export const SelectPhoto = () => {
    const { register } = useFormContext();
    const photo = useWatch({name: 'photo', defaultValue: null});

    return (
        <Box>
            <input
                accept="image/*"
                type="file"
                id='upload-photo'
                style={{display: "none"}}
                {...register("photo", {required: "You need to select a photo"})}
            />
            {photo ? <Photo photo={photo[0]}/> : <PhotoPlaceHolder/>}
        </Box>
    )
}