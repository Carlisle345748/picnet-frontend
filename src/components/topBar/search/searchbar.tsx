import {alpha, Box, styled} from "@mui/material";
import {Autocomplete} from "./autocomplete/autocomplete";

export const Search = styled("form")(({theme}) => ({
    position: "relative",
    borderRadius: 25,
    backgroundColor: alpha(theme.palette.grey["300"], 1),
    "&:hover": {
        backgroundColor: alpha(theme.palette.grey["400"], 0.4),
    },
    display: "flex",
    alignItems: "center",
    margin: 0,
    height: "100%",
    width: "100%",
    marginLeft: 5,
}));

export function SearchBar() {
    return (
        <Search>
            <Autocomplete placeholder="Search"/>
        </Search>
    )
}

export function SearchIcon() {
    return (
        <Box width="51px" sx={{"&:hover": { cursor: "pointer"}}}>
            <Autocomplete/>
        </Box>)
}