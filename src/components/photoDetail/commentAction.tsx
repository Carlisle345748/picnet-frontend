import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {Box, ButtonBase, Dialog, List} from "@mui/material";
import {useState} from "react";
import {DeleteConfirm} from "./deleteConfirm";
import {MenuButton} from "./photoAction";
import {useHandleGraphQLError} from "../../utils.jsx";
import {StoreObject} from "@apollo/client/utilities/graphql/storeUtils";
import {useDeleteCommentMutation} from "../../gql/gql";

type CommentActionProp = {
    photo : StoreObject
    comment: StoreObject
}

export const CommentAction = ({photo, comment}: CommentActionProp) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [deleteComment, {error}] = useDeleteCommentMutation({
        update(cache) {
            cache.evict({id: cache.identify(comment)});
            cache.gc();
            cache.modify({
                id: cache.identify(photo),
                fields: {
                    comments(existing) {
                        return {...existing, totalCount: existing.totalCount - 1}
                    }
                }
            });
        }
    });

    useHandleGraphQLError([error]);

    const onDelete = async () => {
        await deleteComment({variables: {commentId: comment.id,}});
        setOpenDeleteConfirm(false);
        setOpenMenu(false);
    }

    return (
        <Box component='span'>
            <ButtonBase disableRipple onClick={() => setOpenMenu(true)}>
                <MoreHorizIcon sx={{pl: 1, color: 'white', "&:hover": {color: "gray"}}}/>
            </ButtonBase>
            <Dialog open={openMenu}
                    PaperProps={{sx: {width: 400, borderRadius: 4}}}
                    onClose={() => setOpenMenu(false)}>
                <List dense disablePadding>
                    <MenuButton text={"Delete"} color={"red"} onClick={() => setOpenDeleteConfirm(true)}/>
                    <MenuButton text={"Cancel"} onClick={() => setOpenMenu(false)}/>
                </List>
            </Dialog>
            <DeleteConfirm
                onDelete={onDelete}
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                title={"Delete Comment?"}
                subTitle={"Are you sure to delete this comment?"}
            />
        </Box>
    )
}