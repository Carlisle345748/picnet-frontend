import {Avatar as MuiAvatar} from "@mui/material";
import {AvatarProps} from "@mui/material/Avatar/Avatar";
import React from "react";


export const ProfileAvatar = ({src, alt, ...other}: AvatarProps & { component?: React.ElementType, to?: string }) => {
    return (src !== ""
            ? <MuiAvatar src={src} alt={alt} {...other} />
            : <MuiAvatar {...other}>{alt?.slice(0, 1).toUpperCase() ?? ""}</MuiAvatar>
    )
}