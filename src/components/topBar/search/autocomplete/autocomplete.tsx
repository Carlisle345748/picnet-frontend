import {autocomplete} from '@algolia/autocomplete-js';
import {createElement, Fragment, useEffect, useMemo, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import '@algolia/autocomplete-theme-classic';
import {Box} from "@mui/material";
import "./autocomplete.css";
import {useUserPlugin} from "./plugins/userPlugin";
import {createAlgoliaInsightsPlugin} from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';
import {useNavigate} from "react-router";
import {useLocation, useSearchParams} from "react-router-dom";
import qs from "qs";
import {usePhotoQuerySuggestionPlugin} from "./plugins/querySuggestionPlugin";
import {useRecentSearchPlugin} from "./plugins/recentSearchPlugin";
import {limit, removeEmpty, uniqBy} from "./reshapeScource";


export function Autocomplete({placeholder = ""}: { placeholder?: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [param, setParam] = useSearchParams();

    const containerRef = useRef<HTMLElement | null>(null);
    const panelRootRef = useRef<ReturnType<typeof createRoot> | null>(null);
    const rootRef = useRef<HTMLElement | null>(null);

    const userPlugin = useUserPlugin();
    const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({insightsClient});
    const querySuggestionPulign = usePhotoQuerySuggestionPlugin();
    const recentSearchPlugin = useRecentSearchPlugin();

    const getDetach = () => {
        return document.getElementsByClassName("aa-DetachedOverlay").item(0);
    }

    const plugins = useMemo(() => [
        recentSearchPlugin,
        querySuggestionPulign,
        userPlugin,
        algoliaInsightsPlugin,
    ], [algoliaInsightsPlugin, querySuggestionPulign, recentSearchPlugin, userPlugin]);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const removeDup = uniqBy(({source, item}): string => {
            if (source.sourceId === "querySuggestionsPlugin") {
                return item.query!
            }
            return item.label ?? JSON.stringify(item);
        });
        const limitSource = limit(8, [
            "recentSearchesPlugin",
            "querySuggestionsPlugin",
            "user"
        ]);
        const filterEmpty = removeEmpty();

        const search = autocomplete({
            openOnFocus: true,
            placeholder: placeholder,
            container: containerRef.current,
            initialState: {query: param.get("query") ?? ""},
            renderer: {
                createElement, Fragment, render: () => {
                }
            },
            render({children}, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root
                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }
                panelRootRef.current.render(children);
            },
            onReset({setQuery}) {
                setQuery("");
                if (location.pathname === "/search" && !getDetach()) {
                    navigate("/explore");
                }
            },
            onStateChange({state, prevState, refresh}) {
                if (prevState.isOpen && !state.isOpen) {
                    document.body.classList.remove("aa-Detached");
                    refresh().catch(console.log);
                }
            },
            onSubmit({state, setIsOpen}) {
                if (state.query === "") return;

                setIsOpen(false);
                if (location.pathname === "/search") {
                    setParam((prev) => {
                        prev.set("query", state.query);
                        return prev;
                    });
                } else {
                    const newSearchState = {query: state.query, category: "photo"};
                    navigate(`/search?${qs.stringify(newSearchState)}`);
                }
            },
            reshape({sourcesBySourceId}) {
                const {querySuggestionsPlugin, recentSearchesPlugin, user} = sourcesBySourceId;
                const uniqueSource = [...removeDup(recentSearchesPlugin, querySuggestionsPlugin), user];
                return limitSource(...filterEmpty(...uniqueSource));
            },
            plugins,
        });

        return () => {
            search.destroy();
        };
    }, [location.pathname, navigate, plugins, setParam, userPlugin]);

    return <Box ref={containerRef} sx={{width: '100%'}}/>;
}

