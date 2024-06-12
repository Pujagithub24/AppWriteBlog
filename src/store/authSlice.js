import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //abhi user bydefault authenticated nhi hai
    status : false,
    //no userdata we have now
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
                //reducers mai jo bhi hote hai unke pass state aur action ka access hota hai
        //action -> se payload milta hai
        //state se jo bhi value update karni hai voh initial state ke baad iss tarah se
        // track mai update ho jaati hai 
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;
 //authSlice se reducer ko export karna hai
export default authSlice.reducer;



