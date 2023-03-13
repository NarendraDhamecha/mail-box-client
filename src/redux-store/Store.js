import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import EmailDataSlice from "./EmailDataSlice";

const Store = configureStore({
    reducer : {Auth: AuthSlice, Email: EmailDataSlice}
})

export default Store;