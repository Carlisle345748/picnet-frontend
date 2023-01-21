import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {UserPanel} from "./userPanel";
import {PhotoPanel} from "./photoPanel";
import {Stack, Tab, Tabs} from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const categoryToValue = new Map([
    ["photo", 0],
    ["user", 1],
]);

const valueToCategory = new Map([
    [0, "photo"],
    [1, "user"],
])


export default function SearchResult() {
    const [param, setParam] = useSearchParams();
    const [value, setValue] = useState<number>(categoryToValue.get(param.get("category") ?? "") ?? -1);
    const handleChange = async (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setParam((prev) => {
            prev.set("category", valueToCategory.get(newValue) ?? "");
            return prev;
        })
    };


    return (
        <Stack justifyContent="center" alignItems="center" spacing={2} width="100%">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon tabs example"
                TabIndicatorProps={{sx: {bgcolor: "#464646"}}}
                textColor="inherit"
                sx={{
                    ".MuiTab-textColorInherit": {
                        color: "#464646"
                    }
                }}
            >
                <Tab icon={<PhotoIcon/>} aria-label="phone"/>
                <Tab icon={<AccountCircleIcon/>} aria-label="person"/>
            </Tabs>
            {value === 0 && <PhotoPanel/>}
            {value === 1 && <UserPanel/>}
        </Stack>
    )
}