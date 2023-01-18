import React, {RefObject, useState} from "react";
import {useHandleGraphQLError} from "../../utils.jsx";
import {Button, Input, Stack} from "@mui/material";
import {TRelayNode} from "../../gql/types";
import {CommentTypeConnection, CoreCommentFragmentDoc, useCreateCommentMutation} from "../../gql/gql";

export type CommentInputProp = {
    photo: TRelayNode
    textInputRef: RefObject<HTMLInputElement>
    borderColor?: string
    buttonColor?: string
    onComment?: () => void
}

export const CommentInput = function ({photo, textInputRef, borderColor, buttonColor, onComment}: CommentInputProp) {
    const [comment, setComment] = useState("");

    const [addComment, {error}] = useCreateCommentMutation({
        update(cache, {data}) {
            if (!data) {
                console.log("creatComment mutation receive null data")
                return
            }

            if (onComment) onComment();
            const _comment = data.createComment;
            cache.modify({
                id: cache.identify(photo),
                fields: {
                    comments(existing: CommentTypeConnection, {readField}) {
                        const newCommentRef = cache.writeFragment({
                            data: _comment,
                            fragment: CoreCommentFragmentDoc
                        });
                        const newEdge = {
                            node: newCommentRef,
                            __typename: readField('__typename', newCommentRef) + "Edge"
                        };
                        if (existing.edges.some(edge => {
                            return readField('id', "node" in edge ? edge.node : edge) === _comment.id
                        })) {
                            return existing;
                        }
                        return {
                            ...existing,
                            totalCount: (existing.totalCount ?? 0) + 1,
                            edges: [newEdge, ...existing.edges],
                        };
                    },
                }
            });
        }
    });

    useHandleGraphQLError([error]);

    const submit = async () => {
        await addComment({variables: {photoId: photo.id, comment}});
        setComment("");
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submit();
    };

    const onKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            e.preventDefault();
            await submit();
        }
    }

    return (
        <Stack
            paddingBottom={0}
            component="form"
            autoComplete="off"
            onSubmit={onSubmit}
            direction="row"
            sx={{
                borderRadius: 5,
                borderWidth: 1.5,
                borderColor: borderColor || "#cdcdcd",
                borderStyle: "solid",
                pl: 1.5,
                pr: 1.5,
            }}
        >
            <Input
                inputRef={textInputRef}
                disableUnderline
                onKeyDown={onKeyDown}
                value={comment}
                placeholder={"Add a comment"}
                multiline
                fullWidth
                maxRows={3}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                disabled={comment === ""}
                type="submit"
                color="primary"
                size="medium"
                sx={{
                    boxShadow: "none",
                    borderRadius: 5,
                    textTransform: "none",
                    color: buttonColor || 'rgba(65,65,66,0.82)',
                    fontSize: 17,
                    '&:hover': {
                        backgroundColor: 'white',
                    }
                }}
            >
                Send
            </Button>
        </Stack>
    );
}