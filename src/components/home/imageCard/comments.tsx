import {Box, List, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {extract} from "../../../utils.jsx";
import {TRelayConnection} from "../../../gql/types";

type CommentProp = {
    user: {
        id: string
        firstName: string
        lastName: string
    }
    comment: string
}

export type CommentsProp = {
    photo: {
        description: string
        user: CommentProp["user"]
        comments: TRelayConnection<{
            user: CommentProp["user"]
            comment: string
        }>
    }
}

const Comment = ({user, comment}: CommentProp) => {
    return (
        <Box ml={1}>
            <span>
                <Typography
                    component={Link}
                    to={`/user/${user.id}`}
                    color='textPrimary'
                    sx={{textDecoration: "none", fontWeight: 'medium'}}
                >
                    {user.firstName + " " + user.lastName + " "}
                </Typography>
            </span>
            <Typography component='span'>
                {comment}
            </Typography>
        </Box>
    )
}

export const Comments = ({photo}: CommentsProp) => {
    const commentCount = photo.description ? 2 : 3;
    return (
        <List dense disablePadding>
            {photo.description && <Comment user={photo.user} comment={photo.description} key={-1}/>}
            {extract(photo.comments).slice(0, commentCount)
                .map((c, idx) => <Comment user={c.user} comment={c.comment} key={idx}/>)}
        </List>
    )
}