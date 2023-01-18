import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

export type LoginState = {
    isLoggedIn: boolean,
    user: { id: string } | null
}

const initialState: LoginState = {
    isLoggedIn: false,
    user: null,
}


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    },
})

export const selectLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectLoggedInUser = (state: RootState) => state.login.user;
export const selectLoggedUserId = (state: RootState) => state.login.user?.id;

export const {logout, login} = loginSlice.actions;

export default loginSlice.reducer;