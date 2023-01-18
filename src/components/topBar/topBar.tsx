import React, {useEffect, useState} from "react";
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ExpandMore,} from "@mui/icons-material";
import {logout, selectLoggedIn, selectLoggedUserId} from "../loginRegister/loginSlice";
import {useApolloClient} from "@apollo/client";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileMenu from "./menu";
import Nav from "./navigate";
import {useHandleGraphQLError} from "../../utils";
import {ProfileAvatar} from "../avatar/profileAvatar";
import {SearchBar} from "./search/searchbar";
import {useGetLoginUserBasicQuery} from "../../gql/gql";
import {AnchorElState} from "./types";


function TopBar() {
    const client = useApolloClient();
    const dispatch = useDispatch();
    const loginUserId = useSelector(selectLoggedUserId);
    const isLoggedIn = useSelector(selectLoggedIn);

    const [anchorEl, setAnchorEl] = useState<AnchorElState>(null);

    const {data, error} = useGetLoginUserBasicQuery({
        variables: {id: loginUserId},
        skip: !isLoggedIn || !loginUserId,
        onError(error) {
            if (error.graphQLErrors.length > 0) {
                dispatch(logout());
                client.resetStore();
            }
        }
    });
    useHandleGraphQLError([error]);

    // Disable style change when the modal is opened
    useEffect(() => {
        if (anchorEl) {
            document.body.style.overflowY = "scroll";
            document.body.style.paddingRight = "0px";
            (document.getElementById("appbar") as HTMLElement).style.paddingRight = "0px";
        }
    }, [anchorEl]);


    return (
        !(isLoggedIn && data?.user) ? <></> : (
            <AppBar id={"appbar"} sx={{backgroundColor: "white", boxShadow: "none", pb: 1, pr: 0}}>
                <Toolbar component={Grid} container disableGutters pt={2}>
                    <Grid width={300} sx={{justifyContent: "flex-start", ml: 2}}>
                        <Nav/>
                    </Grid>
                    <Grid
                        container
                        xs
                        sx={{justifyContent: "center", alignItems: "center", height: 45}}
                    >
                        <SearchBar/>
                    </Grid>
                    <Grid container width={130} sx={{justifyContent: "center"}}>
                        <Box>
                            <IconButton
                                size="large"
                                color="inherit"
                                component={Link}
                                to={`/user/${loginUserId}`}
                                disabled={!Boolean(loginUserId)}
                            >
                                <ProfileAvatar
                                    alt={data.user.firstName + " " + data.user.lastName}
                                    src={data?.user.profile.avatar}
                                    sx={{
                                        width: 27,
                                        height: 27,
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                size="large"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                color="inherit"
                            >
                                <ExpandMore color="action" sx={{fontSize: 30}}/>
                            </IconButton>
                            <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    );
}

export default TopBar;
