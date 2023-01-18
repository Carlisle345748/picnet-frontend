import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date with time (isoformat) */
  DateTime: any;
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  GlobalID: any;
  Upload: any;
};

export type CommentType = Node & {
  __typename?: 'CommentType';
  comment: Scalars['String'];
  dateTime: Scalars['DateTime'];
  id: Scalars['GlobalID'];
  photo: PhotoType;
  user: UserType;
};

/** A connection to a list of items. */
export type CommentTypeConnection = {
  __typename?: 'CommentTypeConnection';
  /** Contains the nodes in this connection */
  edges: Array<CommentTypeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type CommentTypeEdge = {
  __typename?: 'CommentTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: CommentType;
};

/** Input data for `createComment` mutation */
export type CreateCommentInput = {
  comment: Scalars['String'];
  photoId: Scalars['GlobalID'];
};

/** Input data for `createUser` mutation */
export type CreateUserInput = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Input data for `deleteComment` mutation */
export type DeleteCommentInput = {
  id: Scalars['GlobalID'];
};

/** Input data for `deletePhoto` mutation */
export type DeletePhotoInput = {
  id: Scalars['GlobalID'];
};

export type DjangoImageType = {
  __typename?: 'DjangoImageType';
  height: Scalars['Int'];
  name: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type FeedFilter = {
  user?: InputMaybe<NodeInput>;
};

export type FeedOrder = {
  dateTime?: InputMaybe<Ordering>;
};

export type FeedType = Node & {
  __typename?: 'FeedType';
  dateTime: Scalars['DateTime'];
  id: Scalars['GlobalID'];
  photo: PhotoType;
  user: UserType;
};

/** A connection to a list of items. */
export type FeedTypeConnection = {
  __typename?: 'FeedTypeConnection';
  /** Contains the nodes in this connection */
  edges: Array<FeedTypeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type FeedTypeEdge = {
  __typename?: 'FeedTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: FeedType;
};

export type GlobalIdFilterLookup = {
  contains?: InputMaybe<Scalars['GlobalID']>;
  endsWith?: InputMaybe<Scalars['GlobalID']>;
  exact?: InputMaybe<Scalars['GlobalID']>;
  gt?: InputMaybe<Scalars['GlobalID']>;
  gte?: InputMaybe<Scalars['GlobalID']>;
  iContains?: InputMaybe<Scalars['GlobalID']>;
  iEndsWith?: InputMaybe<Scalars['GlobalID']>;
  iExact?: InputMaybe<Scalars['GlobalID']>;
  iRegex?: InputMaybe<Scalars['String']>;
  iStartsWith?: InputMaybe<Scalars['GlobalID']>;
  inList?: InputMaybe<Array<Scalars['GlobalID']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['GlobalID']>;
  lte?: InputMaybe<Scalars['GlobalID']>;
  range?: InputMaybe<Array<Scalars['GlobalID']>>;
  regex?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['GlobalID']>;
};

export type HotTag = {
  __typename?: 'HotTag';
  count: Scalars['Int'];
  tag: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  fullAddress: Scalars['String'];
  main: Scalars['String'];
  secondary: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentType;
  createUser: UserType;
  deleteComment: CommentType;
  deletePhoto: PhotoType;
  login: UserType;
  logout: Scalars['Boolean'];
  updateFollower: UpdateFollowerResult;
  updatePhotoLike: PhotoType;
  updateProfile: UserType;
  uploadAvatar: ProfileType;
  uploadPhoto: PhotoType;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeletePhotoArgs = {
  input: DeletePhotoInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateFollowerArgs = {
  input: UpdateFollowerInput;
};


export type MutationUpdatePhotoLikeArgs = {
  input: UpdatePhotoLikeInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUploadAvatarArgs = {
  input: UploadAvatarInput;
};


export type MutationUploadPhotoArgs = {
  input: UploadPhotoInput;
};

/** An object with a Globally Unique ID */
export type Node = {
  /** The Globally Unique ID of this object */
  id: Scalars['GlobalID'];
};

/** Input of an object that implements the `Node` interface. */
export type NodeInput = {
  id: Scalars['GlobalID'];
};

export enum Ordering {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Information to aid in pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PhotoFiler = {
  user?: InputMaybe<NodeInput>;
};

export type PhotoOrder = {
  dateTime?: InputMaybe<Ordering>;
};

export type PhotoTagType = Node & {
  __typename?: 'PhotoTagType';
  id: Scalars['GlobalID'];
  tag: Scalars['String'];
};

/** A connection to a list of items. */
export type PhotoTagTypeConnection = {
  __typename?: 'PhotoTagTypeConnection';
  /** Contains the nodes in this connection */
  edges: Array<PhotoTagTypeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type PhotoTagTypeEdge = {
  __typename?: 'PhotoTagTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: PhotoTagType;
};

export type PhotoType = Node & {
  __typename?: 'PhotoType';
  comments: CommentTypeConnection;
  dateTime: Scalars['DateTime'];
  description: Scalars['String'];
  file: DjangoImageType;
  id: Scalars['GlobalID'];
  isLike: Scalars['Boolean'];
  location: Scalars['String'];
  ratio: Scalars['Float'];
  tags: PhotoTagTypeConnection;
  url: Scalars['String'];
  user: UserType;
  userLike: UserTypeConnection;
};


export type PhotoTypeCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PhotoTypeTagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PhotoTypeUserLikeArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type PhotoTypeConnection = {
  __typename?: 'PhotoTypeConnection';
  /** Contains the nodes in this connection */
  edges: Array<PhotoTypeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type PhotoTypeEdge = {
  __typename?: 'PhotoTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: PhotoType;
};

export type ProfileType = Node & {
  __typename?: 'ProfileType';
  avatar: Scalars['String'];
  description: Scalars['String'];
  follower: UserTypeConnection;
  following: UserTypeConnection;
  id: Scalars['GlobalID'];
  isFollowing: Scalars['Boolean'];
  user: UserType;
};


export type ProfileTypeFollowerArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ProfileTypeFollowingArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type ProfileTypeConnection = {
  __typename?: 'ProfileTypeConnection';
  /** Contains the nodes in this connection */
  edges: Array<ProfileTypeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type ProfileTypeEdge = {
  __typename?: 'ProfileTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: ProfileType;
};

export type Query = {
  __typename?: 'Query';
  backgroundImage: Scalars['String'];
  comment?: Maybe<CommentType>;
  feeds: FeedTypeConnection;
  locationSuggestions: Array<Location>;
  photo?: Maybe<PhotoType>;
  photos: PhotoTypeConnection;
  profile?: Maybe<Node>;
  profiles: ProfileTypeConnection;
  topTags: Array<HotTag>;
  user?: Maybe<UserType>;
  users: UserTypeConnection;
};


export type QueryCommentArgs = {
  id: Scalars['GlobalID'];
};


export type QueryFeedsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<FeedFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FeedOrder>;
};


export type QueryLocationSuggestionsArgs = {
  text: Scalars['String'];
  topN?: InputMaybe<Scalars['Int']>;
};


export type QueryPhotoArgs = {
  id: Scalars['GlobalID'];
};


export type QueryPhotosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<PhotoFiler>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<PhotoOrder>;
};


export type QueryProfileArgs = {
  id: Scalars['GlobalID'];
};


export type QueryProfilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTopTagsArgs = {
  text?: InputMaybe<Scalars['String']>;
  topN?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['GlobalID'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type StrFilterLookup = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  exact?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iContains?: InputMaybe<Scalars['String']>;
  iEndsWith?: InputMaybe<Scalars['String']>;
  iExact?: InputMaybe<Scalars['String']>;
  iRegex?: InputMaybe<Scalars['String']>;
  iStartsWith?: InputMaybe<Scalars['String']>;
  inList?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

/** Input data for `updateFollower` mutation */
export type UpdateFollowerInput = {
  follow: Scalars['Boolean'];
  userId: Scalars['GlobalID'];
};

export type UpdateFollowerResult = {
  __typename?: 'UpdateFollowerResult';
  followUser: UserType;
  user: UserType;
};

/** Input data for `updatePhotoLike` mutation */
export type UpdatePhotoLikeInput = {
  like: Scalars['Boolean'];
  photoId: Scalars['GlobalID'];
};

/** Input data for `updateProfile` mutation */
export type UpdateProfileInput = {
  description: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Input data for `uploadAvatar` mutation */
export type UploadAvatarInput = {
  avatar: Scalars['Upload'];
};

/** Input data for `uploadPhoto` mutation */
export type UploadPhotoInput = {
  description: Scalars['String'];
  location: Scalars['String'];
  photo: Scalars['Upload'];
  ratio: Scalars['Float'];
  tags: Array<Scalars['String']>;
};

export type UserFilter = {
  id?: InputMaybe<GlobalIdFilterLookup>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username?: InputMaybe<StrFilterLookup>;
};

export type UserType = Node & {
  __typename?: 'UserType';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['GlobalID'];
  lastName: Scalars['String'];
  photos: PhotoTypeConnection;
  profile: ProfileType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
};


export type UserTypePhotosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<PhotoFiler>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<PhotoOrder>;
};

/** A connection to a list of items. */
export type UserTypeConnection = {
  __typename?: 'UserTypeConnection';
  /** Contains the nodes in this connection */
  edges: Array<UserTypeEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
  /** Total quantity of existing nodes */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type UserTypeEdge = {
  __typename?: 'UserTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: UserType;
};

export type CoreCommentFragment = { __typename?: 'CommentType', id: any, comment: string, dateTime: any, user: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string } } };

export type UserFollowStatusFragment = { __typename?: 'UserType', id: any, profile: { __typename?: 'ProfileType', id: any, isFollowing: boolean } };

export type PhotoBasicFragment = { __typename?: 'PhotoType', id: any, url: string, ratio: number, dateTime: any, file: { __typename?: 'DjangoImageType', name: string } };

export type GetFollowStatusQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['GlobalID']> | Scalars['GlobalID']>;
}>;


export type GetFollowStatusQuery = { __typename?: 'Query', users: { __typename?: 'UserTypeConnection', edges: Array<{ __typename?: 'UserTypeEdge', node: { __typename?: 'UserType', id: any, profile: { __typename?: 'ProfileType', id: any, isFollowing: boolean } } }> } };

export type GetLoginUserBasicQueryVariables = Exact<{
  id: Scalars['GlobalID'];
}>;


export type GetLoginUserBasicQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', id: any, username: string, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string, description: string } } | null };

export type GetUserBasicQueryVariables = Exact<{
  id: Scalars['GlobalID'];
}>;


export type GetUserBasicQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', id: any, username: string, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string, description: string, isFollowing: boolean } } | null };

export type GetUserDetailQueryVariables = Exact<{
  id: Scalars['GlobalID'];
}>;


export type GetUserDetailQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', id: any, username: string, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string, description: string, isFollowing: boolean, follower: { __typename?: 'UserTypeConnection', totalCount?: number | null }, following: { __typename?: 'UserTypeConnection', totalCount?: number | null } }, photos: { __typename?: 'PhotoTypeConnection', edges: Array<{ __typename?: 'PhotoTypeEdge', node: { __typename?: 'PhotoType', id: any, url: string, ratio: number, dateTime: any, file: { __typename?: 'DjangoImageType', name: string } } }> } } | null };

export type GetFollowerQueryVariables = Exact<{
  id: Scalars['GlobalID'];
}>;


export type GetFollowerQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', id: any, profile: { __typename?: 'ProfileType', id: any, follower: { __typename?: 'UserTypeConnection', totalCount?: number | null, edges: Array<{ __typename?: 'UserTypeEdge', node: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, isFollowing: boolean, description: string, avatar: string } } }> } } } | null };

export type GetFollowingQueryVariables = Exact<{
  id: Scalars['GlobalID'];
}>;


export type GetFollowingQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', id: any, profile: { __typename?: 'ProfileType', id: any, following: { __typename?: 'UserTypeConnection', totalCount?: number | null, edges: Array<{ __typename?: 'UserTypeEdge', node: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, isFollowing: boolean, description: string, avatar: string } } }> } } } | null };

export type GetPhotosQueryVariables = Exact<{
  userId: Scalars['GlobalID'];
}>;


export type GetPhotosQuery = { __typename?: 'Query', photos: { __typename?: 'PhotoTypeConnection', edges: Array<{ __typename?: 'PhotoTypeEdge', node: { __typename?: 'PhotoType', id: any, dateTime: any, url: string, file: { __typename?: 'DjangoImageType', name: string } } }> } };

export type GetAllPhotosQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetAllPhotosQuery = { __typename?: 'Query', photos: { __typename?: 'PhotoTypeConnection', edges: Array<{ __typename?: 'PhotoTypeEdge', node: { __typename?: 'PhotoType', id: any, url: string, ratio: number, dateTime: any, file: { __typename?: 'DjangoImageType', name: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type GetPhotoQueryVariables = Exact<{
  id: Scalars['GlobalID'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetPhotoQuery = { __typename?: 'Query', photo?: { __typename?: 'PhotoType', id: any, dateTime: any, url: string, isLike: boolean, description: string, location: string, file: { __typename?: 'DjangoImageType', name: string }, userLike: { __typename?: 'UserTypeConnection', totalCount?: number | null }, user: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string, isFollowing: boolean, description: string } }, comments: { __typename?: 'CommentTypeConnection', totalCount?: number | null, edges: Array<{ __typename?: 'CommentTypeEdge', node: { __typename?: 'CommentType', id: any, comment: string, dateTime: any, user: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } } | null };

export type GetFeedQueryVariables = Exact<{
  userId: Scalars['GlobalID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetFeedQuery = { __typename?: 'Query', feeds: { __typename?: 'FeedTypeConnection', edges: Array<{ __typename?: 'FeedTypeEdge', node: { __typename?: 'FeedType', photo: { __typename?: 'PhotoType', id: any, url: string, dateTime: any, description: string, location: string, isLike: boolean, file: { __typename?: 'DjangoImageType', name: string }, userLike: { __typename?: 'UserTypeConnection', totalCount?: number | null }, user: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string, description: string } }, comments: { __typename?: 'CommentTypeConnection', totalCount?: number | null, edges: Array<{ __typename?: 'CommentTypeEdge', node: { __typename?: 'CommentType', id: any, comment: string, user: { __typename?: 'UserType', id: any, firstName: string, lastName: string } } }> } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['GlobalID'];
  comment: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentType', id: any, comment: string, dateTime: any, user: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, avatar: string } } } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserType', id: any } };

export type UpdateLikeMutationVariables = Exact<{
  photoId: Scalars['GlobalID'];
  like: Scalars['Boolean'];
}>;


export type UpdateLikeMutation = { __typename?: 'Mutation', updatePhotoLike: { __typename?: 'PhotoType', id: any, isLike: boolean } };

export type UpdateFollowMutationVariables = Exact<{
  followId: Scalars['GlobalID'];
  follow: Scalars['Boolean'];
}>;


export type UpdateFollowMutation = { __typename?: 'Mutation', updateFollower: { __typename?: 'UpdateFollowerResult', user: { __typename?: 'UserType', id: any, profile: { __typename?: 'ProfileType', id: any, isFollowing: boolean, following: { __typename?: 'UserTypeConnection', totalCount?: number | null } } }, followUser: { __typename?: 'UserType', id: any, profile: { __typename?: 'ProfileType', id: any, isFollowing: boolean, follower: { __typename?: 'UserTypeConnection', totalCount?: number | null } } } } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserType', id: any } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UserType', id: any, firstName: string, lastName: string, profile: { __typename?: 'ProfileType', id: any, description: string } } };

export type UploadPhotoMutationVariables = Exact<{
  input: UploadPhotoInput;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'PhotoType', id: any, url: string, ratio: number, dateTime: any, file: { __typename?: 'DjangoImageType', name: string } } };

export type UploadAvatarMutationVariables = Exact<{
  avatar: Scalars['Upload'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: { __typename?: 'ProfileType', id: any, avatar: string } };

export type DeletePhotoMutationVariables = Exact<{
  photoId: Scalars['GlobalID'];
}>;


export type DeletePhotoMutation = { __typename?: 'Mutation', deletePhoto: { __typename?: 'PhotoType', id: any } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['GlobalID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommentType', id: any } };

export type GetTopTagsQueryVariables = Exact<{
  topN?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
}>;


export type GetTopTagsQuery = { __typename?: 'Query', topTags: Array<{ __typename?: 'HotTag', tag: string, count: number }> };

export type GetLocationSuggestionQueryVariables = Exact<{
  text: Scalars['String'];
  topN?: InputMaybe<Scalars['Int']>;
}>;


export type GetLocationSuggestionQuery = { __typename?: 'Query', locationSuggestions: Array<{ __typename?: 'Location', fullAddress: string }> };

export type GetBackgroundImageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBackgroundImageQuery = { __typename?: 'Query', backgroundImage: string };

export const CoreCommentFragmentDoc = gql`
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
    `;
export const UserFollowStatusFragmentDoc = gql`
    fragment UserFollowStatus on UserType {
  id
  profile {
    id
    isFollowing
  }
}
    `;
export const PhotoBasicFragmentDoc = gql`
    fragment PhotoBasic on PhotoType {
  id
  file {
    name
  }
  url
  ratio
  dateTime
}
    `;
export const GetFollowStatusDocument = gql`
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
    `;

/**
 * __useGetFollowStatusQuery__
 *
 * To run a query within a React component, call `useGetFollowStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowStatusQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetFollowStatusQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowStatusQuery, GetFollowStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowStatusQuery, GetFollowStatusQueryVariables>(GetFollowStatusDocument, options);
      }
export function useGetFollowStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowStatusQuery, GetFollowStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowStatusQuery, GetFollowStatusQueryVariables>(GetFollowStatusDocument, options);
        }
export type GetFollowStatusQueryHookResult = ReturnType<typeof useGetFollowStatusQuery>;
export type GetFollowStatusLazyQueryHookResult = ReturnType<typeof useGetFollowStatusLazyQuery>;
export type GetFollowStatusQueryResult = Apollo.QueryResult<GetFollowStatusQuery, GetFollowStatusQueryVariables>;
export const GetLoginUserBasicDocument = gql`
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
    `;

/**
 * __useGetLoginUserBasicQuery__
 *
 * To run a query within a React component, call `useGetLoginUserBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserBasicQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLoginUserBasicQuery(baseOptions: Apollo.QueryHookOptions<GetLoginUserBasicQuery, GetLoginUserBasicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserBasicQuery, GetLoginUserBasicQueryVariables>(GetLoginUserBasicDocument, options);
      }
export function useGetLoginUserBasicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserBasicQuery, GetLoginUserBasicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserBasicQuery, GetLoginUserBasicQueryVariables>(GetLoginUserBasicDocument, options);
        }
export type GetLoginUserBasicQueryHookResult = ReturnType<typeof useGetLoginUserBasicQuery>;
export type GetLoginUserBasicLazyQueryHookResult = ReturnType<typeof useGetLoginUserBasicLazyQuery>;
export type GetLoginUserBasicQueryResult = Apollo.QueryResult<GetLoginUserBasicQuery, GetLoginUserBasicQueryVariables>;
export const GetUserBasicDocument = gql`
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
    `;

/**
 * __useGetUserBasicQuery__
 *
 * To run a query within a React component, call `useGetUserBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBasicQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserBasicQuery(baseOptions: Apollo.QueryHookOptions<GetUserBasicQuery, GetUserBasicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument, options);
      }
export function useGetUserBasicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserBasicQuery, GetUserBasicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument, options);
        }
export type GetUserBasicQueryHookResult = ReturnType<typeof useGetUserBasicQuery>;
export type GetUserBasicLazyQueryHookResult = ReturnType<typeof useGetUserBasicLazyQuery>;
export type GetUserBasicQueryResult = Apollo.QueryResult<GetUserBasicQuery, GetUserBasicQueryVariables>;
export const GetUserDetailDocument = gql`
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
    ${PhotoBasicFragmentDoc}`;

/**
 * __useGetUserDetailQuery__
 *
 * To run a query within a React component, call `useGetUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserDetailQuery(baseOptions: Apollo.QueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
      }
export function useGetUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export type GetUserDetailQueryHookResult = ReturnType<typeof useGetUserDetailQuery>;
export type GetUserDetailLazyQueryHookResult = ReturnType<typeof useGetUserDetailLazyQuery>;
export type GetUserDetailQueryResult = Apollo.QueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;
export const GetFollowerDocument = gql`
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
    `;

/**
 * __useGetFollowerQuery__
 *
 * To run a query within a React component, call `useGetFollowerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFollowerQuery(baseOptions: Apollo.QueryHookOptions<GetFollowerQuery, GetFollowerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowerQuery, GetFollowerQueryVariables>(GetFollowerDocument, options);
      }
export function useGetFollowerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowerQuery, GetFollowerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowerQuery, GetFollowerQueryVariables>(GetFollowerDocument, options);
        }
export type GetFollowerQueryHookResult = ReturnType<typeof useGetFollowerQuery>;
export type GetFollowerLazyQueryHookResult = ReturnType<typeof useGetFollowerLazyQuery>;
export type GetFollowerQueryResult = Apollo.QueryResult<GetFollowerQuery, GetFollowerQueryVariables>;
export const GetFollowingDocument = gql`
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
    `;

/**
 * __useGetFollowingQuery__
 *
 * To run a query within a React component, call `useGetFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFollowingQuery(baseOptions: Apollo.QueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
      }
export function useGetFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
        }
export type GetFollowingQueryHookResult = ReturnType<typeof useGetFollowingQuery>;
export type GetFollowingLazyQueryHookResult = ReturnType<typeof useGetFollowingLazyQuery>;
export type GetFollowingQueryResult = Apollo.QueryResult<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetPhotosDocument = gql`
    query GetPhotos($userId: GlobalID!) {
  photos(filters: {user: {id: $userId}}, order: {dateTime: DESC}) {
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
    `;

/**
 * __useGetPhotosQuery__
 *
 * To run a query within a React component, call `useGetPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotosQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPhotosQuery(baseOptions: Apollo.QueryHookOptions<GetPhotosQuery, GetPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPhotosQuery, GetPhotosQueryVariables>(GetPhotosDocument, options);
      }
export function useGetPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPhotosQuery, GetPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPhotosQuery, GetPhotosQueryVariables>(GetPhotosDocument, options);
        }
export type GetPhotosQueryHookResult = ReturnType<typeof useGetPhotosQuery>;
export type GetPhotosLazyQueryHookResult = ReturnType<typeof useGetPhotosLazyQuery>;
export type GetPhotosQueryResult = Apollo.QueryResult<GetPhotosQuery, GetPhotosQueryVariables>;
export const GetAllPhotosDocument = gql`
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
    ${PhotoBasicFragmentDoc}`;

/**
 * __useGetAllPhotosQuery__
 *
 * To run a query within a React component, call `useGetAllPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPhotosQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetAllPhotosQuery(baseOptions: Apollo.QueryHookOptions<GetAllPhotosQuery, GetAllPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPhotosQuery, GetAllPhotosQueryVariables>(GetAllPhotosDocument, options);
      }
export function useGetAllPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPhotosQuery, GetAllPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPhotosQuery, GetAllPhotosQueryVariables>(GetAllPhotosDocument, options);
        }
export type GetAllPhotosQueryHookResult = ReturnType<typeof useGetAllPhotosQuery>;
export type GetAllPhotosLazyQueryHookResult = ReturnType<typeof useGetAllPhotosLazyQuery>;
export type GetAllPhotosQueryResult = Apollo.QueryResult<GetAllPhotosQuery, GetAllPhotosQueryVariables>;
export const GetPhotoDocument = gql`
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
    ${CoreCommentFragmentDoc}`;

/**
 * __useGetPhotoQuery__
 *
 * To run a query within a React component, call `useGetPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotoQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPhotoQuery(baseOptions: Apollo.QueryHookOptions<GetPhotoQuery, GetPhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPhotoQuery, GetPhotoQueryVariables>(GetPhotoDocument, options);
      }
export function useGetPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPhotoQuery, GetPhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPhotoQuery, GetPhotoQueryVariables>(GetPhotoDocument, options);
        }
export type GetPhotoQueryHookResult = ReturnType<typeof useGetPhotoQuery>;
export type GetPhotoLazyQueryHookResult = ReturnType<typeof useGetPhotoLazyQuery>;
export type GetPhotoQueryResult = Apollo.QueryResult<GetPhotoQuery, GetPhotoQueryVariables>;
export const GetFeedDocument = gql`
    query GetFeed($userId: GlobalID!, $first: Int, $after: String) {
  feeds(
    filters: {user: {id: $userId}}
    first: $first
    after: $after
    order: {dateTime: DESC}
  ) {
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
    `;

/**
 * __useGetFeedQuery__
 *
 * To run a query within a React component, call `useGetFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetFeedQuery(baseOptions: Apollo.QueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options);
      }
export function useGetFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options);
        }
export type GetFeedQueryHookResult = ReturnType<typeof useGetFeedQuery>;
export type GetFeedLazyQueryHookResult = ReturnType<typeof useGetFeedLazyQuery>;
export type GetFeedQueryResult = Apollo.QueryResult<GetFeedQuery, GetFeedQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($photoId: GlobalID!, $comment: String!) {
  createComment(input: {photoId: $photoId, comment: $comment}) {
    ...CoreComment
  }
}
    ${CoreCommentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateLikeDocument = gql`
    mutation UpdateLike($photoId: GlobalID!, $like: Boolean!) {
  updatePhotoLike(input: {photoId: $photoId, like: $like}) {
    id
    isLike
  }
}
    `;
export type UpdateLikeMutationFn = Apollo.MutationFunction<UpdateLikeMutation, UpdateLikeMutationVariables>;

/**
 * __useUpdateLikeMutation__
 *
 * To run a mutation, you first call `useUpdateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLikeMutation, { data, loading, error }] = useUpdateLikeMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useUpdateLikeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLikeMutation, UpdateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLikeMutation, UpdateLikeMutationVariables>(UpdateLikeDocument, options);
      }
export type UpdateLikeMutationHookResult = ReturnType<typeof useUpdateLikeMutation>;
export type UpdateLikeMutationResult = Apollo.MutationResult<UpdateLikeMutation>;
export type UpdateLikeMutationOptions = Apollo.BaseMutationOptions<UpdateLikeMutation, UpdateLikeMutationVariables>;
export const UpdateFollowDocument = gql`
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
    `;
export type UpdateFollowMutationFn = Apollo.MutationFunction<UpdateFollowMutation, UpdateFollowMutationVariables>;

/**
 * __useUpdateFollowMutation__
 *
 * To run a mutation, you first call `useUpdateFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFollowMutation, { data, loading, error }] = useUpdateFollowMutation({
 *   variables: {
 *      followId: // value for 'followId'
 *      follow: // value for 'follow'
 *   },
 * });
 */
export function useUpdateFollowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFollowMutation, UpdateFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFollowMutation, UpdateFollowMutationVariables>(UpdateFollowDocument, options);
      }
export type UpdateFollowMutationHookResult = ReturnType<typeof useUpdateFollowMutation>;
export type UpdateFollowMutationResult = Apollo.MutationResult<UpdateFollowMutation>;
export type UpdateFollowMutationOptions = Apollo.BaseMutationOptions<UpdateFollowMutation, UpdateFollowMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateProfileDocument = gql`
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
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UploadPhotoDocument = gql`
    mutation UploadPhoto($input: UploadPhotoInput!) {
  uploadPhoto(input: $input) {
    ...PhotoBasic
  }
}
    ${PhotoBasicFragmentDoc}`;
export type UploadPhotoMutationFn = Apollo.MutationFunction<UploadPhotoMutation, UploadPhotoMutationVariables>;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPhotoMutation, { data, loading, error }] = useUploadPhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadPhotoMutation, UploadPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPhotoMutation, UploadPhotoMutationVariables>(UploadPhotoDocument, options);
      }
export type UploadPhotoMutationHookResult = ReturnType<typeof useUploadPhotoMutation>;
export type UploadPhotoMutationResult = Apollo.MutationResult<UploadPhotoMutation>;
export type UploadPhotoMutationOptions = Apollo.BaseMutationOptions<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($avatar: Upload!) {
  uploadAvatar(input: {avatar: $avatar}) {
    id
    avatar
  }
}
    `;
export type UploadAvatarMutationFn = Apollo.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const DeletePhotoDocument = gql`
    mutation DeletePhoto($photoId: GlobalID!) {
  deletePhoto(input: {id: $photoId}) {
    id
  }
}
    `;
export type DeletePhotoMutationFn = Apollo.MutationFunction<DeletePhotoMutation, DeletePhotoMutationVariables>;

/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhotoMutation, DeletePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePhotoMutation, DeletePhotoMutationVariables>(DeletePhotoDocument, options);
      }
export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<DeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: GlobalID!) {
  deleteComment(input: {id: $commentId}) {
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const GetTopTagsDocument = gql`
    query GetTopTags($topN: Int, $text: String) {
  topTags(topN: $topN, text: $text) {
    tag
    count
  }
}
    `;

/**
 * __useGetTopTagsQuery__
 *
 * To run a query within a React component, call `useGetTopTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopTagsQuery({
 *   variables: {
 *      topN: // value for 'topN'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useGetTopTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopTagsQuery, GetTopTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopTagsQuery, GetTopTagsQueryVariables>(GetTopTagsDocument, options);
      }
export function useGetTopTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopTagsQuery, GetTopTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopTagsQuery, GetTopTagsQueryVariables>(GetTopTagsDocument, options);
        }
export type GetTopTagsQueryHookResult = ReturnType<typeof useGetTopTagsQuery>;
export type GetTopTagsLazyQueryHookResult = ReturnType<typeof useGetTopTagsLazyQuery>;
export type GetTopTagsQueryResult = Apollo.QueryResult<GetTopTagsQuery, GetTopTagsQueryVariables>;
export const GetLocationSuggestionDocument = gql`
    query GetLocationSuggestion($text: String!, $topN: Int) {
  locationSuggestions(text: $text, topN: $topN) {
    fullAddress
  }
}
    `;

/**
 * __useGetLocationSuggestionQuery__
 *
 * To run a query within a React component, call `useGetLocationSuggestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationSuggestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationSuggestionQuery({
 *   variables: {
 *      text: // value for 'text'
 *      topN: // value for 'topN'
 *   },
 * });
 */
export function useGetLocationSuggestionQuery(baseOptions: Apollo.QueryHookOptions<GetLocationSuggestionQuery, GetLocationSuggestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocationSuggestionQuery, GetLocationSuggestionQueryVariables>(GetLocationSuggestionDocument, options);
      }
export function useGetLocationSuggestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationSuggestionQuery, GetLocationSuggestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocationSuggestionQuery, GetLocationSuggestionQueryVariables>(GetLocationSuggestionDocument, options);
        }
export type GetLocationSuggestionQueryHookResult = ReturnType<typeof useGetLocationSuggestionQuery>;
export type GetLocationSuggestionLazyQueryHookResult = ReturnType<typeof useGetLocationSuggestionLazyQuery>;
export type GetLocationSuggestionQueryResult = Apollo.QueryResult<GetLocationSuggestionQuery, GetLocationSuggestionQueryVariables>;
export const GetBackgroundImageDocument = gql`
    query GetBackgroundImage {
  backgroundImage
}
    `;

/**
 * __useGetBackgroundImageQuery__
 *
 * To run a query within a React component, call `useGetBackgroundImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBackgroundImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBackgroundImageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBackgroundImageQuery(baseOptions?: Apollo.QueryHookOptions<GetBackgroundImageQuery, GetBackgroundImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBackgroundImageQuery, GetBackgroundImageQueryVariables>(GetBackgroundImageDocument, options);
      }
export function useGetBackgroundImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBackgroundImageQuery, GetBackgroundImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBackgroundImageQuery, GetBackgroundImageQueryVariables>(GetBackgroundImageDocument, options);
        }
export type GetBackgroundImageQueryHookResult = ReturnType<typeof useGetBackgroundImageQuery>;
export type GetBackgroundImageLazyQueryHookResult = ReturnType<typeof useGetBackgroundImageLazyQuery>;
export type GetBackgroundImageQueryResult = Apollo.QueryResult<GetBackgroundImageQuery, GetBackgroundImageQueryVariables>;