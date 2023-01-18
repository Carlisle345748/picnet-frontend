import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import loginSlice, {LoginState} from "../components/loginRegister/loginSlice";
import searchSlice from "../components/topBar/search/autocomplete/searchSlice";


const store = configureStore({
    reducer: {
        login: persistReducer<LoginState>({key: 'login', version: 1, storage}, loginSlice),
        search: searchSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store);

const pStore = {store, persistor}

export default pStore

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch