import {Paper, Stack} from "@mui/material";
import {SelectPhoto} from "./selectPhoto";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {useHandleGraphQLError} from "../../utils.jsx";
import {PhotoInfo} from "./photoInfo";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import React, {useState} from "react";
import {
    GetAllPhotosDocument,
    PhotoBasicFragmentDoc,
    useGetLoginUserBasicQuery,
    useUploadPhotoMutation
} from "../../gql/gql";
import {StoreObject} from "@apollo/client/utilities/graphql/storeUtils";

type Inputs = {
    photo: FileList,
    description: string,
    location: string,
    tags: string[],
};


export const CreatPost = () => {
    const navigate = useNavigate();
    const loggedInUserId = useSelector(selectLoggedUserId);
    const [loading, setLoading] = useState(false);
    const {data: userData, error: queryErr} = useGetLoginUserBasicQuery({variables: {id: loggedInUserId}});
    const [upload, {error: uploadErr}] = useUploadPhotoMutation({
        update(cache, {data}) {
            if (!data) {
                console.log("uploadPhoto mutation receive null data")
                return
            }
            const photo = data.uploadPhoto;
            const photoRef = cache.writeFragment({
                data: photo,
                fragment: PhotoBasicFragmentDoc,
            });
            cache.modify({
                id: cache.identify(userData!.user as StoreObject),
                fields: {
                    photos(existing) {
                        if (!existing) return existing;
                        const newEdge = {
                            __typename: photo.__typename + "Edge",
                            node: photoRef,
                        };
                        return {
                            ...existing,
                            edges: [newEdge, ...existing.edges]
                        }
                    }
                }
            })
            cache.updateQuery({query: GetAllPhotosDocument, variables: {first: 25}}, (data) => {
                if (!data) return data;
                const newEdge = {
                    __typename: photo.__typename + "Edge",
                    node: photo,
                };
                return {
                    photos: {
                        ...data.photos,
                        edges: [newEdge, ...data.photos.edges]
                    }
                };
            })
        }
    });

    const methods = useForm<Inputs>();
    const {handleSubmit} = methods;
    useHandleGraphQLError([queryErr, uploadErr]);

    const checkKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {default: imageCompression} = await import("browser-image-compression");
        setLoading(true);
        const compressed = await imageCompression(data.photo[0], {maxSizeMB: 0.8});
        const img = new Image();
        img.src = URL.createObjectURL(compressed);
        img.onload = async () => {
            const ratio = img.height / img.width;
            await upload({
                variables: {
                    input: {
                        photo: compressed,
                        description: data.description,
                        location: data.location ? data.location : "",
                        tags: data.tags,
                        ratio: ratio,
                    }
                }
            });
            navigate(`/user/${loggedInUserId}`);
            setLoading(false);
        };
    }

    return (
        !userData?.user ? <></> :
        <FormProvider {...methods}>
            <Paper
                component='form'
                onKeyDown={checkKeyDown}
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    mt: 4,
                    borderRadius: 5,
                    p: 2,
                    direction: 'row'
                }}>
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{justifyContent: 'center'}}
                >
                    <SelectPhoto/>
                    <PhotoInfo user={userData.user!} loading={loading}/>
                </Stack>
            </Paper>
        </FormProvider>
    )
}