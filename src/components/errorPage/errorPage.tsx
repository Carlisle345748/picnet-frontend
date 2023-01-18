import {useNavigate, useRouteError} from "react-router";
import {Stack, Typography} from "@mui/material";
import {StyleButton} from "../button/button";
import {useSelector} from "react-redux";
import {selectLoggedIn} from "../loginRegister/loginSlice";
import createError from "http-errors";


function ErrorData(error: { status?: number }) {
    if (error.status) {
        const httpErr = createError(error);
        if (httpErr.status === 404) {
            return {
                code: 404,
                message: "Page Not Found",
                subText: "The page you request doesn't exist. Try to go back the previous page or home page"
            }
        }
        return {
            code: httpErr.status,
            message: httpErr.message,
        }
    }

    return {
        code: 400,
        message: "Unknown Error"
    }
}


export function ErrorPage() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectLoggedIn)
    const errorResponse = useRouteError();

    const handleOnClick = async () => {
        if (isLoggedIn) {
            navigate("/explore");
        } else {
            navigate("/login");
        }
    };

    const error = ErrorData(errorResponse as { status?: number });

    return (
        <Stack
            sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
            }}
            justifyContent="center" alignItems="center"
        >
            <Typography fontWeight="medium" variant="h1">{error.code}</Typography>
            <Typography variant="h4">{error.message}</Typography>
            {error.subText && <Typography mt={1} align="center">{error.subText}</Typography>}
            <StyleButton
                sx={{
                    mt: 2,
                    px: 2,
                    py: 1,
                    color: 'black',
                    "&:hover": {
                        boxShadow: "none",
                        backgroundColor: "#ddd",
                    },
                    backgroundColor: "#efefef",
                }}
                onClick={handleOnClick}
            >
                <Typography fontWeight="medium">Back to Home Page</Typography>
            </StyleButton>
        </Stack>
    )
}