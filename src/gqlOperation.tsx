import { gql } from '@apollo/client'
import {CORE_COMMENT, PHOTO_BASIC} from "./gqlFragment";

export const GET_FOLLOW_STATUS = gql`
    query GetFollowStatus($ids: [GlobalID!]) {
        users(filters: {id: {inList: $ids}}) {
            edges {
                node {
                    id
                    profile {
                        id
                        isFollowing
                    }
                }
            }
        }
    }
`

export const GET_LOGIN_USER_BASIC = gql`
    query GetLoginUserBasic($id: GlobalID!) {
        user(id: $id) {
            id
            username
            firstName
            lastName
            profile {
                id
                avatar
                description
            }
        }
    }
`

export const GET_USER_BASIC = gql`
    query GetUserBasic($id: GlobalID!) {
        user(id: $id) {
            id
            username
            firstName
            lastName
            profile {
                id
                avatar
                description
                isFollowing
            }
        }
    }
`

export const GET_USER_DETAIL = gql`
    ${PHOTO_BASIC}
    query GetUserDetail($id: GlobalID!) {
        user(id: $id) {
            id
            username
            firstName
            lastName
            profile {
                id
                avatar
                description
                follower {
                    totalCount
                }
                following {
                    totalCount
                }
                isFollowing
            }
            photos(order: {dateTime: DESC}) {
                edges {
                    node {
                        ...PhotoBasic
                    }
                }
            }
        }
    }
`

export const GET_FOLLOWER = gql`
    query GetFollower($id: GlobalID!) {
        user(id: $id) {
            id
            profile {
                id
                follower {
                    totalCount
                    edges {
                        node {
                            id
                            firstName
                            lastName
                            profile {
                                id
                                isFollowing
                                description
                                avatar
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_FOLLOWING = gql`
    query GetFollowing($id: GlobalID!) {
        user(id: $id) {
            id
            profile {
                id
                following {
                    totalCount
                    edges {
                        node {
                            id
                            firstName
                            lastName
                            profile {
                                id
                                isFollowing
                                description
                                avatar
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_PHOTOS = gql`
    query GetPhotos($userId: GlobalID!) {
        photos(filters: {user: {id: $userId}} order: {dateTime: DESC}) {
            edges {
                node {
                    id
                    file {
                        name
                    }
                    dateTime
                    url
                }
            }
        }
    }
`

export const GET_ALL_PHOTOS = gql`
    ${PHOTO_BASIC}
    query GetAllPhotos($first: Int!, $after: String) {
        photos(first: $first, after: $after, order: {dateTime: DESC}) {
            edges {
                node {
                    ...PhotoBasic
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`

export const GET_PHOTO = gql`
    ${CORE_COMMENT}
    query GetPhoto($id: GlobalID!, $first: Int!, $after: String) {
        photo(id: $id) {
            id
            file {
                name
            }
            dateTime
            url
            isLike
            userLike {
                totalCount
            }
            description
            location
            user {
                id
                firstName
                lastName
                profile {
                    id
                    avatar
                    isFollowing
                    description
                }
            }
            comments(first: $first, after: $after) {
                totalCount
                edges {
                    node {
                        ...CoreComment
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`

export const GET_FEED = gql`
    query GetFeed($userId: GlobalID!, $first: Int, $after: String) {
        feeds(filters: {user: {id: $userId}}, first: $first, after: $after, order: {dateTime: DESC}) {
            edges {
                node {
                    photo {
                        id
                        file {
                            name
                        }
                        url
                        dateTime
                        userLike {
                            totalCount
                        }
                        description
                        location
                        isLike
                        user {
                            id
                            firstName
                            lastName
                            profile {
                                id
                                avatar
                                description
                            }
                        }
                        comments(first: 3) {
                            totalCount
                            edges {
                                node {
                                    id
                                    comment
                                    user {
                                        id
                                        firstName
                                        lastName
                                    }
                                }
                            }
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`

export const CREATE_COMMENT = gql`
    ${CORE_COMMENT}
    mutation CreateComment($photoId: GlobalID!, $comment: String!) {
        createComment(input: {photoId: $photoId, comment: $comment }) {
            ...CoreComment
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input ) {
            id
        }
    }
`

export const UPDATE_LIKE = gql`
    mutation UpdateLike($photoId: GlobalID!, $like: Boolean!) {
        updatePhotoLike(input: {photoId: $photoId, like: $like}) {
            id
            isLike
        }
    }
`

export const UPDATE_FOLLOW = gql`
    mutation UpdateFollow($followId: GlobalID!, $follow: Boolean!) {
        updateFollower(input: {userId: $followId, follow: $follow}) {
            user {
                id
                profile {
                    id
                    following {
                        totalCount
                    }
                    isFollowing
                }
            }
            followUser {
                id
                profile {
                    id
                    follower {
                        totalCount
                    }
                    isFollowing
                }
            }
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
        }
    }
`

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
        updateProfile(input: $input) {
            id
            firstName
            lastName
            profile {
                id
                description
            }
        }
    }
`

export const UPLOAD_PHOTO = gql`
    ${PHOTO_BASIC}
    mutation UploadPhoto($input: UploadPhotoInput!) {
        uploadPhoto(input: $input) {
            ...PhotoBasic
        }
    }
`

export const UPLOAD_AVATAR = gql`
    mutation UploadAvatar($avatar: Upload!) {
        uploadAvatar(input: {avatar: $avatar}) {
            id
            avatar
        }
    }
`

export const DELETE_PHOTO = gql`
    mutation DeletePhoto($photoId: GlobalID!) {
        deletePhoto(input: {id: $photoId}) {
            id
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation DeleteComment( $commentId: GlobalID!) {
        deleteComment(input: {id: $commentId}) {
            id
        }
    }
`

export const GET_TOP_TAGS = gql`
    query GetTopTags($topN: Int, $text: String) {
        topTags(topN: $topN, text: $text ) {
            tag
            count
        }
    }
`

export const GET_LOCATION_SUGGESTION = gql`
    query GetLocationSuggestion($text: String!, $topN: Int) {
        locationSuggestions(text: $text, topN: $topN) {
            fullAddress
        }
    }
`

export const GET_BACKGROUND_IMAGE = gql`
    query GetBackgroundImage {
        backgroundImage
    }
`