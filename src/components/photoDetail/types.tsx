import React from "react";

export type ModalState = {
    open: boolean,
    photoId: string | null,
}

export type SetModal = React.Dispatch<React.SetStateAction<ModalState>>


export type User = {
    id: string,
    firstName: string,
    lastName: string,
    profile: {
        id: string,
        avatar: string
    }
}

export type Comment = {
    id: string,
    comment: string,
    dateTime: string,
    user: User
}

export type Photo = {
    id: string,
    dateTime: string,
    description: string,
    user: User,
    comments: {
        edges: Array<{ node: Comment }>,
        pageInfo: { hasNextPage: boolean, endCursor?: string | null }
    }
}
