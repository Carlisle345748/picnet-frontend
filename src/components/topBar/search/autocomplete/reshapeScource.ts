import {AutocompleteReshapeSource, BaseItem} from "@algolia/autocomplete-core/dist/esm/types"

type Item = Record<string, unknown> & { query?: string, label?: string }
export type ItemPredicateOptions = { source: AutocompleteReshapeSource<Item>, item: Item }
export type ItemPredicate = (option: ItemPredicateOptions) => string

export function uniqBy(predicate: ItemPredicate) {
    return function runUniqBy(...rawSources: Array<AutocompleteReshapeSource<Item>>) {
        const sources = rawSources.flat().filter(Boolean);
        const seen = new Set<string>();

        return sources.map((source) => {
            const items = source.getItems().filter((item) => {
                const itemValue = predicate({source, item});
                const hasSeen = seen.has(itemValue);
                seen.add(itemValue);
                return !hasSeen;
            })
            return {
                ...source,
                getItems() {
                    return items
                }
            };
        })
    }
}

export function limit(value: number, sourceNames: string[]) {
    return function runLimit(...rawSources: Array<AutocompleteReshapeSource<BaseItem>>) {
        const sources = rawSources.flat().filter(Boolean);
        const sourceMap = new Map(sources.map(s => [s.sourceId, s]));

        let remain = value;
        const result: Array<AutocompleteReshapeSource<BaseItem>> = [];
        for (let i = 0; i < sourceNames.length && remain > 0; ++i) {
            const name = sourceNames[i];
            if (!sourceMap.has(name)) continue;
            const source = sourceMap.get(name);
            if (!source) continue;
            const items = source.getItems();
            const limit = Math.min(items.length, remain);
            remain = Math.max(remain - limit, 0);
            result.push({
                ...source,
                getItems() {
                    return items.slice(0, limit);
                }
            })
        }
        return result;
    }
}

export function removeEmpty() {
    return function runRemoveEmpty(...rawSources: Array<AutocompleteReshapeSource<BaseItem>>) {
        const sources = rawSources.flat().filter(Boolean);
        return sources.map((source) => {
            const items = source.getItems();
            if (items.length === 0) return null;
            return {
                ...source,
                getItems() {
                    return items;
                }
            }
        }).filter((source): source is AutocompleteReshapeSource<BaseItem> => Boolean(source));
    }
}