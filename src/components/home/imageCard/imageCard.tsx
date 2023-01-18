import {Box, Card, CardHeader, CardMedia, Collapse, IconButton, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {LikeButton, LikeButtonProp} from "../../button/likeButton";
import {CommentIcon} from "../../icons/icons";
import {useRef, useState} from "react";
import {CommentInput} from "../../commentInput/commentInput";
import {PhotoDetailModal} from "../../photoDetail/photoDetailModal";
import {getLocationMain, toNow} from "../../../utils.jsx";
import {Comments, CommentsProp} from "./comments";
import {ProfileAvatar} from "../../avatar/profileAvatar";

type ImageCardProp = {
    photo: LikeButtonProp["photo"] & CommentsProp["photo"] & {
        file: { name: string }
        url: string
        location: string
        dateTime: string
        user: {
            profile: {
                avatar: string
            }
        }
        userLike: {
            totalCount?: number | null
        }
    }
}

type ModalState = {
    open: boolean
    photoId: string | null
}


export const ImageCard = function ({photo}: ImageCardProp) {
    const [expand, setExpand] = useState(false);
    const [modal, setModal] = useState<ModalState>({open: false, photoId: null});
    const textInputRef = useRef<HTMLInputElement>(null);

    const getLikeCountText = (count: number) => {
        if (count === 1) return "1 like";
        return `${count} likes`;
    }

    return (
        <Card
            sx={{m: 1, mb: 3, borderRadius: 6}}
        >
            <CardHeader
                avatar={
                    <ProfileAvatar
                        component={RouterLink}
                        to={"/user/" + photo.user.id}
                        src={photo.user.profile.avatar}
                        alt={(photo.user.firstName + " " + photo.user.lastName).toUpperCase()}
                        sx={{textDecoration: 'none'}}
                    />
                }
                title={
                    <Typography
                        fontWeight="medium"
                        component={RouterLink}
                        to={`/user/${photo.user.id}`}
                        sx={{textDecoration: 'none'}}
                        color="textPrimary"
                    >
                        {photo.user.firstName + " " + photo.user.lastName}
                    </Typography>
                }
                subheader={getLocationMain(photo.location)}
            />
            <CardMedia
                component="img"
                sx={{maxHeight: 850, objectFit: "contain", backgroundColor: 'black', "&:hover": {cursor: "pointer"}}}
                image={photo.url}
                alt={photo.file.name}
                onClick={() => setModal({open: true, photoId: photo.id})}
            />
            <Stack sx={{pt: 0, pb: 0, pl: 1, pr: 1, mb: 1}}>
                <Box mt={0.5}>
                    <LikeButton photo={photo}/>
                    <IconButton onClick={() => setExpand(!expand)}>
                        <CommentIcon/>
                    </IconButton>
                </Box>
                {photo.userLike.totalCount! > 0 && <Typography fontWeight='medium' pl={1}>
                    {getLikeCountText(photo.userLike.totalCount!)}
                </Typography>}
                <Comments photo={photo}/>
                {(photo.comments.totalCount! + (photo.description ? 1 : 0)) > 3 &&
                    <Typography
                        onClick={() => setModal({open: true, photoId: photo.id})}
                        color="textSecondary"
                        sx={{mb: 0.5, pl: 1, '&:hover': {cursor: 'pointer'}}}
                    >
                        {`View ${photo.comments.totalCount} comments`}
                    </Typography>}
                <Typography variant="body2" color="textSecondary" pl={1} pb={0.5}>
                    {toNow(photo.dateTime)}
                </Typography>
                <Collapse in={expand}>
                    <CommentInput photo={photo} textInputRef={textInputRef}/>
                    <Box height={2}/>
                </Collapse>
                <PhotoDetailModal modal={modal} setModal={setModal}/>
            </Stack>
        </Card>
    )
}