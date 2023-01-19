import React, {useState} from "react";
import {useBottomScrollListener} from "react-bottom-scroll-listener";
import {Box, Typography} from "@mui/material";
import {PhotoDetailModal} from "../photoDetail/photoDetailModal";
import Grid from "@mui/material/Unstable_Grid2";
import {Image} from "../userDetail/photoList/photoList";
import {Configure, useInfiniteHits} from "react-instantsearch-hooks-web";
import {AlgoliaSearcher} from "./searcher";
import {BaseHit} from "instantsearch.js/es/types"
import {useResizeListener} from "../../utils";


type ModalState = {
    open: boolean
    photoId: string | null
}

interface PhotoHit extends BaseHit {
    "global_id": string
    url: string
    file: { name: string }
}

const NotFound = () => {
    return (
        <Typography width={200} align='center' fontWeight="medium" fontSize={25}>
            No Photo Found
        </Typography>
    )
}

function GetImageWidth() {
    return Math.min(Math.max(Math.round(window.innerWidth * 0.44), 120), 236)
}


function PhotoHits() {
    const [modal, setModal] = useState<ModalState>({open: false, photoId: null});

    const {hits, results, showMore, sendEvent, isLastPage} = useInfiniteHits<PhotoHit>();
    const data = hits.map((item) => ({
        id: item['global_id'],
        ...item,
    }));

    useBottomScrollListener(() => {
        if (!isLastPage) showMore();
    });

    const [imageWidth, setImageWidth] = useState(GetImageWidth());

    useResizeListener(() => {
        setImageWidth(GetImageWidth());
    }, 200)

    if (results?.query && hits.length === 0) {
        return <NotFound/>;
    }

    return (
        <Box sx={{alignItems: "center", justifyContent: "center", overflow: "hidden"}}>
            <Grid
                container
                spacing={2}
                sx={{alignItems: "center", justifyContent: "center"}}
            >
                {data.map((photo, idx) => {
                    return (
                        <Grid key={idx}>
                            <Image photo={photo} width={imageWidth} onClick={() => {
                                setModal({open: true, photoId: photo.id});
                                sendEvent("click", photo, "Image Clicked");
                                sendEvent("conversion", photo, "Image Interested")
                            }}/>
                        </Grid>
                    );
                })}
            </Grid>
            <PhotoDetailModal modal={modal} setModal={setModal}/>
        </Box>
    );
}


export const PhotoPanel = () => {
    return (
        <AlgoliaSearcher index={`photo_share_photo_${import.meta.env.VITE_APP_ENV}`}>
            <Configure analytics={true} clickAnalytics={true}/>
            <PhotoHits/>
        </AlgoliaSearcher>
    )
}