import {Paper, Stack, useMediaQuery, useTheme} from "@mui/material";
import {SelectPhoto} from "./selectPhoto";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {useHandleGraphQLError} from "../../utils.jsx";
import {PhotoInfo, PhotoInfoProp} from "./photoInfo";
import {FormProvider, SubmitHandler, useForm, useFormContext} from "react-hook-form";
import {useNavigate} from "react-router";
import React, {useState} from "react";
import {StoreObject} from "@apollo/client/utilities/graphql/storeUtils";
import {
    GetAllPhotosDocument,
    PhotoBasicFragmentDoc,
    useGetLoginUserBasicQuery,
    useUploadPhotoMutation
} from "../../gql/gql";


type Inputs = {
    photo: FileList,
    description: string,
    location: string,
    tags: string[],
};

type CreatePostProp = {
    checkKeyDown: React.KeyboardEventHandler
    onSubmit: SubmitHandler<Inputs>
    user: PhotoInfoProp["user"]
    loading: boolean
}

export const CreatPost = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const methods = useForm<Inputs>();
    const loggedInUserId = useSelector(selectLoggedUserId);
    const [loading, setLoading] = useState(false);
    const mobile = useMediaQuery(theme.breakpoints.down(600));

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
    useHandleGraphQLError([queryErr, uploadErr]);

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

    const checkKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') e.preventDefault();
    };


    return (
        !userData?.user ? <></> :
            <FormProvider {...methods}>
                {
                    mobile
                        ? <Mobile
                            checkKeyDown={checkKeyDown}
                            onSubmit={onSubmit}
                            user={userData.user}
                            loading={loading}
                        />
                        : <Desktop
                            checkKeyDown={checkKeyDown}
                            onSubmit={onSubmit}
                            user={userData.user}
                            loading={loading}
                        />
                }
            </FormProvider>
    )
}


function Desktop({checkKeyDown, onSubmit, user, loading}: CreatePostProp) {
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down(1030));
    const {handleSubmit} = useFormContext<Inputs>();
    return (
        <Paper
            component='form'
            onKeyDown={checkKeyDown}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                mt: 4,
                borderRadius: 5,
                p: 2,
                direction: 'row',
                width: small ? "90%" : 900
            }}>
            <Stack
                spacing={3}
                direction="row"
                sx={{justifyContent: 'center', width: '100%'}}
            >
                <SelectPhoto width="55%" height={600}/>
                <PhotoInfo user={user} loading={loading} width="45%"/>
            </Stack>
        </Paper>
    )
}

function Mobile({checkKeyDown, onSubmit, loading, user}: CreatePostProp) {
    const {handleSubmit} = useFormContext<Inputs>();

    return (
        <Paper
            component='form'
            onKeyDown={checkKeyDown}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                mt: 4,
                borderRadius: 5,
                p: 2,
                width: '90%',
            }}>
            <Stack
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <SelectPhoto width="100%" height={window.innerHeight * 0.5}/>
                <PhotoInfo user={user} loading={loading} width="100%"/>
            </Stack>
        </Paper>
    )
}