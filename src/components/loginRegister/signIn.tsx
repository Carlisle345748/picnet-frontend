import {Box, CircularProgress, Stack, useTheme} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {login} from "./loginSlice";
import {useLoginMutation} from "../../gql/gql";

type Input = {
    username: string
    password: string
}

export const SignIn = ({setPage}: { setPage: React.Dispatch<React.SetStateAction<string>> }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setError, formState: {errors}} = useForm<Input>();
    const dispatch = useDispatch();

    const [sendLogin] = useLoginMutation({
        onCompleted: (data) => {
            dispatch(login(data.login));
            setLoading(false);
        },
        onError: ({graphQLErrors}) => {
            setLoading(false);
            for (let err of graphQLErrors) {
                setError("password", {type: "custom", message: err.extensions?.msg as string})
            }
        }
    });

    const onSubmit: SubmitHandler<Input> = (data, e) => {
        e?.preventDefault();
        setLoading(true);
        sendLogin({variables: {username: data.username, password: data.password}}).catch(console.log);
    };

    const demonLogin = () => {
        setLoading(true);
        sendLogin({variables: {username: "cuizk", password: "123"}});
    }

    return (
        <Box
            sx={{
                width: '100%',
                my: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: theme.palette.grey[800]}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <Stack component="form"
                   onSubmit={handleSubmit(onSubmit)}
                   sx={{mt: 1, width: '100%', px: 5}}>
                <Box>
                    <Typography fontSize={12} mb={0.7} color="grey">Username</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        autoComplete="username"
                        placeholder="Username"
                        error={Boolean(errors.username)}
                        helperText={errors.username?.message as string}
                        inputProps={{...register("username", {required: "Username is empty"})}}
                        InputProps={{sx: {borderRadius: 4, height: 48}}}
                    />
                </Box>
                <Box mt={2}>
                    <Typography fontSize={12} mb={0.7} color="grey">Password</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message as string}
                        inputProps={{...register("password", {required: "Password is empty"})}}
                        InputProps={{sx: {borderRadius: 4, height: 48}}}
                    />
                </Box>
                <LoadingButton
                    type="submit"
                    loading={loading}
                    variant="contained"
                    color="primary"
                    fullWidth
                    loadingIndicator={<CircularProgress size={20} thickness={5} sx={{color: "white"}}/>}
                    sx={{
                        mt: 3,
                        height: 40,
                        borderRadius: 5,
                        textTransform: "none",
                        fontSize: 17,
                        backgroundColor: "#e60023",
                        color: "white",
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                            backgroundColor: "#ad081b",
                        },
                        "&.MuiLoadingButton-root": {
                            backgroundColor: "#e60023"
                        },
                    }}>
                    Sign in
                </LoadingButton>
                <Typography align='center' sx={{mt: 1.5, mb: 0.5, color: "gray", fontWeight: "medium"}}>
                    OR
                </Typography>
                <Stack
                    alignItems='center'
                    direction='row'
                    justifyContent='center'
                    spacing={0.5}
                    mb={2.5}
                    onClick={demonLogin}
                    sx={{mb: 2.5, "&:hover": {cursor: 'pointer'}}}
                >
                    <AccountCircleIcon/>
                    <Typography component='span'
                                align='center'
                                sx={{mt: 1, mb: 1, color: "black", fontWeight: "medium"}}>
                        Continue as Demo User
                    </Typography>
                </Stack>
                <Typography
                    onClick={() => setPage('signUp')}
                    sx={{textDecoration: 'none', color: "black", "&:hover": {cursor: 'pointer'}}}
                    align='center' variant="body2">
                    <span>Don't have an account? </span>
                    <Typography component='span' variant="body2" fontWeight="medium">Sign up</Typography>
                </Typography>
            </Stack>
        </Box>
    )
}