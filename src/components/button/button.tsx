import {Button} from "@mui/material";
import {styled} from '@mui/material/styles';
import LoadingButton from "@mui/lab/LoadingButton";


export const StyleButton = styled(Button)(() => ({
    borderRadius: 20,
    backgroundColor: "#e60023",
    textTransform: "none",
    color: "white",
    boxShadow: "none",
    fontWeight: "medium",
    "&:hover": {
        boxShadow: "none",
        backgroundColor: "#ad081b",
    },
}));

export const StyleLoadingButton = styled(LoadingButton)(() => ({
    borderRadius: 20,
    backgroundColor: "#e60023",
    textTransform: "none",
    color: "white",
    boxShadow: "none",
    fontWeight: "medium",
    "&:hover": {
        boxShadow: "none",
        backgroundColor: "#ad081b",
    },
    "&.MuiLoadingButton-root": {
        backgroundColor: "#e60023"
    },
}));