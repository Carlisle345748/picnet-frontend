import React, {forwardRef} from "react";
import Alert from "@mui/material/Alert";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {SnackbarMessage, useSnackbar} from "notistack";

type RefType = HTMLDivElement;
type PropType = { key: SnackbarMessage, message: SnackbarMessage }

export const LoginExpireAlert = forwardRef<RefType, PropType>(({message}, ref) => {
    const {closeSnackbar} = useSnackbar();
    return (
        <Alert
            ref={ref}
            variant="filled"
            severity="info"
            sx={{
                bgcolor: "white",
                borderRadius: 20,
                "& .MuiAlert-message": {
                    color: "black"
                },
                "&.MuiAlert-root": {
                    color: "black"
                }
            }}
            action={
                <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => closeSnackbar()}
                >
                    <CloseIcon color="action" fontSize="inherit"/>
                </IconButton>
            }>
            {message}
        </Alert>
    );
});

export const ErrorAlert = forwardRef<RefType, PropType>(({message}, ref) => {
    const {closeSnackbar} = useSnackbar();
    return (
        <Alert
            ref={ref}
            variant="filled"
            severity="error"
            sx={{borderRadius: 20}}
            action={
                <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => closeSnackbar()}
                >
                    <CloseIcon
                        color="action"
                        fontSize="inherit"
                        sx={{
                            "&.MuiSvgIcon-root": {
                                color: "white"
                            }
                        }}
                    />
                </IconButton>
            }>
            {message}
        </Alert>
    );
});
