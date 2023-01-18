import {Autocomplete, Box, Chip, Stack, TextField, Typography} from "@mui/material";
import {useController} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {distinctArray, useHandleGraphQLError} from "../../../utils.jsx";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import pDebounce from "p-debounce";
import {useGetTopTagsLazyQuery} from "../../../gql/gql.js";


export const TagsInput = () => {
    const {field} = useController({name: "tags", defaultValue: []});
    const [inputValue, setInputValue] = useState("");
    const [query, {data, error, previousData}] = useGetTopTagsLazyQuery();
    useHandleGraphQLError([error]);

    const debouncedQuery = useMemo(() => pDebounce(query, 200), [query]);

    useEffect(() => {
        debouncedQuery({variables: {text: inputValue, topN: 10}}).catch(console.log);
    }, [debouncedQuery, inputValue]);

    return (
        <Autocomplete
            multiple
            clearOnBlur
            handleHomeEndKeys
            selectOnFocus
            freeSolo
            value={field.value}
            limitTags={3}
            options={data ? data.topTags : (previousData ? previousData.topTags : [])}
            onInputChange={(_e, value) => setInputValue(value)}
            onChange={(_event, values) => {
                if (values.length > 0) {
                    const newValue = values.pop();
                    if (typeof newValue === 'string') {
                        values.push(newValue);
                    } else {
                        values.push(newValue.tag);
                    }
                }
                field.onChange(distinctArray(values));
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip label={option} {...getTagProps({index})} />
                ))
            }
            filterOptions={(options, params) => {
                // Suggest the creation of a new value
                const {inputValue} = params;
                const isExisting = options.some((option) => inputValue === option.tag);
                if (inputValue !== '' && !isExisting) {
                    options.push({tag: inputValue, title: `Add "${inputValue}"`});
                }
                const selectedValueMap = new Map(field.value.map((v: string) => [v, true]));
                options = options.filter((option) => !selectedValueMap.has(option.tag));
                return options.slice(0, 5);
            }}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                } else if (option.title) {
                    return option.title
                } else {
                    return option.tag;
                }
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    variant='standard'
                    fullWidth
                    placeholder="Add some tags"
                />
            }
            renderOption={(props, option) => {
                if (option.title) {
                    return <li {...props} >{option.title}</li>;
                }
                const matches = match(option.tag, inputValue);
                const parts = parse(option.tag, matches);
                return (
                    <li {...props}>
                        <Stack direction='row' justifyContent="space-between" width='100%'>
                            <Box>
                                {parts.map((part, index) => (
                                    <Typography
                                        component="span"
                                        key={index}
                                        sx={{fontWeight: part.highlight ? 'bold' : 'regular'}}
                                    >
                                        {part.text}
                                    </Typography>
                                ))}
                            </Box>
                            <Typography variant='body2' color='textSecondary'>
                                {option.count > 1 ? `${option.count} photos` : "1 photo"}
                            </Typography>
                        </Stack>
                    </li>
                )
            }}
        />
    )
}