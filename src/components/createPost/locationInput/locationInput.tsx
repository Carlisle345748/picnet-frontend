import {useController} from "react-hook-form";
import {Autocomplete, TextField, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Grid from "@mui/material/Unstable_Grid2";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useHandleGraphQLError} from "../../../utils.jsx";
import pDebounce from "p-debounce";
import { useGetLocationSuggestionLazyQuery } from "../../../gql/gql.js";


export const LocationInput = () => {
    const {field} = useController({name: "location", defaultValue: null});
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<string[]>([]);

    const [query, {error}] = useGetLocationSuggestionLazyQuery({
        onCompleted(data) {
            let newOptions: string[] = [];
            if (field.value) {
                newOptions = [field.value];
            }
            data.locationSuggestions.forEach((loc) => {
                if (loc.fullAddress !== field.value) {
                    newOptions.push(loc.fullAddress)
                }
            })
            setOptions(newOptions);
        }
    });
    useHandleGraphQLError([error]);

    const debouncedQuery = useMemo(() => pDebounce(query, 200), [query]);

    useEffect(() => {
        if (inputValue === "") {
            setOptions([]);
        }
        if (inputValue.length > 1) {
            debouncedQuery({variables: {text: inputValue, topN: 4}})
                .catch(console.log);
        }
    }, [debouncedQuery, inputValue]);

    return (
        <Autocomplete
            autoComplete
            includeInputInList
            filterOptions={(x) => x}
            options={options}
            ref={field.ref}
            onBlur={field.onBlur}
            value={field.value}
            forcePopupIcon={false}
            onChange={(e, value) => {
                field.onChange(value);
                setInputValue(value ? value : "");
            }}
            onInputChange={(e, value) => setInputValue(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    variant="standard"
                    placeholder="Add location"
                />
            )}
            renderOption={(props, option) => {
                const idx = option.indexOf(',');
                const main = option.slice(0, idx);
                const secondary = option.slice(idx + 1);
                const matches = match(main, inputValue.split(',')[0]);
                const parts = parse(main, matches);
                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid sx={{display: 'flex', width: 44}}>
                                <LocationOnIcon sx={{color: 'text.secondary'}}/>
                            </Grid>
                            <Grid sx={{width: 'calc(100% - 44px)', wordWrap: 'break-word'}}>
                                {parts.map((part, index) => (
                                    <Typography
                                        component="span"
                                        key={index}
                                        sx={{fontWeight: part.highlight ? 'bold' : 'regular'}}
                                    >
                                        {part.text}
                                    </Typography>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {secondary}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
};
