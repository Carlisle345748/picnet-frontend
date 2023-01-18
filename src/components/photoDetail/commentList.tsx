import {positionValues, Scrollbars} from "react-custom-scrollbars-2";
import {Box, ListItem, ListItemAvatar, ListItemText, Typography,} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import {extract, toNow} from "../../utils.jsx";
import {CommentAction} from "./commentAction";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {ProfileAvatar} from "../avatar/profileAvatar";
import {GetPhotoQuery, GetPhotoQueryVariables} from "../../gql/gql";
import {ObservableQueryFields} from "@apollo/client";
import {Photo, SetModal, User, Comment} from "./types";

type CommentListProp = {
    photo: Photo
    setModal: SetModal
    scrollbarProp?: React.ComponentProps<any>,
    fetchMore: ObservableQueryFields<GetPhotoQuery, GetPhotoQueryVariables>["fetchMore"]
}

type CommentItemProp = {
    photo: Photo
    setModal: SetModal
    comment: Comment
}

type CommentProp = {
    user: User
    comment: string,
    setModal: SetModal
}

type PhotoDescriptionProp = {
    photo: Photo,
    setModal: SetModal
}

const Comment = ({user, comment, setModal}: CommentProp) => {
    return (
        <Box>
      <span>
        <Typography
            component={RouterLink}
            to={"/user/" + user.id}
            color="textPrimary"
            sx={{fontWeight: 500, textDecoration: 'none'}}
            onClick={() => setModal({open: false, photoId: ""})}
        >
          {user?.firstName + " " + user.lastName}
        </Typography>
      </span>
            <Typography component="span" variant="body1">
                {" - " + comment}
            </Typography>
        </Box>
    );
};

const PhotoDescription = ({photo, setModal}: PhotoDescriptionProp) => {
    return (
        <ListItem alignItems="flex-start" disablePadding>
            <ListItemAvatar>
                <ProfileAvatar
                    component={RouterLink}
                    to={"/user/" + photo!.user.id}
                    alt={photo!.user.firstName.toUpperCase()}
                    src={photo!.user.profile?.avatar}
                    onClick={() => setModal({open: false, photoId: ""})}
                    sx={{textDecoration: 'none'}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={<Comment user={photo.user!} comment={photo.description} setModal={setModal}/>}
                secondary={
                    <Box component='span'>
                        <Typography component='span' variant="body2" color="textSecondary">
                            {toNow(photo.dateTime)}
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
    )
}

const CommentItem = ({photo, comment, setModal}: CommentItemProp) => {
    const loggedInUserId = useSelector(selectLoggedUserId);
    return (
        <ListItem alignItems="flex-start" disablePadding>
            <ListItemAvatar>
                <ProfileAvatar
                    component={RouterLink}
                    to={"/user/" + comment.user.id}
                    alt={comment.user!.firstName.toUpperCase()}
                    src={comment.user!.profile!.avatar}
                    onClick={() => setModal({open: false, photoId: ""})}
                    sx={{textDecoration: 'none'}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={<Comment user={comment.user!} comment={comment.comment} setModal={setModal}/>}
                secondary={
                    <Box component='span'>
                        <Typography component='span' variant="body2" color="textSecondary">
                            {toNow(comment.dateTime)}
                        </Typography>
                        {comment.user.id === loggedInUserId && <CommentAction photo={photo} comment={comment}/>}
                    </Box>
                }
            />
        </ListItem>
    )
}

export const CommentList = ({photo, setModal, fetchMore, scrollbarProp}: CommentListProp) => {
    const onScrollFrame = (values: positionValues) => {
        if (photo.comments.pageInfo.hasNextPage && values.top >= 0.6) {
            fetchMore({
                variables: {after: photo.comments.pageInfo.endCursor!},
            }).catch(console.log);
        }
    }

    return (
        <Scrollbars onScrollFrame={onScrollFrame} {...scrollbarProp}>
            {photo!.description &&
                <PhotoDescription
                    key={0}
                    photo={photo}
                    setModal={setModal}
                />}
            {extract(photo.comments).map((comment, index) => (
                <CommentItem
                    key={index + (photo.description ? 1 : 0)}
                    photo={photo}
                    comment={comment}
                    setModal={setModal}
                />
            ))}
        </Scrollbars>
    );
};
