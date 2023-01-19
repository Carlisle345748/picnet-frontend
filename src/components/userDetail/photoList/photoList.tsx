import Grid from "@mui/material/Unstable_Grid2";
import {Box, ButtonBase, ImageListItem, Skeleton} from "@mui/material";
import React, {useState} from "react";
import {extract, useResizeListener} from "../../../utils";
import {PhotoDetailModal} from "../../photoDetail/photoDetailModal";
import {TRelayConnection} from "../../../gql/types";
import {PhotoDetailModalState} from "../types";


type ImageProp = {
    photo: {
        url: string
        file: { name: string }
    }
    width: number
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

type PhotoListProp = {
    user: {
        photos: TRelayConnection<ImageProp["photo"] & { id: string }>
    }
}

function GetImageWidth() {
    return Math.min(Math.max(Math.round(window.innerWidth * 0.44), 120), 236)
}


export default function PhotoList({user}: PhotoListProp) {
    const [modal, setModal] = useState<PhotoDetailModalState>({open: false, photoId: ""});
    const [imageWidth, setImageWidth] = useState(GetImageWidth());

    useResizeListener(() => {
        setImageWidth(GetImageWidth());
    }, 200)

    return (
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{alignItems: "center", justifyContent: "center"}}
            >
                {user &&
                    extract(user.photos).map((photo, idx) => {
                        return (
                            <Grid key={idx}>
                                <Image
                                    photo={photo}
                                    width={imageWidth}
                                    onClick={() => setModal({open: true, photoId: photo.id})}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
            <PhotoDetailModal modal={modal} setModal={setModal}/>
        </Box>
    );
}

export function Image({photo, width, onClick}: ImageProp) {
    const [loaded, setLoaded] = useState(false);
    return (
        <ImageListItem
            disableRipple
            sx={{borderRadius: 2}}
            component={ButtonBase}
            onClick={onClick}
        >
            {!loaded && <Skeleton variant="rectangular" sx={{height: 300, width: width, borderRadius: 5}}/>}
            <img
                src={photo.url}
                alt={photo.file.name}
                style={{height: width * 1.37, width: width, borderRadius: 20, display: !loaded ? 'none' : 'block'}}
                onLoad={() => setLoaded(true)}
            />
        </ImageListItem>
    )
}