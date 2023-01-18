import {createLocalStorageRecentSearchesPlugin} from '@algolia/autocomplete-plugin-recent-searches';
import {setSearch} from "../searchSlice";
import qs from "qs";
import React from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import {HistoryIcon} from "../../../../icons/icons";
import CloseIcon from '@mui/icons-material/Close';
import {RecentSearchesItem} from "@algolia/autocomplete-plugin-recent-searches/dist/esm/types";
import {AutocompleteComponents} from "@algolia/autocomplete-js";

export function useRecentSearchPlugin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return createLocalStorageRecentSearchesPlugin({
        key: 'RECENT_SEARCH',
        limit: 10,
        transformSource({source, onRemove}) {
            return {
                ...source,
                templates: {
                    item({item, components}) {
                        return <RecentSearchItem item={item} components={components} onRemove={onRemove}/>
                    }
                },
                onSelect({item}) {
                    const newSearchState = {
                        query: item.label,
                        category: "photo",
                    };
                    dispatch(setSearch(newSearchState));
                    navigate(`/search?${qs.stringify(newSearchState)}`);
                },
            }
        }
    });
}

type RecentSearchItemProp = {
    item: RecentSearchesItem
    components: AutocompleteComponents
    onRemove(id: string): void
}

function RecentSearchItem({item, components, onRemove}: RecentSearchItemProp) {
    return (
        <Box className="aa-ItemWrapper">
            <Box className="aa-ItemContent">
                <Box className="aa-ItemIcon aa-ItemIcon--noBorder" sx={{width: 35, height: 35}}>
                    <HistoryIcon/>
                </Box>
                <Box className="aa-ItemContentBody">
                    <Box className="aa-ItemContentTitle">
                        <components.Highlight hit={item} attribute="label"/>
                    </Box>
                </Box>
            </Box>
            <button
                className="aa-ItemActionButton aa-ActiveOnly"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(item.id);
                }}
            >
                <CloseIcon viewBox="0 0 22 22"/>
            </button>
        </Box>
    );
}