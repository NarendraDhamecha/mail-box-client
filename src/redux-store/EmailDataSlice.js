import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
    sentBox: [],
    emailMsg: null,
    showFullEmail: false
}

const EmailDataSlice = createSlice({
    name: 'emaildata',
    initialState,
    reducers: {
        setEmail(state, action){
            state.emails = [...action.payload];
        },

        setReadMsg(state, action){
            state.emails[action.payload].read = true;
        },

        setSingleEmail(state, action){
            state.emails = [...state.emails, action.payload]
        },

        setEmailMsg(state, action){
            state.emailMsg = action.payload;
        },

        setShowFullEmail(state) {
            state.showFullEmail = !state.showFullEmail
        },
        
        setSentBoxEmails(state, action){
            state.sentBox = [...action.payload];
        }
    }
})

export const EmailActions = EmailDataSlice.actions;
export default EmailDataSlice.reducer;