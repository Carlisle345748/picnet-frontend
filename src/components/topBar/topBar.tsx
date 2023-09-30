import React, {useEffect, useState} from "react";
import {AppBar, IconButton, Stack, Toolbar, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ExpandMore,} from "@mui/icons-material";
import {logout, selectLoggedIn, selectLoggedUserId} from "../loginRegister/loginSlice";
import {useApolloClient} from "@apollo/client";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileMenu from "./menu";
import {NavBar} from "./navigate/navigate";
import {useHandleGraphQLError} from "../../utils";
import {ProfileAvatar} from "../avatar/profileAvatar";
import {SearchBar, SearchIcon as SearchButton} from "./search/searchbar";
import {useGetLoginUserBasicQuery} from "../../gql/gql";
import {AnchorElState} from "./types";


function TopBar() {
    const client = useApolloClient();
    const dispatch = useDispatch();
    const loginUserId = useSelector(selectLoggedUserId);
    const isLoggedIn = useSelector(selectLoggedIn);
    const desktop = useMediaQuery('(min-width:680px)');
    const tinyScreen = !useMediaQuery('(min-width:300px)');

    const [anchorEl, setAnchorEl] = useState<AnchorElState>(null);

    const {data, error} = useGetLoginUserBasicQuery({
        variables: {id: loginUserId},
        skip: !isLoggedIn || !loginUserId,
        onError(error) {
            if (error.graphQLErrors.length > 0) {
                dispatch(logout());
                client.resetStore().catch(console.log);
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
        !(isLoggedIn) ? <></> : (
            <AppBar id={"appbar"} sx={{backgroundColor: "white", boxShadow: "none", pb: 1, pr: 0}}>
                <Toolbar component={Grid} container disableGutters pt={2}>
                    <Grid sx={{justifyContent: "flex-start", ml: 2}}>
                        <NavBar/>
                    </Grid>
                    <Grid flexGrow={desktop ? 0 : 1}/>
                    <Grid
                        xs
                        container
                        sx={{justifyContent: "flex-end", alignItems: "center", height: 45}}
                    >
                        {desktop && <SearchBar/>}
                    </Grid>
                    <Grid container sx={{justifyContent: "center"}}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignContent="center"
                            ml={desktop ? 1 : 0}
                            mr={desktop ? 2 : 0.3}
                        >
                            {!desktop && <SearchButton/>}
                            {
                                !tinyScreen && <IconButton
                                    sx={{width: 51, height: 51}}
                                    color="inherit"
                                    component={Link}
                                    to={`/user/${loginUserId}`}
                                    disabled={!Boolean(loginUserId)}
                                >{
                                    !data?.user ? <></> :
                                        <ProfileAvatar
                                            alt={(data.user.firstName + " " + data.user.lastName)}
                                            src={data.user.profile.avatar}
                                            sx={{width: 27, height: 27}}
                                        />
                                }
                                </IconButton>
                            }
                            <IconButton
                                sx={{width: 51, height: 51}}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                color="inherit"
                            >
                                <ExpandMore color="action" sx={{fontSize: 30}}/>
                            </IconButton>
                            <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
                        </Stack>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    );
}

export default TopBar;
