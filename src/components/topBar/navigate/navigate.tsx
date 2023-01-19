import {IconButton, Stack, useMediaQuery, useTheme,} from "@mui/material";
import React from "react";
import {Logo} from "../../icons/icons";
import {Link} from "react-router-dom";
import {NavBarMobile} from "./mobile";
import {NavBarDesktop} from "./desktop";


export function NavBar() {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(750));
    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="center" maxWidth={mobile ? 170 : 305}>
            <IconButton
                component={Link}
                to={`/explore`}
                sx={{width: 50, height: 50}}
            >
                <Logo width={24} height={24}/>
            </IconButton>
            {mobile ? <NavBarMobile/> : <NavBarDesktop/>}
        </Stack>
    );
}




