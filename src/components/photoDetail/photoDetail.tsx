import React, {useRef} from "react";
import {Box, Divider, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme,} from "@mui/material";
import {CommentIcon} from "../icons/icons";
import Grid2 from "@mui/material/Unstable_Grid2";
import {toNow, useHandleGraphQLError} from "../../utils";
import {CommentList} from "./commentList";
import {UserInfo} from "./userInfo";
import {Photo} from "./photo";
import {CommentInput} from "../commentInput/commentInput";
import {LikeButton} from "../button/likeButton";
import {SetModal} from "./types";
import {useGetPhotoQuery} from "../../gql/gql";

type PhotoDetailProp = {
    photoId: string | null,
    setModal: SetModal
}

export default function PhotoDetail({photoId, setModal}: PhotoDetailProp) {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: "80%",
        height: "90%",
        paddingBottom: "15px",
    };

    const textInput = useRef<HTMLInputElement>(null);
    const theme = useTheme();
    const vertical = useMediaQuery(theme.breakpoints.down(900));

    const {data, error, fetchMore} = useGetPhotoQuery({
        variables: {id: photoId, first: 15},
        skip: !Boolean(photoId),
    });

    useHandleGraphQLError([error]);

    if (vertical) {
        return (
            <>{
                data?.photo &&
                <Paper sx={modalStyle}>
                    <Grid2 container alignItems="center" direction="column" height="100%">
                        <Grid2 xs={5} width="100%" height="50%">
                            <Photo photo={data.photo}/>
                        </Grid2>
                        <Grid2 xs={7} height='50%' width='100%'>
                            <Stack height='100%' width='100%' direction="column" pt={1}>
                                <UserInfo photo={data.photo} setModal={setModal}/>
                                <Divider variant="middle" sx={{ml: 0, mr: 0}}/>
                                <CommentList photo={data.photo} setModal={setModal} fetchMore={fetchMore}/>
                                <Box mt={0.5}>
                                    <LikeButton photo={data.photo}/>
                                    <IconButton onClick={() => textInput!.current!.focus()}>
                                        <CommentIcon/>
                                    </IconButton>
                                </Box>
                                <CommentInput photo={data.photo} textInputRef={textInput}/>
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Paper>
            }
            </>
        )
    }

    return (
        <>
            {data?.photo &&
                <Paper sx={modalStyle}>
                    <Grid2 container spacing={2} height="100%">
                        <Grid2 xs={7} height="100%">
                            <Photo photo={data.photo!}/>
                        </Grid2>
                        <Grid2 xs={5}>
                            <Stack height={1} direction="column">
                                <UserInfo photo={data.photo} setModal={setModal}/>
                                <Divider variant="middle" sx={{ml: 0, mr: 0}}/>
                                <CommentList photo={data.photo} setModal={setModal} fetchMore={fetchMore}/>
                                <Divider variant="middle" sx={{ml: 0, mr: 0}}/>
                                <Box mt={0.5}>
                                    <LikeButton photo={data.photo}/>
                                    <IconButton onClick={() => textInput!.current!.focus()}>
                                        <CommentIcon/>
                                    </IconButton>
                                </Box>
                                {
                                    data.photo.userLike.totalCount! > 0 &&
                                    <Typography fontWeight='medium' pl={1}>
                                        {data.photo.userLike.totalCount === 1
                                            ? '1 like'
                                            : `${data.photo.userLike.totalCount} likes`}
                                    </Typography>
                                }
                                <Typography variant="body2" color="textSecondary" pl={1} mb={1} pb={0.5}>
                                    {toNow(data.photo!.dateTime)}
                                </Typography>
                                <CommentInput photo={data.photo}
                                              textInputRef={textInput}
                                              borderColor={"#595959"}
                                              buttonColor={"#181818"}
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Paper>
            }
        </>);
}
