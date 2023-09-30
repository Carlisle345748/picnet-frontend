import {extract, useHandleGraphQLError} from "../../utils.jsx";
import {Box, List} from "@mui/material";
import {ImageCard} from "./imageCard/imageCard";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {useBottomScrollListener} from "react-bottom-scroll-listener";
import {useGetFeedQuery} from "../../gql/gql";
import React, {useState} from "react";
import Spinner from "../loading/spinner";


export default function Home() {
    const loggedInUserId = useSelector(selectLoggedUserId);
    const {data, loading, error, fetchMore} = useGetFeedQuery({
        variables: {userId: loggedInUserId, first: 10}
    });
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    useHandleGraphQLError([error]);
    useBottomScrollListener(() => {
        if (data?.feeds.pageInfo.hasNextPage) {
            setFetchMoreLoading(true);
            fetchMore({variables: {after: data.feeds.pageInfo.endCursor}})
                .then(() => setFetchMoreLoading(false))
                .catch(console.log);
        }
    }, {offset: 600});

    if (loading) {
        return <Spinner/>;
    }

    return (
        !data?.feeds ? <></> :
            <List sx={{maxWidth: 650, minWidth: 300}}>
                {extract(data.feeds).map((f, idx) =>
                    <ImageCard key={idx} photo={f.photo}/>)}
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {fetchMoreLoading ? <Spinner height={45} width={45}/> : <></>}
                </Box>
            </List>
    )
}