import {useApolloClient} from "@apollo/client";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {useHandleGraphQLError} from "../../utils";
import {Configure, useInfiniteHits} from 'react-instantsearch-hooks-web';
import {FollowButton} from "../button/followButton";
import {Link} from "react-router-dom";
import {useBottomScrollListener} from "react-bottom-scroll-listener";
import React from "react";
import {ProfileAvatar} from "../avatar/profileAvatar";
import {AlgoliaSearcher} from "./searcher";
import {useGetFollowStatusQuery, UserFollowStatusFragmentDoc} from "../../gql/gql";
import {BaseHit} from "instantsearch.js/es/types";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";

interface UserHit extends BaseHit {
    "global_id": string
    name: string
    "avatar_url": string
    description: string
}

const NotFound = () => {
    return (
        <Typography width={200} align='center' fontWeight="medium" fontSize={25}>
            No User Found
        </Typography>
    )
}

function UserHits() {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(680));
    const loggedInUserId = useSelector(selectLoggedUserId);
    const {hits, results, currentPageHits, showMore, sendEvent, isLastPage} = useInfiniteHits<UserHit>();

    const client = useApolloClient();
    const {error} = useGetFollowStatusQuery({
        variables: {ids: currentPageHits.map(hit => hit['global_id'])},
        skip: !Boolean(results?.query) || currentPageHits.length === 0,
    });
    useHandleGraphQLError([error]);

    useBottomScrollListener(() => {
        if (!isLastPage) showMore();
    }, {offset: 150});

    if (Boolean(results?.query) && hits.length === 0) {
        return <NotFound/>;
    }

    const users = [];
    for (let hit of hits) {
        const [typename] = window.atob(hit['global_id']).split(":");
        const user = client.readFragment({
            id: `${typename}:${hit['global_id']}`,
            fragment: UserFollowStatusFragmentDoc,
        });
        if (!user) continue;

        const namePart = hit.name.split(" ");
        users.push({
            ...hit,
            id: hit['global_id'],
            firstName: namePart[0],
            lastName: namePart.length < 2 ? "" : namePart[1],
            profile: {
                avatar: hit['avatar_url'],
                description: hit.description,
                isFollowing: user.profile.isFollowing,
            }
        })
    }

    return (
        <List sx={{width: mobile ? "100%" : 650}}>
            {users.map((user, index) => {
                return (
                    <ListItem
                        sx={{
                            width: '100%',
                            py: 0,
                            "& .MuiListItemSecondaryAction-root": {
                                right: 55
                            }
                        }}
                        key={index}
                        onClick={() => sendEvent("click", user, "User Clicked")}
                        secondaryAction={loggedInUserId !== user.id
                            ? <FollowButton user={user} sx={{width: 100}}/>
                            : <Typography width={105} align='center' fontWeight="medium" color='grey'>
                                This is you
                            </Typography>}
                    >
                        <ListItemButton
                            sx={{borderRadius: 10, "&.MuiListItemButton-root": {paddingRight: 16}}}
                            component={Link}
                            to={`/user/${user.id}`}
                        >
                            <ListItemAvatar>
                                <ProfileAvatar
                                    src={user.profile.avatar}
                                    alt={(user.firstName + "" + user.lastName).toUpperCase()}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography noWrap fontWeight="medium">
                                        <span>{user.firstName + " " + user.lastName + "\u00A0\u00A0"}</span>
                                        <Typography component="span" color="textSecondary">
                                            {user.profile.description}
                                        </Typography>
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
}


export const UserPanel = () => {
    return (
        <AlgoliaSearcher index={`photo_share_user_${import.meta.env.VITE_APP_ENV}`}>
            <Configure analytics={true} clickAnalytics={true}/>
            <UserHits/>
        </AlgoliaSearcher>
    )
}