import {useSelector} from "react-redux";
import {selectLoggedIn} from "./components/loginRegister/loginSlice";
import {Stack, useTheme} from "@mui/material";
import {createBrowserRouter, Navigate, Outlet, RouterProvider,} from "react-router-dom";
import UserDetail from "./components/userDetail/userDetail";

import "./App.css";
import {EditProfile} from "./components/editProfile/editProfile";
import {Explore} from "./components/explore/explore";
import {Home} from "./components/home/home";
import {CreatPost} from "./components/createPost/createPost";
import {SearchResult} from "./components/searchResult/searchResult";
import LoginRegister from "./components/loginRegister/loginRegister";
import Grid from "@mui/material/Grid";
import {ErrorPage} from "./components/errorPage/errorPage";
import TopBar from "./components/topBar/topBar.jsx";
import {ThemeProvider} from "@mui/material/styles";

function Root() {
    const theme = useTheme();
    const isLoggedIn = useSelector(selectLoggedIn);
    if (!isLoggedIn) return <Outlet/>;

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Grid container direction="column">
                    <Grid>
                        <TopBar />
                    </Grid>
                    <Grid pt={10}>
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Outlet />
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default function PhotoShare() {
    const isLoggedIn = useSelector(selectLoggedIn);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "",
                    element: isLoggedIn ? <Navigate replace to={`/explore`} /> : <Navigate replace to={"/login"} />,
                },
                {
                    path: "login",
                    element: !isLoggedIn ? <LoginRegister /> : <Navigate replace to={`/explore`} />
                },
                {
                    path: "user/:userId",
                    element: isLoggedIn ? <UserDetail /> : <Navigate replace to={"/login"} />,
                },
                {
                    path: "editProfile",
                    element: isLoggedIn ? <EditProfile /> : <Navigate replace to={"/login"} />,
                },
                {
                    path: "explore",
                    element: isLoggedIn ? <Explore /> : <Navigate replace to={"/login"} />,
                },
                {
                    path: "home",
                    element: isLoggedIn ? <Home /> : <Navigate replace to={"/login"} />,
                },
                {
                    path: "create",
                    element: isLoggedIn ? <CreatPost /> : <Navigate replace to={"/login"} />,
                },
                {
                    path: "search",
                    element: isLoggedIn ? <SearchResult/> : <Navigate replace to={"/login"} />,
                }
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}
