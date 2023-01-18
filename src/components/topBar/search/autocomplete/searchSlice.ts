import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../../store/store";

export type SearchState = {
    query: string,
    category: string,
}

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        category: "",
    },
    reducers: {
        setSearch: (state, action: PayloadAction<SearchState>) => {
            state.query = action.payload.query;
            state.category = action.payload.category;
        },
        clearSearch: (state) => {
            state.query = "";
            state.category = "";
        }
    },
})

export const {setSearch, clearSearch} = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
