import {Box, Stack, useTheme} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useHandleGraphQLError} from "../../utils";
import {useCreateUserMutation} from "../../gql/gql";
import React from "react";

type Input = {
    firstName: string
    lastName: string
    username: string
    password: string
}


export const SignUp = ({setPage}: {setPage: React.Dispatch<React.SetStateAction<string>>}) => {
    const theme = useTheme();

    const {register, handleSubmit, setError, formState: {errors}} = useForm<Input>();
    const [addUser, {error}] = useCreateUserMutation({
        onError({graphQLErrors}) {
            graphQLErrors.forEach(err => {
                if (err?.extensions?.code === 1003) {
                    setError("username", {type: "costume", message: "username exist"});
                }
            })
        },
        onCompleted() {
            setPage('signIn')
        }
    });
    useHandleGraphQLError([error]);

    const onSubmit: SubmitHandler<Input> = (data) => {
        addUser({variables: {input: data}}).catch(console.log);
    };

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
            <Typography component="h1" variant="h5">Sign up</Typography>
            <Stack component="form"
                   onSubmit={handleSubmit(onSubmit)}
                   sx={{mt: 1, width: '100%', px: 5}}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={1} width="inherit">
                    <Box width="inherit">
                        <Typography fontSize={12} mb={0.7} color="grey">First Name</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="First Name"
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message as string}
                            InputLabelProps={{shrink: true}}
                            inputProps={{
                                ...register("firstName", {required: "You profile needs a name"}),
                            }}
                            InputProps={{sx: {borderRadius: 4, height: 48}}}
                        />
                    </Box>
                    <Box width="inherit">
                        <Typography fontSize={12} mb={0.7} color="grey">Last Name</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Last Name"
                            error={Boolean(errors.lastName)}
                            InputLabelProps={{shrink: true}}
                            helperText={errors.lastName?.message as string}
                            inputProps={{...register("lastName")}}
                            InputProps={{sx: {borderRadius: 4, height: 48}}}
                        />
                    </Box>
                </Stack>
                <Box mt={2}>
                    <Typography fontSize={12} mb={0.7} color="grey">Username</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Username"
                        autoComplete="username"
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
                        type="password"
                        variant="outlined"
                        placeholder="Password"
                        autoComplete="current-password"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message as string}
                        inputProps={{...register("password", {required: "Password is empty"})}}
                        InputProps={{sx: {borderRadius: 4, height: 48}}}
                    />
                </Box>
                <Button type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
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
                        }}>
                    Sign up
                </Button>
                <Typography
                    onClick={() => setPage('signIn')}
                    sx={{mt: 3, textDecoration: 'none', color: "black", "&:hover": {cursor: 'pointer'}}}
                    align='center' variant="body2">
                    <span>Already have an account? </span>
                    <Typography component='span' variant="body2" fontWeight="medium">Sign in</Typography>
                </Typography>
            </Stack>
        </Box>
    )
}