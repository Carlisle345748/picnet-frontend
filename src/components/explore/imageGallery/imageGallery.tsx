import {Box, BoxProps} from "@mui/material";
import React from "react"


export function Gallery({children}: BoxProps) {
    return (
        <Box
            sx={{
                m: 0,
                overflowX: 'none',
                p: 0,
                width: '100%',
                position: 'absolute',
                top: 100,
                left: '50%',
                transform: "translateX(-50%)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 252px)",
                gridAutoRows: "1px",
                justifyContent: "center",
                minWidth: '540px'
            }}
        >
            {children}
        </Box>
    )
}


export function ImagePin({children, size, ...other}: BoxProps & { size: number }) {
    return (
        <Box
            sx={{
                px: '8px',
                pb: '16px',
                borderRadius: "16px",
                gridRowEnd: `span ${size}`,
                "&:hover": {
                    cursor: "pointer"
                }
            }}
            {...other}
        >
            {children}
        </Box>
    )
}
