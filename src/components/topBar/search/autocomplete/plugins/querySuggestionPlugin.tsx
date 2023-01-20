import {createQuerySuggestionsPlugin} from "@algolia/autocomplete-plugin-query-suggestions";
import {useAlgolia} from "../../../../../algolia.jsx";
import {Box} from "@mui/material";
import {ArrowIcon, SearchIcon} from "../../../../icons/icons";
import {setSearch} from "../searchSlice";
import qs from "qs";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {AutocompleteQuerySuggestionsHit} from "@algolia/autocomplete-plugin-query-suggestions/dist/esm/types";
import {AutocompleteComponents} from "@algolia/autocomplete-js";
import {useMemo} from "react";


export function usePhotoQuerySuggestionPlugin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {searchClient} = useAlgolia();
    return useMemo(() => {
        return createQuerySuggestionsPlugin({
            searchClient,
            indexName: `photo_share_photo_${import.meta.env.VITE_APP_ENV}_query_suggestions`,
            getSearchParams() {
                return {hitsPerPage: 10};
            },
            transformSource({source}) {
                return {
                    ...source,
                    templates: {
                        item({item, components}) {
                            return <SuggestionItem hit={item} components={components}/>
                        }
                    },
                    onSelect({item, setIsOpen}) {
                        const newSearchState = {
                            query: item.query,
                            category: "photo",
                        };
                        setIsOpen(false);
                        dispatch(setSearch(newSearchState));
                        navigate(`/search?${qs.stringify(newSearchState)}`);
                    },
                }
            }
        })
    }, []);
}

type SuggestionItemProp = { hit: AutocompleteQuerySuggestionsHit, components: AutocompleteComponents }

function SuggestionItem({hit, components}: SuggestionItemProp) {
    return (
        <Box className="aa-ItemWrapper">
            <Box className="aa-ItemContent">
                <Box className="aa-ItemIcon aa-ItemIcon--noBorder" sx={{width: 35, height: 35}}>
                    <SearchIcon color="grey"/>
                </Box>
                <Box className="aa-ItemContentBody">
                    <Box className="aa-ItemContentTitle">
                        <components.Highlight hit={hit} attribute="query"/>
                    </Box>
                </Box>
            </Box>
            <button className="aa-ItemActionButton aa-ActiveOnly">
                <ArrowIcon/>
            </button>
        </Box>
    );
}