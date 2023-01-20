import { createSlice } from "@reduxjs/toolkit";
import { ACCOUNT_TYPES } from "../../utils/accountTypes";

export const initialState = {
    'username': '',
    'email': {
        'emailId': '',
        'verified': false
    },
    'password': '',
    'mobile': {
        'extension': '',
        'mobileNo': '',
        'verified': false
    },
    'otp_verification': false,
    'verify': {
        'email': false,
        'mobile': false
    },

    'fullName': '',
    'dob': '',
    'gender': '',
    'keep_gender_anonymous': '',


    'account_type': ACCOUNT_TYPES.Creator,
    'accept_tc': false,

    'status': {
        'submitted': false,
        'success': false,
        'error': {}
    },
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState: { ...initialState },
    reducers: {
        /* Remove */
        setUsernameEmail: (state, action) => {
            const { username, email, accept_tc } = action.payload;
            state.username = username;
            state.email = email;
            state.accept_tc = accept_tc;
        },

        setLoginInfo: (state, action) => {
            const { username, email, password, mobile, otp_verification, verify } = action.payload;
            state.username = username;
            state.email = email;
            state.password = password;
            state.mobile = { ...mobile };
            state.otp_verification = otp_verification;
            state.verify = { ...verify };
        },

        setVerificationStatus: function (state, action) {
            if(Object.keys(action.payload).includes('email_status')){
                state.email.verified = action.payload.email_status;
                state.verify.email = !action.payload.email_status;
            }
            if(Object.keys(action.payload).includes('mobile_status')){
                state.mobile.verified = action.payload.mobile_status;
                state.verify.email = !action.payload.mobile_status;
            }
            if(state.email.verified && state.mobile.verified) {
                state.otp_verification = false;
            }
        },

        setAccountType: function (state, action) {
            state.account_type = action.payload.account_type;
        },

        setFullNamePassword: (state, action) => {
            const { fullName, password } = action.payload;
            state.fullName = fullName;
            state.password = password;
        },

        setFormStatus: (state, action) => {
            state.status = { ...action.payload };
        },

        clearFormStatus: (state) => {
            state.status = initialState.status;
        },

        cleareRegistration: (state) => {
            state.username = initialState.username;
            state.email = initialState.email;
            state.fullName = initialState.fullName;
            state.password = initialState.password;
            state.accept_tc = initialState.accept_tc;
            state.status = initialState.status
        },
    }
});

export const {
    /* Remove */
    setUsernameEmail,

    setLoginInfo,
    setVerificationStatus,
    setAccountType,

    /* remove */
    setFullNamePassword,
    setFormStatus,
    clearFormStatus,
    cleareRegistration
} = registrationSlice.actions;

export default registrationSlice.reducer;

export const selectCurrentLoginInfo = (state) => ({
    username: state.registration.username,
    email: state.registration.email,
    password: state.registration.password,
    mobile: state.registration.mobile,
    verify: state.registration.verify,
    otp_verification: state.registration.otp_verification
});

export const selectCurrentUserInfo = (state) => ({
    fullName: state.registration.fullName,
    dob: state.registration.dob,
    gender: state.registration.gender,
    keep_gender_anonymous: state.registration.keep_gender_anonymous
});

export const selectCurrentAccountType = (state) => state.registration.account_type;

export const selectCurrentStatus = (state) => state.registration.status;

export const selectCurrentUserName = (state) => state.registration.username;
export const selectCurrentEmail = (state) => state.registration.email;
export const selectCurrentPassword = (state) => state.registration.password;
export const selectCurrentMobile = (state) => state.registration.mobile;
export const selectCurrentVerifyOTP = (state) => state.registration.otp_verification;
export const selectCurrentFullName = (state) => state.registration.fullName;
export const selectCurrentAcceptTC = (state) => state.registration.accept_tc;