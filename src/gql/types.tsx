import {TRelayPageInfo} from "@apollo/client/utilities/policies/pagination";
import {StoreObject} from "@apollo/client/utilities/graphql/storeUtils";

export interface TRelayNode extends StoreObject {
    id: string
}

export type TRelayConnection<TNode> = {
    __typename?: string
    edges: Array<{ node: TNode }>
    pageInfo?: TRelayPageInfo & { totalCount?: number }
    totalCount?: number | null
}