import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    doctorProfiles:{}
}

const doctorProfileSlice = createSlice({
    name:"doctorProfile",
    initialState,
    reducers:{

    }
})

export default doctorProfileSlice.reducer;