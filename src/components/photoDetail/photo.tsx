import {CardMedia, Stack} from "@mui/material";


export const Photo = ({photo}: { photo: { url: string } }) => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="black"
        >
            <CardMedia
                sx={{maxHeight: "100%", objectFit: "contain"}}
                component="img"
                image={photo.url}
            />
        </Stack>
    )
}