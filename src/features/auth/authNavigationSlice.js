import { createSlice } from "@reduxjs/toolkit";
import { formTypes } from "../../utils/formTypes";

const authNavigationSlice = createSlice({
    name: 'authNavigation',
    initialState: {
        activeStep: formTypes[formTypes.length - 1].name,
        totalSteps: formTypes.length
    },
    reducers: {
        setActiveAuthStep: (state, action) => {
            state.activeStep = action.payload.activeStep;
        }
    }
});

export default authNavigationSlice.reducer;
export const { setActiveAuthStep } = authNavigationSlice.actions;
export const selectCurrentAuthStep = (state) => state.authNavigation.activeStep;