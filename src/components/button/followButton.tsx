import {useHandleGraphQLError} from "../../utils.jsx";
import {Button, SxProps} from "@mui/material";
import {useUpdateFollowMutation} from "../../gql/gql";

export type FollowButtonProp = {
    user: {
        id: string,
        profile: {
            isFollowing: boolean
        }
    },
    sx: SxProps | undefined
}

export const FollowButton = function ({user, sx}: FollowButtonProp) {
    const [updateFollow, {error: UpdateErr}] = useUpdateFollowMutation({
        onCompleted(data) {
            data.updateFollower
        },
        update(cache, {data}) {
            if (!data) {
                console.log("updateFollow mutation receive null data");
                return
            }
            const user = data.updateFollower.user;
            const followUser = data.updateFollower.followUser;
            cache.modify({
                id: cache.identify(user.profile),
                fields: {
                    following(existing) {
                        return {...existing, totalCount: user.profile.following.totalCount}
                    }
                }
            });
            cache.modify({
                id: cache.identify(followUser.profile),
                fields: {
                    isFollowing() {
                        return followUser.profile.isFollowing;
                    },
                    follower(existing) {
                        return {...existing, totalCount: followUser.profile.follower.totalCount}
                    }
                }
            });
        }
    });
    useHandleGraphQLError([UpdateErr]);

    const handleUpdateFollow = async () => {
        await updateFollow({variables: {followId: user.id, follow: !user.profile.isFollowing}})
    };

    return (
        <Button
            variant="contained"
            size="large"
            onClick={handleUpdateFollow}
            sx={{
                width: 130,
                boxShadow: "none",
                borderRadius: 5,
                textTransform: 'none',
                "&:hover": {
                    boxShadow: "none",
                    backgroundColor: user.profile.isFollowing ? "black" : "#ad081b",
                },
                backgroundColor: user.profile.isFollowing ? "black" : "#e60023",
                ...sx,
            }}
        >
            {user.profile.isFollowing ? "Following" : "Follow"}
        </Button>
    )
}