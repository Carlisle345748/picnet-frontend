import {Stack} from '@mui/material';
import {useParams} from 'react-router';
import BasicInfo from "./basicInfo/basicInfo";
import PhotoList from "./photoList/photoList";
import {useHandleGraphQLError} from "../../utils";
import {useGetUserDetailQuery} from "../../gql/gql";

export default function UserDetail() {
    const params = useParams();

    const {data, error} = useGetUserDetailQuery({
            variables: {id: params.userId}
        }
    );
    useHandleGraphQLError([error]);

    return (
        !data?.user ? <></> :
            <Stack spacing={3}>
                <BasicInfo user={data.user}/>
                <PhotoList user={data.user}/>
            </Stack>
    )

}