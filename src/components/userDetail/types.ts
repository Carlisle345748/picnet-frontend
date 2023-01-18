import React from "react";

export type PhotoDetailModalState = {
    open: boolean,
    photoId: string | null,
}


export type FollowListModalState = {
    open: boolean,
    list: "follower" | "following" | null
}

export type SetFollowListModal = React.Dispatch<React.SetStateAction<FollowListModalState>>