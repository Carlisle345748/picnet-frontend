import {ButtonBase, Stack, Typography} from "@mui/material";
import React from "react";
import {SetFollowListModal} from "../types";

export type FollowCountProp = {
    user: {
        profile: {
            follower: {
                totalCount?: number | null
            }
            following: {
                totalCount?: number | null
            }
        }
    }
    setModal: SetFollowListModal
}

export const FollowCount = function ({user, setModal}: FollowCountProp) {
    return (
        <Stack direction="row" spacing={1} mt={0.3}>
            <Typography
                component={ButtonBase}
                sx={{fontWeight: 500}}
                onClick={() => setModal({open: true, list: "follower"})}
            >
                {`${user.profile.follower.totalCount!} follower`}
            </Typography>
            <Typography component="span" sx={{fontWeight: "medium"}}>
                ·
            </Typography>
            <Typography
                component={ButtonBase}
                sx={{fontWeight: 500}}
                onClick={() => setModal({open: true, list: "following"})}
            >
                {`${user.profile.following.totalCount!} following`}
            </Typography>
        </Stack>
    )
}
