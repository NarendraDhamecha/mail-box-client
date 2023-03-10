import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
}

const EmailDataSlice = createSlice({
    name: 'emaildata',
    initialState,
    reducers: {
        setEmail(state, action){
            state.emails = [...action.payload];
        }
    }
})

export const EmailActions = EmailDataSlice.actions;
export default EmailDataSlice.reducer;