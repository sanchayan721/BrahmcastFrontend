import { apiSlice } from "../../app/api/apiSlice";
import { moveNext } from "./navigateRegistrationFormSlice";
import {
    initialState,
    clearFormStatus,
    setFormStatus,
    setLoginInfo,
    setUsernameEmail
} from "./registrationSlice";

export const registrationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        checkUsernameEmail: builder.mutation({
            query: (data) => ({
                url: '/register/check-username-email',
                method: 'POST',
                body: { ...data }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUsernameEmail({ ...data }));
                }
                catch (error) { }
            }
        }),

        validateLoginInfo: builder.mutation({
            query: (data) => ({
                url: '/register/validate-login-info',
                method: 'POST',
                body: { ...data }
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { status } = initialState;
                dispatch(clearFormStatus());

                try {
                    const { data } = await queryFulfilled;
                    dispatch(setLoginInfo({ ...data }));
                    dispatch(setFormStatus({
                        ...status,
                        success: true
                    }));
                    dispatch(moveNext());
                }

                catch (error) {

                    const { error: err } = error;

                    if (err?.status && Math.floor(Number(err?.status) / 100) === 4 && err?.data?.property) {
                        console.log(err)
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'userError',
                                ...err?.data
                            }
                        }));
                    }
                    else if (err?.status && Math.floor(Number(err?.status) / 100) === 5 && err?.data) {
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'serverError',
                                ...err?.data
                            }
                        }));
                    }
                    else {
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'serverError',
                                errorMessage: 'Something went Wrong! Please try again.'
                            }
                        }));
                    }
                }
            }
        }),

        resendOTP: builder.mutation({
            query: (data) => ({
                url: '/register/resend-otp',
                method: 'POST',
                body: { ...data }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { status } = initialState;
                try {
                    await queryFulfilled;
                }
                catch (error) {
                    const { error: err } = error;
                    if (err?.status && Math.floor(Number(err?.status) / 100) === 4 && err?.data?.property) {
                        console.log(err)
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'userError',
                                ...err?.data
                            }
                        }));
                    }
                    else if (err?.status && Math.floor(Number(err?.status) / 100) === 5 && err?.data) {
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'serverError',
                                ...err?.data
                            }
                        }));
                    }
                    else {
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'serverError',
                                errorMessage: 'Something went Wrong! Please try again.'
                            }
                        }));
                    }
                }
            }
        }),

        validateOTP: builder.mutation({
            query: (data) => ({
                url: '/register/validate-otp',
                method: 'POST',
                body: { ...data }
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {

                const { status } = initialState;

                try {
                    const { data } = await queryFulfilled;
                    dispatch(setLoginInfo({ ...data }));
                    dispatch(setFormStatus({ ...status, success: true }));
                    /* dispatch(moveNext()); */
                }

                catch (error) {

                    const { error: err } = error;
                    console.log(error)

                    if (err?.status && Math.floor(Number(err?.status) / 100) === 4 && err?.data?.property) {

                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'userError',
                                ...err?.data
                            }
                        }));
                    }
                    else if (err?.status && Math.floor(Number(err?.status) / 100) === 5 && err?.data) {
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'serverError',
                                ...err?.data
                            }
                        }));
                    }
                    else {
                        dispatch(setFormStatus({
                            ...status,
                            error: {
                                type: 'serverError',
                                errorMessage: 'Something went Wrong! Please try again.'
                            }
                        }));
                    }
                }
            }
        }),

        checkFullNamePassword: builder.mutation({
            query: (data) => ({
                url: '/register/check-fullname-password',
                method: 'POST',
                body: { ...data }
            })
        }),

        registration: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: { ...data }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                } catch (error) {

                }
            }
        }),
    })
});

export const {

    useValidateLoginInfoMutation,
    useResendOTPMutation,
    useValidateOTPMutation,
    /* Remove */
    useCheckUsernameEmailMutation,
    useCheckFullNamePasswordMutation,
    useRegistrationMutation,

} = registrationApiSlice;
