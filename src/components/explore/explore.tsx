import {extract, useHandleGraphQLError} from "../../utils.jsx";
import {Box, Skeleton} from "@mui/material";
import React, {SetStateAction, useState} from "react";
import {useBottomScrollListener} from "react-bottom-scroll-listener";
import {PhotoDetailModal} from "../photoDetail/photoDetailModal";
import {Gallery, ImagePin} from "./imageGallery/imageGallery"
import {useGetAllPhotosQuery} from "../../gql/gql";

type ModalState = {
    open: boolean
    photoId: string | null
}

type ImageProp = {
    photo: {
        id: string
        url: string
        ratio: number
        file: {
            name: string
        }
    }
    setModal: React.Dispatch<SetStateAction<ModalState>>
}

export function Image({photo, setModal}: ImageProp) {
    const width = 236;
    const [loaded, setLoaded] = useState(false);
    const height = Math.round(photo.ratio * width);
    return (
        <ImagePin
            size={height + 20}
            onClick={() => {
                setModal({open: true, photoId: photo.id})
            }}
        >
            {!loaded && <Skeleton variant='rectangular' sx={{width: width, height, borderRadius: '16px'}}/>}
            <img
                style={{width: '100%', borderRadius: '16px', display: !loaded ? 'none' : 'block'}}
                width={'100%'}
                src={photo.url}
                alt={photo.file.name}
                onLoad={() => setLoaded(true)}
            />
        </ImagePin>
    );
}


export const Explore = function () {
    const {data, error, fetchMore} = useGetAllPhotosQuery({variables: {first: 25}})
    const [modal, setModal] = useState<ModalState>({open: false, photoId: null});
    useHandleGraphQLError([error]);

    useBottomScrollListener(() => {
        if (data?.photos.pageInfo.hasNextPage) {
            fetchMore({variables: {after: data.photos.pageInfo.endCursor}}).catch(console.log);
        }
    }, {offset: 600});


    return (
        !data?.photos ? <></> :
        <Box>
            <Gallery>
                {extract(data!.photos).map((photo, idx) => (
                    <Image photo={photo as ImageProp["photo"]} setModal={setModal} key={idx}/>
                ))}
            </Gallery>
            <PhotoDetailModal modal={modal} setModal={setModal}/>
        </Box>
    );
}