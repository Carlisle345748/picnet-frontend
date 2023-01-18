import {extract, useHandleGraphQLError} from "../../utils.jsx";
import {List} from "@mui/material";
import {ImageCard} from "./imageCard/imageCard";
import {useSelector} from "react-redux";
import {selectLoggedUserId} from "../loginRegister/loginSlice";
import {useBottomScrollListener} from "react-bottom-scroll-listener";
import {useGetFeedQuery} from "../../gql/gql";


export const Home = function () {
    const loggedInUserId = useSelector(selectLoggedUserId);
    const {data, error, fetchMore} = useGetFeedQuery({
        variables: {userId: loggedInUserId, first: 10}
    });
    useHandleGraphQLError([error]);
    useBottomScrollListener(() => {
        if (data?.feeds.pageInfo.hasNextPage) {
            fetchMore({variables: {after: data.feeds.pageInfo.endCursor}}).catch(console.log)
        }
    }, {offset: 600});

    return (
        !data?.feeds ? <></> :
            <List sx={{maxWidth: 650, minWidth: 300}}>
                {extract(data.feeds).map((f, idx) =>
                    <ImageCard key={idx} photo={f.photo}/>)}
            </List>
    )
}