import {Box, CardMedia, Stack, Typography, useTheme} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ErrorIcon from '@mui/icons-material/Error';
import {useFormContext, useWatch} from "react-hook-form";
import {DragEventHandler, useState} from "react";


export const PhotoPlaceHolder = ({height}: { height: number | string }) => {
    const {formState: {errors}, setValue} = useFormContext();
    const theme = useTheme();
    const [dragActive, setDragActive] = useState(false);

    const handleDrag: DragEventHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type == "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleDrop: DragEventHandler = async (e) => {
        e.preventDefault();
        setValue("photo", e.dataTransfer.files);
    }

    const getBgColor = () => {
        if (dragActive) return "#e9f3fd";
        if (errors.photo) return "#fcd6d6";
        return theme.palette.grey['300'];
    }

    const getBorder = () => {
        if (dragActive) return "2px solid #3463ff";
        if (errors.photo) return "2px solid red";
        return "2px solid transparent";
    }

    return (
        <Stack
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            sx={{
                backgroundColor: getBgColor(),
                border: getBorder(),
                width: '100%',
                height: height,
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
                    width: 0.93,
                    height: 0.93,
                    '&:hover': {cursor: 'pointer'}
                }}
            >
                {
                    errors.photo
                        ? <ErrorIcon fontSize='large' color='error'/>
                        : <FileUploadIcon fontSize='large' color='action'/>
                }
                <Typography align="center" color={errors.photo ? "#d32f2f" : "textPrimary"}>
                    {errors.photo ? errors.photo.message as string : "Drag and drop or click to upload"}
                </Typography>
            </Stack>
        </Stack>
    )
}

export const Photo = ({photo, height}: { photo: File, height: number | string }) => {
    const {setValue} = useFormContext();

    const handleDrag: DragEventHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop: DragEventHandler = async (e) => {
        e.preventDefault();
        setValue("photo", e.dataTransfer.files);
    }

    return (
        <Stack
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="black"
            borderRadius={2}
            component="label"
            htmlFor="upload-photo"
            sx={{
                width: '100%',
                height: height,
                '&:hover': {
                    cursor: 'pointer',
                }
            }}
        >
            {
                photo &&
                <CardMedia
                    sx={{maxHeight: "100%", objectFit: "contain"}}
                    component="img"
                    image={URL.createObjectURL(photo)}
                />
            }
        </Stack>
    )
}

export const SelectPhoto = ({width, height}: { width?: number | string, height: number | string }) => {
    const {register} = useFormContext();
    const photo = useWatch({name: 'photo', defaultValue: null});

    return (
        <Box sx={{width: width}}>
            <input
                accept="image/*"
                type="file"
                id='upload-photo'
                style={{display: "none"}}
                {...register("photo", {
                    validate: (value: FileList) => {
                        if (value.length === 0) return "You need to select a photo";
                        return true;
                    }
                })}
            />
            {photo?.length > 0
                ? <Photo height={height} photo={photo[0]}/>
                : <PhotoPlaceHolder height={height}/>}
        </Box>
    )
}