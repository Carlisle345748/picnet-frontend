import {Stack} from '@mui/material';
import {useParams} from 'react-router';
import BasicInfo from "./basicInfo/basicInfo";
import PhotoList from "./photoList/photoList";
import {useHandleGraphQLError} from "../../utils";
import {useGetUserDetailQuery} from "../../gql/gql";
import React from "react";
import Spinner from "../loading/spinner";

export default function UserDetail() {
    const params = useParams();

    const {data, loading, error} = useGetUserDetailQuery({
            variables: {id: params.userId}
        }
    );
    useHandleGraphQLError([error]);

    if (loading) {
        return <Spinner/>;
    }

    return (
        !data?.user ? <></> :
            <Stack spacing={3}>
                <BasicInfo user={data.user}/>
                <PhotoList user={data.user}/>
            </Stack>
    )

}