import {
    AutocompleteComponents,
    AutocompletePlugin,
    AutocompleteSource,
    getAlgoliaResults
} from "@algolia/autocomplete-js";
import {useMemo} from "react";
import {ProfileAvatar} from "../../../../avatar/profileAvatar";
import {Box} from "@mui/material";
import {useNavigate} from "react-router";
import {useAlgolia} from "../../../../../algolia";
import {debounce} from "./debounce";
import {ArrowIcon} from "../../../../icons/icons";
import {BaseItem} from "@algolia/autocomplete-core/dist/esm/types";

interface UserHit extends BaseItem {
    'avatar_url': string
    name: string
}

export function useUserPlugin(): AutocompletePlugin<UserHit, unknown> {
    const {searchClient} = useAlgolia();
    const navigate = useNavigate();

    const debounced = useMemo(() =>
        debounce((item: Array<AutocompleteSource<UserHit>>) => item, 300), []);

    return useMemo(() => {
        return {
            getSources({query}) {
                return debounced([
                    {
                        sourceId: "user",
                        getItems() {
                            if (!query) return [];
                            return getAlgoliaResults({
                                searchClient,
                                queries: [
                                    {
                                        indexName: `photo_share_user_${import.meta.env.VITE_APP_ENV}`,
                                        query,
                                        params: {
                                            hitsPerPage: 10,
                                            clickAnalytics: true,
                                        },
                                    },
                                ],
                            });
                        },
                        templates: {
                            item({item, components}: { item: UserHit, components: AutocompleteComponents }) {
                                return <UserItem hit={item} components={components}/>;
                            },
                        },
                        onSelect({item, setIsOpen}: { item: UserHit, setIsOpen: (open: boolean) => void }) {
                            navigate(`/user/${item['global_id']}`);
                            setIsOpen(false);
                        }
                    },
                ]);
            },
        };
    }, [])
}

function UserItem({hit, components}: { hit: UserHit, components: AutocompleteComponents }) {
    return (
        <Box className="aa-ItemWrapper">
            <Box className="aa-ItemContent">
                <ProfileAvatar src={hit['avatar_url']} alt={hit.name} sx={{height: 34, width: 34}}/>
                <Box className="aa-ItemContentBody">
                    <Box className="aa-ItemContentTitle">
                        <components.Highlight hit={hit} attribute="name"/>
                    </Box>
                </Box>
            </Box>
            <button className="aa-ItemActionButton aa-ActiveOnly">
                <ArrowIcon/>
            </button>
        </Box>
    );
}
