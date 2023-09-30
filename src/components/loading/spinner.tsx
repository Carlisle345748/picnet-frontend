import ReactLoading from "react-loading";
import React from "react";
import {useTheme} from "@mui/material";

type SpinnerProp = {
    height?: number
    width?: number
}

export default function Spinner({height, width}: SpinnerProp) {
    const theme = useTheme();
    return <ReactLoading
        type={"spinningBubbles"}
        height={height}
        width={width}
        color={theme.palette.grey['300']}
        delay={100}
    />
}