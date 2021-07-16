import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
    localId: null | string,
    token: null | string,
    loading: boolean,
    error: null | string,
}

const initialState: IState = {
    localId: null,
    token: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startAuth: (state) => {
            state.loading = true
            state.error = null
        },
        authSuccess: (state, action: PayloadAction<{localId: string, token: string}>) => {
            state.loading = false
            state.localId = action.payload.localId
            state.token = action.payload.token
        },
        authFail: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        logOut: (state) => {
            state.localId = null
            state.token = null
        }
    }
})

export const {startAuth, authSuccess, authFail, logOut} = authSlice.actions
export default authSlice.reducer