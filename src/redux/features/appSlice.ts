import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    currentBoardName: ""
};

export const features = createSlice({
    name: "features",
    initialState,
    reducers: {
        setPageTitle: (state, action: PayloadAction<string>) => {
            state.currentBoardName = action.payload;
        }
    }
});

export const { setPageTitle } = features.actions;
export const getPageTitle = (state: RootState) =>
    state.features.currentBoardName;
export default features.reducer;
