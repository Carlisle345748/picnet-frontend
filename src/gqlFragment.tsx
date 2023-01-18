import { gql } from '@apollo/client'


export const CORE_COMMENT = gql`
    fragment CoreComment on CommentType {
        id
        comment
        dateTime
        user {
            id
            firstName
            lastName
            profile {
                id
                avatar
            }
        }
    }
`

export const USER_FOLLOW_STATUS = gql`
    fragment UserFollowStatus on UserType {
        id
        profile {
            id
            isFollowing
        }
    }
`

export const PHOTO_BASIC = gql`
    fragment PhotoBasic on PhotoType {
        id
        file {
            name
        }
        url
        ratio
        dateTime
    }
`