import React from "react";
import {createContext, useContext} from "react";
import algoliasearch, {SearchClient} from "algoliasearch/lite";
import insightsClient from "search-insights";

const appId: string = import.meta.env.VITE_APP_ALGOLIA_APPLICATION_ID;
const apiKey: string = import.meta.env.VITE_APP_ALGOLIA_API_KEY;

export type TAlgoliaContext = {
    appId: string,
    apiKey: string,
    searchClient: SearchClient,
}
const searchClient = algoliasearch(appId, apiKey);


const AlgoliaContext = createContext<TAlgoliaContext>({
    appId,
    apiKey,
    searchClient,
});

insightsClient('init', {appId, apiKey, useCookie: true});

export function AlgoliaProvider({children}: { children: React.ReactNode }) {
    return (
        <AlgoliaContext.Provider value={{appId, apiKey, searchClient}}>
            {children}
        </AlgoliaContext.Provider>)
}

export function useAlgolia() {
    return useContext(AlgoliaContext);
}