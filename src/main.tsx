import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {relayStylePagination} from "@apollo/client/utilities"
import Cookie from "js-cookie";
import {Provider} from "react-redux";
import 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {ApolloClient, ApolloProvider, from, InMemoryCache,} from "@apollo/client"
import {setContext} from '@apollo/client/link/context'
import {createUploadLink} from "apollo-upload-client"
import {SnackbarProvider} from "notistack"
import appstore from './store/store'
import {AlgoliaProvider} from "./algolia";

const httpLink = createUploadLink({uri: "/graphql"});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            "x-csrftoken": Cookie.get("csrftoken"),
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    users: relayStylePagination(["filters"]),
                    photos: relayStylePagination(["filters"]),
                    feeds: relayStylePagination(["filters"]),
                }
            },
            ProfileType: {
                fields: {
                    following: relayStylePagination((_args, context) => {
                        return context.field?.selectionSet?.selections
                            .map(field => "name" in field ? field.name.value : "*")
                            .join("$") || "root";
                    }),
                    follower: relayStylePagination((args, context) => {
                        return context.field?.selectionSet?.selections
                            .map(field => "name" in field ? field.name.value : "*")
                            .join("$") || "root";
                    })
                }
            },
            PhotoType: {
                fields: {
                    comments: relayStylePagination()
                }
            }
        }
    }),
    connectToDevTools: true,
    link: from([authLink, httpLink]),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={appstore.store}>
            <PersistGate loading={null} persistor={appstore.persistor}>
                <ApolloProvider client={client}>
                    <SnackbarProvider>
                        <AlgoliaProvider>
                            <App/>
                        </AlgoliaProvider>
                    </SnackbarProvider>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
