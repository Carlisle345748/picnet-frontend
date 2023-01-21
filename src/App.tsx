import {useSelector} from "react-redux";
import {selectLoggedIn} from "./components/loginRegister/loginSlice";
import {Stack, useTheme} from "@mui/material";
import {createBrowserRouter, Navigate, Outlet, RouterProvider,} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import loadable from '@loadable/component'
import "./App.css";

const EditProfile = loadable(() => import("./components/editProfile/editProfile"));
const Explore = loadable(() => import("./components/explore/explore"));
const Home = loadable(() => import("./components/home/home"));
const CreatPost = loadable(() => import("./components/createPost/createPost"));
const SearchResult = loadable(() => import("./components/searchResult/searchResult"));
const LoginRegister = loadable(() => import("./components/loginRegister/loginRegister"));
const ErrorPage = loadable(() => import("./components/errorPage/errorPage"));
const TopBar = loadable(() => import("./components/topBar/topBar.jsx"));
const UserDetail = loadable(() => import("./components/userDetail/userDetail"));

function Root() {
    const theme = useTheme();
    const isLoggedIn = useSelector(selectLoggedIn);
    if (!isLoggedIn) return <Outlet/>;

    return (
        <ThemeProvider theme={theme}>
            <Stack>
                <TopBar/>
                <Stack
                    pt={10}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Outlet/>
                </Stack>
            </Stack>
        </ThemeProvider>
    );
}

export default function PhotoShare() {
    const isLoggedIn = useSelector(selectLoggedIn);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "",
                    element: isLoggedIn ? <Navigate replace to={`/explore`}/> : <Navigate replace to={"/login"}/>,
                },
                {
                    path: "login",
                    element: !isLoggedIn ? <LoginRegister/> : <Navigate replace to={`/explore`}/>
                },
                {
                    path: "user/:userId",
                    element: isLoggedIn ? <UserDetail/> : <Navigate replace to={"/login"}/>,
                },
                {
                    path: "editProfile",
                    element: isLoggedIn ? <EditProfile/> : <Navigate replace to={"/login"}/>,
                },
                {
                    path: "explore",
                    element: isLoggedIn ? <Explore/> : <Navigate replace to={"/login"}/>,
                },
                {
                    path: "home",
                    element: isLoggedIn ? <Home/> : <Navigate replace to={"/login"}/>,
                },
                {
                    path: "create",
                    element: isLoggedIn ? <CreatPost/> : <Navigate replace to={"/login"}/>,
                },
                {
                    path: "search",
                    element: isLoggedIn ? <SearchResult/> : <Navigate replace to={"/login"}/>,
                }
            ],
        },
    ]);
    return <RouterProvider router={router}/>;
}
