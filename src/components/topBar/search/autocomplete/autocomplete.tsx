import {autocomplete} from '@algolia/autocomplete-js';
import {createElement, Fragment, useEffect, useMemo, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import '@algolia/autocomplete-theme-classic';
import {Box} from "@mui/material";
import "./autocomplete.css";
import {useUserPlugin} from "./plugins/userPlugin";
import {createAlgoliaInsightsPlugin} from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';
import {useDispatch, useSelector} from "react-redux";
import {clearSearch, selectSearch, setSearch} from "./searchSlice";
import {useNavigate} from "react-router";
import {useLocation, useSearchParams} from "react-router-dom";
import qs from "qs";
import {usePhotoQuerySuggestionPlugin} from "./plugins/querySuggestionPlugin";
import {useRecentSearchPlugin} from "./plugins/recentSearchPlugin";
import {limit, removeEmpty, uniqBy} from "./reshapeScource";


export function Autocomplete({placeholder = ""}: { placeholder?: string }) {
    const location = useLocation();
    const [param, setParam] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchState = useSelector(selectSearch);

    const containerRef = useRef<HTMLElement | null>(null);
    const panelRootRef = useRef<ReturnType<typeof createRoot> | null>(null);
    const rootRef = useRef<HTMLElement | null>(null);

    const userPlugin = useUserPlugin();
    const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({insightsClient});
    const querySuggestionPulign = usePhotoQuerySuggestionPlugin();
    const recentSearchPlugin = useRecentSearchPlugin();

    const plugins = useMemo(() => [
        recentSearchPlugin,
        querySuggestionPulign,
        userPlugin,
        algoliaInsightsPlugin,
    ], [algoliaInsightsPlugin, querySuggestionPulign, recentSearchPlugin, userPlugin]);

    useEffect(() => {
        if (location.pathname !== "/search") {
            dispatch(clearSearch());
        } else {
            const query = param.get("query") ?? "";
            const category = param.get("category") ?? "";
            if (query !== searchState.query || category !== searchState.category) {
                dispatch(setSearch({query, category}));
            }
        }
    }, [dispatch, location.pathname, param, searchState])

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
            initialState: {query: searchState.query},
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
            onReset() {
                dispatch(clearSearch());
                if (location.pathname === "/search") {
                    navigate("/explore");
                }
            },
            onStateChange({state, prevState, refresh}) {
                if (prevState.isOpen && !state.isOpen) {
                    document.body.classList.remove("aa-Detached");
                    refresh();
                }
            },
            onSubmit({state, setIsOpen}) {
                if (state.query === "") return;
                setIsOpen(false);
                if (location.pathname === "/search") {
                    dispatch(setSearch({...searchState, query: state.query}));
                    setParam((prev) => {
                        prev.set("query", state.query);
                        return prev;
                    });
                } else {
                    const newSearchState = {query: state.query, category: "photo"};
                    dispatch(setSearch(newSearchState));
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
    }, [dispatch, location.pathname, navigate, plugins, searchState, setParam, userPlugin]);

    return <Box ref={containerRef} sx={{width: '100%'}}/>;
}

