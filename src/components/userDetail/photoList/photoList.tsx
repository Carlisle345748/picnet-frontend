import Grid from "@mui/material/Unstable_Grid2";
import {Box, ButtonBase, ImageListItem, Skeleton} from "@mui/material";
import React, {useState} from "react";
import {extract} from "../../../utils";
import {PhotoDetailModal} from "../../photoDetail/photoDetailModal";
import {TRelayConnection} from "../../../gql/types";
import {PhotoDetailModalState} from "../types";


type ImageProp = {
    photo: {
        url: string
        file: { name: string }
    }
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

type PhotoListProp = {
    user: {
        photos: TRelayConnection<ImageProp["photo"] & { id: string }>
    }
}

export default function PhotoList({user}: PhotoListProp) {
    const [modal, setModal] = useState<PhotoDetailModalState>({open: false, photoId: ""});

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


export function Image({photo, onClick}: ImageProp) {
    const [loaded, setLoaded] = useState(false);
    return (
        <ImageListItem
            disableRipple
            sx={{borderRadius: 2}}
            component={ButtonBase}
            onClick={onClick}
        >
            {!loaded && <Skeleton variant="rectangular" sx={{height: 300, width: 220, borderRadius: 5}}/>}
            <img
                src={photo.url}
                alt={photo.file.name}
                style={{height: 300, width: 220, borderRadius: 20, display: !loaded ? 'none' : 'block'}}
                onLoad={() => setLoaded(true)}
            />
        </ImageListItem>
    )
}