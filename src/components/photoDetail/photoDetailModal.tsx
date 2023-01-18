import {Box, IconButton, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoDetail from "./photoDetail";
import React, {useEffect} from "react";
import {ModalState, SetModal} from "./types";


export const PhotoDetailModal = ({modal, setModal}: {modal: ModalState, setModal: SetModal}) => {
    useEffect(() => {
        if (modal.open) {
            document.body.style.overflowY = "scroll";
            document.body.style.paddingRight = "0px";
            (document.getElementById("appbar") as HTMLElement).style.paddingRight = "0px";
        }
    }, [modal.open])

    return (
        <Modal
            keepMounted
            open={modal.open}
            onClose={() => setModal({open: false, photoId: ""})}
        >
            <Box>
                <IconButton
                    onClick={() => setModal({open: false, photoId: ""})}
                    sx={{position: 'absolute', right: '0%', top: '0%', color: "white"}}
                    children={<CloseIcon/>}
                />
                <PhotoDetail
                    photoId={modal.photoId}
                    setModal={setModal}
                />
            </Box>
        </Modal>
    )
}