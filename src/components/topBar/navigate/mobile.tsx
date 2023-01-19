import {useNavigate} from "react-router";
import {Box, Menu, MenuItem, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {StyleButton} from "../../button/button";
import {ExpandIcon} from "../../icons/icons";
import {AnchorElState, SetAnchorEl} from "./types";


type NavBarMenuProp = {
    anchorEl: AnchorElState
    setAnchorEl: SetAnchorEl
}


const URLMap = new Map<string, string>([
    ["/explore", "Explore"],
    ["/home", "Home"],
    ["/create", "Create"]
])

function NavMenuItem({url, name, setAnchorEl}: { url: string, name: string, setAnchorEl: SetAnchorEl }) {
    const navigate = useNavigate();
    return (
        <MenuItem
            sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                    backgroundColor: "#e8e8e8",
                    "&:hover": {
                        backgroundColor: "#e8e8e8",
                    },
                },
            }}
            selected={location.pathname === url}
            onClick={() => {
                setAnchorEl(null);
                navigate(url);
            }}
        >
            <Typography fontWeight="medium">{name}</Typography>
        </MenuItem>
    )
}

function NavBarMenu({anchorEl, setAnchorEl}: NavBarMenuProp) {

    useEffect(() => {
        if (anchorEl) {
            document.body.style.overflowY = "scroll";
            document.body.style.paddingRight = "0px";
            (document.getElementById("appbar") as HTMLElement).style.paddingRight = "0px";
        }
    }, [anchorEl]);

    return (
        <Menu
            keepMounted
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            sx={{
                "& .MuiPaper-root": {
                    borderRadius: 2,
                    boxShadow: 1,
                    paddingLeft: 1,
                    paddingRight: 1,
                },
            }}
            onClose={() => setAnchorEl(null)}
        >
            <NavMenuItem url={"/explore"} name={"Explore"} setAnchorEl={setAnchorEl}/>
            <NavMenuItem url={"/home"} name={"Home"} setAnchorEl={setAnchorEl}/>
            <NavMenuItem url={"/create"} name={"Create"} setAnchorEl={setAnchorEl}/>
        </Menu>
    )
}

export function NavBarMobile() {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<AnchorElState>(null);

    return (
        <Box>
            <StyleButton
                sx={{
                    fontSize: 16,
                    fontWeight: "medium",
                    py: 1.25,
                    px: 1.5,
                    ml: 0.4,
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: 30,
                    "&:hover": {
                        backgroundColor: "#f5f5f5"
                    }
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {URLMap.get(location.pathname) ?? "Explore"}
                <ExpandIcon/>
            </StyleButton>
            <NavBarMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Box>
    )
}