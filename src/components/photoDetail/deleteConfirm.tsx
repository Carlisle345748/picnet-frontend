import {Dialog, DialogTitle, List, Stack, Typography} from "@mui/material";
import React from "react";
import {MenuButton} from "./photoAction";

type DeleteConfirmProp = {
    onDelete: () => void
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    subTitle: string
}


export const DeleteConfirm = ({onDelete, open, setOpen, title, subTitle}: DeleteConfirmProp) => {
    return (
        <Dialog open={open}
                PaperProps={{sx: {width: 400, borderRadius: 4}}}
                onClose={() => setOpen(false)}>
            <DialogTitle>
                <Stack width={1}>
                    <Typography width={1} align='center' fontWeight="bold" fontSize={20}>
                        {title}
                    </Typography>
                    <Typography width={1} align='center' color="textSecondary">
                        {subTitle}
                    </Typography>
                </Stack>
            </DialogTitle>
            <List dense disablePadding>
                <MenuButton text={"Delete"} color={"red"} onClick={onDelete}/>
                <MenuButton text={"Cancel"} onClick={() => setOpen(false)}/>
            </List>
        </Dialog>
    )
}