import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import authNavigationReducer from '../features/auth/authNavigationSlice';
import registrationReducer from "../features/registration/registrationSlice";
import navigateRegistrationFormReducer from "../features/registration/navigateRegistrationFormSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        authNavigation: authNavigationReducer,
        registration: registrationReducer,
        navigateRegistrationForm: navigateRegistrationFormReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});