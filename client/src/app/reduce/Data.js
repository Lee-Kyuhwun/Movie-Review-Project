import {createSlice} from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:"data",
    initialState:{
        value:""
        
    },
    reducers:{
        setData:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const {setData} = dataSlice.actions;//여러개의 객체를 export 가능함
export default dataSlice.reducer;