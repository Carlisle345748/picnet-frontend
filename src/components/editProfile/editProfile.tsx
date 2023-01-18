import {SubmitHandler, useForm} from "react-hook-form";
import {selectLoggedInUser} from "../loginRegister/loginSlice";
import {useHandleGraphQLError} from "../../utils.jsx";
import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {EditAvatar, UploadAvatar} from "./editAvatar";
import {useAppSelector} from "../../store/hooks";
import {useGetLoginUserBasicQuery, useUpdateProfileMutation} from "../../gql/gql";

type Inputs = {
    firstName: string
    lastName: string
    description: string
}


export const EditProfile = function () {
    const [open, setOpen] = useState(false);
    const loggedInUser = useAppSelector(selectLoggedInUser);
    const {data, error: queryErr} = useGetLoginUserBasicQuery({variables: {id: loggedInUser?.id}});
    const [updateProfile, {error: updateErr}] = useUpdateProfileMutation({
        update(cache, {data}) {
            if (!data) {
                console.log("updateProfile mutation receive null data")
                return
            }
            const user = data!.updateProfile;
            cache.modify({
                id: cache.identify(user),
                fields: {
                    firstName() {
                        return user.firstName;
                    },
                    lastName() {
                        return user.lastName;
                    }
                }
            })
            cache.modify({
                id: cache.identify(user.profile),
                fields: {
                    description() {
                        return user.profile.description;
                    }
                }
            })
        }
    });

    const {register, handleSubmit, reset, formState: {errors, isDirty}} = useForm<Inputs>();

    useHandleGraphQLError([queryErr, updateErr]);
    useEffect(() => {
        if (data) {
            reset({
                firstName: data.user!.firstName,
                lastName: data.user!.lastName,
                description: data.user!.profile.description,
            })
        }
    }, [data, reset])

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        updateProfile({variables: {input: data}}).catch(console.log);
    }

    return (
        !data?.user ? <></> :
            <Stack justifyContent="center" alignItems="center">
                <EditAvatar user={data.user!} setOpen={setOpen}/>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{mt: 1, width: 500}}
                >
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={1}
                           width="inherit">
                        <Box width="inherit">
                            <Typography fontSize={12} mb={0.7} color="grey">First Name</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
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
                                error={Boolean(errors.lastName)}
                                InputLabelProps={{shrink: true}}
                                helperText={errors.lastName?.message as string}
                                inputProps={{...register("lastName")}}
                                InputProps={{sx: {borderRadius: 4, height: 48}}}
                            />
                        </Box>
                    </Stack>
                    <Box mt={1}>
                        <Typography fontSize={12} mb={0.7} color="grey">Description</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            placeholder={"Tell your story"}
                            error={Boolean(errors.description)}
                            InputLabelProps={{shrink: true}}
                            helperText={errors.description?.message as string}
                            inputProps={{...register("description")}}
                            InputProps={{sx: {borderRadius: 4}}}
                        />
                    </Box>
                    <div>
                        <Button type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!isDirty}
                                sx={{
                                    mt: 1,
                                    height: 40,
                                    borderRadius: 3,
                                    backgroundColor: "#e60023",
                                    color: "white",
                                    boxShadow: "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                        backgroundColor: "#ad081b",
                                    },
                                }}>
                            Save
                        </Button>
                    </div>
                </Box>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box><UploadAvatar setOpen={setOpen}/></Box>
                </Modal>
            </Stack>
    )
}