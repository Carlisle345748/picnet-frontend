import {IconButton, Stack, styled, ToggleButton, ToggleButtonGroup, ToggleButtonProps,} from "@mui/material";
import React, {ElementType} from "react";
import {Logo} from "../icons/icons";
import {Link, useLocation} from "react-router-dom";

type LinkProp = {
    component: ElementType
    to: string
}

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

export default function Nav() {
    const location = useLocation();

    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <IconButton
                component={Link}
                to={`/explore`}
                sx={{width: 50, height: 50}}
            >
                <Logo width={24} height={24}/>
            </IconButton>
            <StyledToggleButtonGroup
                value={location.pathname}
                exclusive
            >
                <StyledToggleButton value="/explore" component={Link} to={"/explore"}>Explore</StyledToggleButton>
                <StyledToggleButton value="/home" component={Link} to={"/home"}>Home</StyledToggleButton>
                <StyledToggleButton value="/create" component={Link} to={"/create"}>Create</StyledToggleButton>
            </StyledToggleButtonGroup>
        </Stack>
    );
}
