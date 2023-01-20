import { Box, Fade, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonLink, TimeOutLink } from '../../Link/DefaultLink'
import { colors } from '../../theme/style'
import OtpInputField from '../../TextFilelds/OtpInputField'
import FormNavigation from '../../FormNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { movePrevious } from '../../../features/registration/navigateRegistrationFormSlice'
import { OTP } from '../../../utils/patterns'
import CollapsableError from '../../TextFilelds/CollapsableError'
import { useResendOTPMutation, useValidateOTPMutation } from '../../../features/registration/registrationApiSlice'
import { clearFormStatus, selectCurrentLoginInfo, selectCurrentStatus } from '../../../features/registration/registrationSlice'
import { obscureEmail, obscurePhone } from '../../../utils/obscure'
import Countdown from '../../Countdown'


const timerData = 10; // In Minutes
const buttonTimeout = 10; // Seconds

const VerifyOTP = () => {

    const helperTextObject = {
        email_otp: {
            required: "Email OTP is Required.",
            pattern: "Wrong OTP"
        },
        mobile_otp: {
            required: "Mobile OTP is Required",
            pattern: "Wrong OTP"
        }
    }

    const {
        username,
        email,
        mobile,
        verify
    } = useSelector(selectCurrentLoginInfo);

    const {
        handleSubmit,
        control,
        watch,
        formState: { isValid, errors },
        setError,
    } = useForm({
        reValidateMode: 'onChange',
    });

    const [resendOTP] = useResendOTPMutation();
    const [otpTimeOut, setOtpTimeOut] = useState({ email: false, mobile: false });

    const handleResend = {
        async email() {

            resendOTP({
                username,
                email,
                mobile,
                verify,
                otpType: 'email'
            });

            setOtpTimeOut({ ...otpTimeOut, email: !otpTimeOut.email })
        },
        async mobile() {

            resendOTP({
                username,
                email,
                mobile,
                verify,
                otpType: 'mobile'
            });

            setOtpTimeOut({ ...otpTimeOut, mobile: !otpTimeOut.mobile });
        }
    };

    const [validateOTP, { isLoading }] = useValidateOTPMutation();

    const handleOnNext = ({ ...formdata }) => {
        validateOTP(
            {
                ...formdata,
                username,
                email,
                mobile,
                verify
            }
        );
    };

    const dispatch = useDispatch();
    const handleBackClick = () => {
        dispatch(clearFormStatus());
        dispatch(movePrevious());
    };


    const currentStatus = useSelector(selectCurrentStatus);
    const [err, setErr] = useState('');

    useEffect(() => {
        const { error } = currentStatus;

        if (error.type === 'userError') {
            setError(error?.property, { ...error }, { shouldFocus: true });
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

    return (
        <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit(handleOnNext)}
        >
            <Box
                width={'100%'}
                minHeight={'30em'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={'3em'}
            >
                <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={'0.5em'}
                >
                    {/* Email OTP */}
                    <Typography
                        variant='body1'
                        alignSelf={'flex-start'}
                        lineHeight={'1em'}
                    >
                        Email OTP
                    </Typography>
                    <Box
                        component={'span'}
                        alignSelf={'flex-start'}
                        display={'flex'}
                        gap={'0.5em'}
                        lineHeight={'1em'}
                        marginBottom={'0.5em'}
                    >
                        <Typography
                            fontWeight={'medium'}
                            fontSize={'0.8em'}
                            color={colors.muted}
                        >
                            Sent to:
                        </Typography>
                        <Typography
                            fontSize={'0.8em'}
                            color={colors.muted}
                        >
                            {
                                obscureEmail(email?.emailId, 3)
                            }
                        </Typography>
                    </Box>
                    <Controller
                        control={control}
                        name={'email_otp'}
                        label='Enter Email OTP.'
                        rules={{
                            required: true,
                            pattern: OTP
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <>
                                    <OtpInputField
                                        {...field}
                                        ref={null}
                                        name={'email_otp'}

                                    />
                                    <CollapsableError
                                        growCondition={error !== undefined}
                                        padding={'0.5em 0.05em'}
                                    >
                                        {
                                            error
                                                ? error?.type === 'userError'
                                                    ? error?.errorMessage
                                                    : helperTextObject.email_otp[error?.type]
                                                : ''
                                        }
                                    </CollapsableError>
                                </>
                            )
                        }}
                    />
                    <Box
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <TimeOutLink
                            type={'button'}
                            text={'Resend OTP'}
                            alignSelf={'flex-start'}
                            color={colors.link__primary}
                            onClick={handleResend.email}
                            timeOutSeconds={10}
                        />
                        <Countdown initialMinute={timerData} trigger={otpTimeOut.email} />
                    </Box>
                </Box>

                {/* Mobile OTP */}
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
                    >
                        Mobile OTP
                    </Typography>
                    <Box
                        component={'span'}
                        alignSelf={'flex-start'}
                        display={'flex'}
                        gap={'0.5em'}
                        lineHeight={'1em'}
                        marginBottom={'0.5em'}
                    >
                        <Typography
                            fontWeight={'medium'}
                            fontSize={'0.8em'}
                            color={colors.muted}
                        >
                            Sent to:
                        </Typography>
                        <Typography
                            fontSize={'0.8em'}
                            color={colors.muted}
                        >
                            {
                                obscurePhone(mobile?.extension, mobile?.mobileNo, 7)
                            }
                        </Typography>
                    </Box>
                    <Controller
                        control={control}
                        name={'mobile_otp'}
                        label='Enter Mobile OTP.'
                        rules={{
                            required: true,
                            pattern: OTP
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <>
                                    <OtpInputField
                                        {...field}
                                        ref={null}
                                        name={'mobile_otp'}
                                    />
                                    <CollapsableError
                                        growCondition={error !== undefined}
                                        padding={'0.5em 0.05em'}
                                    >
                                        {
                                            error
                                                ? error?.type === 'userError'
                                                    ? error?.errorMessage
                                                    : helperTextObject.mobile_otp[error?.type]
                                                : ''
                                        }
                                    </CollapsableError>
                                </>
                            )
                        }}
                    />
                    <Box
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <TimeOutLink
                            type={'button'}
                            text={'Resend OTP'}
                            alignSelf={'flex-start'}
                            color={colors.link__primary}
                            onClick={handleResend.email}
                            timeOutSeconds={buttonTimeout}
                        />
                        <Countdown initialMinute={timerData} trigger={otpTimeOut.mobile} />
                    </Box>
                </Box>
                <Box
                    width={'100%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={'2em'}
                    marginTop={'auto'}
                >
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

                    <FormNavigation
                        buttonPreviousCLick={handleBackClick}
                        buttonNextDisable={Object.keys(errors).length === 0 ? false : !isValid}
                        isLoading={isLoading}
                    />
                </Box>
            </Box>
        </form >
    )
}

export default VerifyOTP;