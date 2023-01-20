import {useSearchParams} from "react-router-dom";
import {InstantSearch, useInstantSearch, useSearchBox} from "react-instantsearch-hooks-web";
import React, {useEffect, useLayoutEffect} from "react";
import {Box, Stack} from "@mui/material";
import {useAlgolia} from "../../algolia";
import {createInsightsMiddleware} from "instantsearch.js/es/middlewares";
import insightsClient from "search-insights";


export function SearchBox() {
    const [param] = useSearchParams();
    const query = param.get('query');
    const {refine} = useSearchBox();

    useEffect(() => {
        refine(query ?? "");
    }, [query, refine]);

    return <Box sx={{display: 'none'}}/>;
}

function SearcherWrapper({children}: { children: React.ReactNode }) {
    const {use} = useInstantSearch();
    useLayoutEffect(() => {
        const middleware = createInsightsMiddleware({insightsClient});

        return use(middleware);
    }, [use]);

    return <Stack justifyContent="center" alignItems="center" width="100%">{children}</Stack>
}

export function AlgoliaSearcher({index, children}: { index: string, children: React.ReactNode }) {
    const {searchClient} = useAlgolia();

    return (
        <InstantSearch indexName={index} searchClient={searchClient!}>
            <SearcherWrapper>
                <SearchBox/>
                {children}
            </SearcherWrapper>
        </InstantSearch>
    )
}