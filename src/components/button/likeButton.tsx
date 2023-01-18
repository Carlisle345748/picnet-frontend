import {useHandleGraphQLError} from "../../utils.jsx";
import {IconButton} from "@mui/material";
import {LikedIcon, LikeIcon} from "../icons/icons";
import {useUpdateLikeMutation} from "../../gql/gql";

export type LikeButtonProp = {
    photo: {
        id: string,
        isLike: boolean,
    },
    onLike?: () => void
}

export const LikeButton = function ({photo, onLike}: LikeButtonProp) {
    const [updateLike, {error: updateErr}] = useUpdateLikeMutation({
        update(cache, {data}) {
            if (!data) {
                console.log("updateLike mutation receive null data")
                return
            }
            if (onLike) onLike();
            const photo = data.updatePhotoLike;
            cache.modify({
                id: cache.identify(photo),
                fields: {
                    isLike() {
                        return photo.isLike;
                    },
                    userLike(existing) {
                        const totalCount = existing.totalCount + (photo.isLike ? 1 : -1);
                        return {...existing, totalCount}
                    },
                }
            })

        },
    });

    useHandleGraphQLError([updateErr]);

    const handleLike = async () => {
        await updateLike({
            variables: {photoId: photo.id, like: !photo.isLike},
        });
    };

    return (
        <IconButton onClick={handleLike} disabled={!Boolean(photo)}>
            {photo.isLike ? <LikedIcon/> : <LikeIcon/>}
        </IconButton>
    );
}