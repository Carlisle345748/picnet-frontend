import {DialogTitle, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography,} from "@mui/material";
import {Link} from "react-router-dom";
import {Scrollbars} from "react-custom-scrollbars-2";
import {extract, useHandleGraphQLError} from "../../../utils";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../../loginRegister/loginSlice";
import {FollowButton} from "../../button/followButton";
import {ProfileAvatar} from "../../avatar/profileAvatar";
import {useGetFollowerQuery, useGetFollowingQuery} from "../../../gql/gql";
import {FollowListModalState, SetFollowListModal} from "../types";


type FollowListProp = {
    setModal: SetFollowListModal
    listType: FollowListModalState["list"]
    userId: string
}

type User = {
    id: string
    firstName: string
    lastName: string
    profile: {
        isFollowing: boolean
        avatar: string
        description: string
    }
}

function FollowList({setModal, listType, userId}: FollowListProp) {
    const loggedUserId = useSelector(selectLoggedUserId);
    const {data: followerData, error: followerErr} = useGetFollowerQuery({
        variables: {id: userId},
        skip: listType !== 'follower',
    });
    const {data: followingData, error: followingErr} = useGetFollowingQuery({
        variables: {id: userId},
        skip: listType !== 'following',
    });
    useHandleGraphQLError([followerErr, followingErr]);


    const renderRow = function (user: User, index: number) {
        const name = user.firstName + " " + user.lastName;
        return (
            <ListItem
                key={index}
                disablePadding
                secondaryAction={
                    user.id !== loggedUserId
                        ? <FollowButton user={user} sx={{
                            width: 110,
                            textTransform: "none",
                            fontSize: 16,
                            color: user.profile.isFollowing ? "black" : "white",
                            "&:hover": {
                                boxShadow: "none",
                                backgroundColor: user.profile.isFollowing ? "#ddd" : "#ad081b",
                            },
                            backgroundColor: user.profile.isFollowing ? "#efefef" : "#e60023",
                        }}/>
                        : <Typography width={110} align='center' fontWeight="medium" color='grey'>
                            This is you
                        </Typography>
                }
            >
                <ListItemButton
                    component={Link}
                    to={`/user/${user.id}`}
                    onClick={() => setModal({open: false, list: null})}
                >
                    <ListItemAvatar>
                        <ProfileAvatar
                            alt={name.toUpperCase()}
                            src={user.profile.avatar}
                            sx={{width: 45, height: 45}}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography fontWeight="medium">{name}</Typography>}
                        secondary={<Typography noWrap>{user.profile.description}</Typography>}
                    />
                </ListItemButton>
            </ListItem>
        );
    };

    const createTitle = (listType: FollowListProp["listType"]) => {
        if (listType === "follower") {
            const len = followerData!.user!.profile.follower.totalCount!;
            return `${len} ` + (len <= 1 ? "Follower" : "Followers");
        }
        if (listType === "following") {
            return "Following";
        }
        return "";
    };

    const data = listType === 'follower'
        ? followerData!.user!.profile.follower
        : followingData!.user!.profile.following;

    return (
        data && (
            <Stack alignItems="center" justifyContent="center">
                <DialogTitle fontSize={28} fontWeight="medium">
                    {createTitle(listType)}
                </DialogTitle>
                <Scrollbars autoHide autoHeight autoHeightMin={300}>
                    {extract(data).map(renderRow)}
                </Scrollbars>
            </Stack>
        )
    );
}

export default FollowList;
