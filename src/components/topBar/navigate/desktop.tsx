import {styled, ToggleButton, ToggleButtonGroup, ToggleButtonProps} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import React, {ElementType} from "react";


type LinkProp = {
    component?: ElementType
    to?: string
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    "& .MuiToggleButtonGroup-grouped": {
        "&:not(:first-of-type)": {
            borderRadius: 30,
        },
        "&:first-of-type": {
            borderRadius: 30,
        },
    },
    display: "flex",
    justifyContent: "center",
}));


const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps & LinkProp>(() => ({
    textTransform: "none",
    fontSize: 16,
    fontWeight: "medium",
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 3,
    marginRight: 3,
    width: 78,
    color: "black",
    border: 0,
    "&.Mui-selected": {
        backgroundColor: "black",
        color: "white",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },
}));


export function NavBarDesktop() {
    const location = useLocation();
    return (
        <StyledToggleButtonGroup
            value={location.pathname}
            exclusive
        >
            <StyledToggleButton value="/explore" component={Link} to={"/explore"}>Explore</StyledToggleButton>
            <StyledToggleButton value="/home" component={Link} to={"/home"}>Home</StyledToggleButton>
            <StyledToggleButton value="/create" component={Link} to={"/create"}>Create</StyledToggleButton>
        </StyledToggleButtonGroup>
    );
}
