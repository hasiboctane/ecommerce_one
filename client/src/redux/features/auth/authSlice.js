import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
            localStorage.setItem('expirationTime', expirationTime);
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
            // localStorage.removeItem('userInfo');
            // localStorage.removeItem('expirationTime');
        },
    },
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer