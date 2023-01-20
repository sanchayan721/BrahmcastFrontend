import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Typography,
    Fade
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import {
    selectCurrentLoginInfo,
    selectCurrentStatus,
    setVerificationStatus
} from '../../../features/registration/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    EMAIL_PATTERN,
    PASSWORD_PATTERN,
    USERNAME_PATTERN
} from '../../../utils/patterns';
import ThemedField from '../../TextFilelds/ThemedField';
import PasswordField from '../../TextFilelds/PasswordField';
import PhoneNumberField from '../../TextFilelds/PhoneNumberField';
import ThemedIconButton from '../../Buttons/ThemedIconButton';
import { FacebookIcon, GoogleIcon } from '../../../assets/icons';
import ThemedLoadingButton from '../../Buttons/ThemedLoadingButton';
import { AppRegistrationRounded, ArrowForwardRounded } from '@mui/icons-material';
import { useValidateLoginInfoMutation } from '../../../features/registration/registrationApiSlice';
import { colors } from '../../theme/style';
import parsePhoneNumber from 'libphonenumber-js';
import CollapsableError from '../../TextFilelds/CollapsableError';
import { NotVerifiedBadge, VerifiedBadge } from '../../VerificationBadge';


const helperTextObject = {
    username: {
        required: "Username is Required",
        pattern: "Min 4 and max 30 charecters, no spaces. ( _  -  .  @ are allowed )"
    },
    email: {
        required: "Email is Required.",
        pattern: "Invalid Email Address."
    },
    password: {
        required: "Password is Required.",
        pattern: "Make sure password is 8 Characters long. Atleast 1 Uppercase, 1 Special character, 1 Digit and 2 Lowercase characters."
    },
    mobile: {
        required: "Mobile number is Required.",
        validation: "Invalid mobile number."
    }
};

const LoginInfo = () => {

    const dispatch = useDispatch();

    const currentLoginInfo = useSelector(selectCurrentLoginInfo);
    const {
        handleSubmit,
        control,
        watch,
        formState: { isValid, errors },
        setError,
        clearErrors
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            'username': currentLoginInfo.username,
            'email': currentLoginInfo.email,
            'password': currentLoginInfo.password,
            'mobile.mobileNo':
                currentLoginInfo.mobile?.extension
                + currentLoginInfo.mobile?.mobileNo,
            'otp_verification': currentLoginInfo.otp_verification,
        }
    });

    const [emailBadge, setEmailBadge] = useState((<></>));
    const [mobileBadge, setMobileBadge] = useState((<></>));


    const [err, setErr] = useState('');
    const [showNext, setShowNext] = useState(false);

    useEffect(() => {

        const onTypeActions = () => {
            setShowNext(true);
            setErr('');
            clearErrors('otpType');
            clearErrors('otp_verification');
        };

        currentLoginInfo.username
            && currentLoginInfo.email?.emailId
            && currentLoginInfo.password
            && onTypeActions();

        const subscription = watch((value) => {
            value
                && value?.username
                && value?.email?.emailId
                && value?.password
                && value?.otp_verification
                && onTypeActions();
        });

        return () => subscription.unsubscribe();
    },
        [
            clearErrors,
            currentLoginInfo.email?.emailId,
            currentLoginInfo.password,
            currentLoginInfo.username,
            watch
        ]
    );

    const [validateLoginInfo, { isLoading }] = useValidateLoginInfoMutation();

    const handleOnNext = ({ ...formData }) => {
        const mobileNumberWithExtension = parsePhoneNumber(formData.mobile?.mobileNo);

        if (!mobileNumberWithExtension) {
            setError('mobile.mobileNo', { type: 'required' }, { shouldFocus: true })
            return;
        };

        if (!mobileNumberWithExtension.isValid()) {
            setError('mobile.mobileNo', { type: 'validation' }, { shouldFocus: true })
            return;
        };

        validateLoginInfo({
            username: formData.username,
            email: formData.email,
            mobile: {
                ...currentLoginInfo?.mobile,
                extension: `+${mobileNumberWithExtension.countryCallingCode}`,
                mobileNo: mobileNumberWithExtension.nationalNumber
            },
            password: formData.password,
            otp_verification: formData.otp_verification
        });
    };

    const currentStatus = useSelector(selectCurrentStatus);
    useEffect(() => {
        const { error } = currentStatus;

        if (error.type === 'userError') {
            setError(error?.property, { ...error }, { shouldFocus: true });

            let errorType = String(error?.property).split('.')[0];
            errorType === 'otpType' && setError('otp_verification', { ...error });
        }

        else {
            setErr(error?.errorMessage)
        }
    },
        [
            currentStatus,
            setError
        ]
    );

    useEffect(() => {
        const removeErr = () => setErr('');
        window.addEventListener("click", removeErr);
        return () => window.removeEventListener("click", removeErr);
    }, []);

    const [verifiedInformation, setVerifiedInformation] = useState({});

    useEffect(() => {
        setVerifiedInformation({
            email: currentLoginInfo.email.emailId,
            mobile: currentLoginInfo.mobile.mobileNo
        })
    }, [])

    // Handelling Verification Of a New Number and/or Email
    const [disableVerifyCheck, setDisableVerifyCheck] = useState(false);
    useEffect(() => {
        const subscription = watch((value) => {

            /* Chenging the Verification Badge when the phone number and email changes */
            let mobileNumberWithExtension = parsePhoneNumber(value?.mobile?.mobileNo);

            let sameEmail = currentLoginInfo?.email?.verified && value?.email?.emailId === currentLoginInfo.email.emailId;
            let sameMobile = currentLoginInfo?.mobile?.verified && mobileNumberWithExtension?.nationalNumber === currentLoginInfo.mobile.mobileNo;

            sameEmail
                ? dispatch(setVerificationStatus({ email_status: true }))
                : dispatch(setVerificationStatus({ email_status: false }));

            sameMobile
                ? dispatch(setVerificationStatus({ mobile_status: true }))
                : dispatch(setVerificationStatus({ mobile_status: false }));

            sameEmail && sameMobile ? setDisableVerifyCheck(true) : setDisableVerifyCheck(false);
        });

        return () => subscription.unsubscribe();
    },
        [
            currentLoginInfo.email.emailId,
            currentLoginInfo.email?.verified,
            currentLoginInfo.mobile.mobileNo,
            currentLoginInfo.mobile?.verified,
            dispatch,
            watch
        ]
    );

    /* Showing the verification Badge When Component Loads*/
    useEffect(() => {
        if (currentLoginInfo?.email?.emailId === '' && currentLoginInfo?.mobile?.mobileNo === '') return;

        currentLoginInfo.email?.verified ? setEmailBadge(<VerifiedBadge />) : setEmailBadge(<NotVerifiedBadge />);
        currentLoginInfo.mobile?.verified ? setMobileBadge(<VerifiedBadge />) : setMobileBadge(<NotVerifiedBadge />);

    },
        [
            currentLoginInfo.email?.emailId,
            currentLoginInfo.email?.verified,
            currentLoginInfo.mobile?.mobileNo,
            currentLoginInfo.mobile?.verified
        ]
    );

    return (
        <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit(handleOnNext)}
        >
            <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'0.5em'}
            >
                <Typography
                    variant='body1'
                    alignSelf={'flex-start'}
                    lineHeight={'1em'}
                    marginBottom={'0.5em'}
                >
                    Login Info
                </Typography>

                {/* Username */}
                <Controller
                    control={control}
                    name="username"
                    defaultValue={''}
                    rules={{
                        required: true,
                        pattern: USERNAME_PATTERN
                    }}
                    render={({ field, fieldState: { error } }) => {
                        return (
                            <>
                                <ThemedField
                                    {...field}
                                    ref={null}
                                    name={'username'}
                                    label="Username"
                                    size='small'
                                    fullWidth
                                    error={error !== undefined}
                                />
                                <CollapsableError growCondition={error !== undefined}>
                                    {
                                        error
                                            ? error?.type === 'userError'
                                                ? error?.errorMessage
                                                : helperTextObject.username[error?.type]
                                            : ''
                                    }
                                </CollapsableError>
                            </>
                        )
                    }}
                />

                {/* Email */}
                <Controller
                    control={control}
                    name="email.emailId"
                    defaultValue={''}
                    rules={{
                        required: true,
                        pattern: EMAIL_PATTERN
                    }}
                    render={({ field, fieldState: { error } }) => {
                        return (
                            <>
                                <ThemedField
                                    {...field}
                                    ref={null}
                                    name={'email'}
                                    label="email"
                                    size='small'
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (emailBadge)
                                    }}
                                    error={error !== undefined}
                                />
                                <CollapsableError growCondition={error !== undefined}>
                                    {
                                        error
                                            ? error?.type === 'userError'
                                                ? error?.errorMessage
                                                : helperTextObject.email[error?.type]
                                            : ''
                                    }
                                </CollapsableError>
                            </>
                        )
                    }}
                />

                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    defaultValue={''}
                    rules={{
                        required: true,
                        pattern: PASSWORD_PATTERN
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <PasswordField
                                {...field}
                                ref={null}
                                name={'password'}
                                label="Password"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                            />
                            <CollapsableError growCondition={error !== undefined}>
                                {
                                    error
                                        ? error?.type === 'userError'
                                            ? error?.errorMessage
                                            : helperTextObject.password[error?.type]
                                        : ''
                                }
                            </CollapsableError>
                        </>
                    )}
                />

                {/* Phone Number */}
                <Controller
                    control={control}
                    name={"mobile.mobileNo"}
                    id={"mobile"}
                    rules={{ required: true }}
                    label={"Mobile Number"}
                    render={({ field, fieldState: { error } }) => {
                        return (
                            <>
                                <PhoneNumberField
                                    {...field}
                                    ref={null}
                                    name={'mobile'}
                                    label="Mobile Number"
                                    error={error !== undefined}
                                    dropdownClass={'mobile-dropdown'}
                                    InputProps={{
                                        endAdornment: (mobileBadge)
                                    }}
                                />
                                <CollapsableError growCondition={error !== undefined}>
                                    {
                                        error
                                            ? error?.type === 'userError'
                                                ? error?.errorMessage
                                                : helperTextObject.mobile[error?.type]
                                            : ''
                                    }
                                </CollapsableError>
                            </>
                        )
                    }}
                />

                {/* Verify With OTP */}
                <Controller
                    control={control}
                    name={'otp_verification'}
                    id={'otp_verification'}
                    label='Verify email or both email and mobile number.'
                    render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
                        return (
                            <>
                                <FormControlLabel
                                    ref={null}
                                    sx={{
                                        alignSelf: 'flex-start',
                                        height: '1em',
                                        marginLeft: '0.1em',
                                        marginTop: '0.5em'
                                    }}
                                    label={
                                        <Typography
                                            component={'span'}
                                            noWrap
                                            color={disableVerifyCheck && colors.muted}
                                        >
                                            Verify with OTP
                                        </Typography>
                                    }
                                    control={
                                        <Checkbox
                                            {...field}
                                            ref={null}
                                            onChange={onChange}
                                            checked={!!value}
                                            color={'primary'}
                                            disabled={disableVerifyCheck}
                                        />
                                    }
                                />
                                <CollapsableError growCondition={error !== undefined}>
                                    {
                                        error?.type === 'userError'
                                            ? error?.errorMessage
                                            : ''
                                    }
                                </CollapsableError>
                            </>
                        )
                    }}
                />
            </Box>

            <Box
                width={'100%'}
                marginY={'0.8em'}
            >
                <Divider orientation='horizontal'>
                    <Typography>or</Typography>
                </Divider>
            </Box>

            {/* Social Buttons */}
            <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'1.5em'}
            >
                <Box
                    width={'16em'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'1em'}
                >
                    <ThemedIconButton
                        varient='outlined'
                        icon={<GoogleIcon style={{ height: '1.5em', width: '1.5em' }} />}
                        text={'Register with Google'}
                    />
                    <ThemedIconButton
                        varient='outlined'
                        icon={<FacebookIcon style={{ height: '1.5em', width: '1.5em' }} />}
                        text={'Register with Facebook'}
                    />
                </Box>

                {/* Other Errors */}
                <Fade in={err?.length > 0} unmountOnExit>
                    <Box
                        width={'24em'}
                        height={'5em'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        position={'absolute'}
                        sx={{
                            transform: 'translateY(0.8em)',
                            background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,254,254,1) 60%, rgba(255,255,255,0) 100%)'
                        }}
                    >
                        <Typography variant='body1' color={colors.danger}>
                            {err}
                        </Typography>
                    </Box>
                </Fade>

                {/* Submit Button */}
                <ThemedLoadingButton
                    variant='contained'
                    size='large'
                    fullWidth
                    loading={isLoading}
                    loadingPosition='end'
                    endIcon={showNext ? <ArrowForwardRounded /> : <AppRegistrationRounded />}
                    disableElevation
                    type='submit'
                    disabled={Object.keys(errors).length === 0 ? false : !isValid}
                >
                    {showNext ? 'Next' : 'Register'}
                </ThemedLoadingButton>
            </Box>

        </form>
    )
};

export default LoginInfo;