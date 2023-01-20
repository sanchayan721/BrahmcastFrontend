import { createSlice } from "@reduxjs/toolkit";

const navigateRegistrationFormSlice = createSlice({
    name: 'navigateRegistrationForm',
    initialState: {
        activeStep: 0,
        totalSteps: 0
    },
    reducers: {

        setTotalSteps: (state, action) => {
            state.totalSteps = action.payload;
        },

        setActiveStep: (state, action) => {
            state.activeStep = action.payload;
        },

        moveNext: (state) => {
            state.activeStep < state.totalSteps - 1 && state.activeStep++;
        },

        movePrevious: (state) => {
            state.activeStep > 0 && state.activeStep--;
        },

        skipNext: (state) => {
            state.activeStep < state.totalSteps - 2 && (state.activeStep = state.activeStep + 2);
        },

        skipPrevious: (state) => {
            state.activeStep > 1 && (state.activeStep = state.activeStep - 2);
        },

        moveToFirst: (state) => {
            state.activeStep = 0;
        },

        moveToLast: (state) => {
            state.activeStep = state.totalSteps - 1;
        }
    },
});

export const {

    setTotalSteps,
    moveNext,
    movePrevious,
    skipNext,
    skipPrevious,
    moveToFirst,
    moveToLast

} = navigateRegistrationFormSlice.actions;

export default navigateRegistrationFormSlice.reducer;

export const selectActiveStep = (state) => state.navigateRegistrationForm.activeStep;
export const selectTotalSteps = (state) => state.navigateRegistrationForm.totalSteps;