import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useCheckFullNamePasswordMutation } from '../features/registration/registrationApiSlice';
import { Box } from '@mui/system';
import ThemedField from '../components/TextFilelds/ThemedField';
import PasswordField from '../components/TextFilelds/PasswordField';
import { ButtonGroup, TextField, Typography } from '@mui/material';
import { colors } from '../components/theme/style';
import ThemedLoadingButton from '../components/Buttons/ThemedLoadingButton';
import { AppRegistrationRounded, ArrowBackRounded } from '@mui/icons-material';
import { PASSWORD_PATTERN } from '../utils/patterns';
import { useDispatch, useSelector } from 'react-redux';
import { movePrevious } from '../features/registration/navigateRegistrationFormSlice';
import { selectCurrentFullName, selectCurrentPassword, setFullNamePassword } from '../features/registration/registrationSlice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DATE_FORMAT, maximumAgeBar, minimumAgeBar } from '../utils/dateHelper';



const helperTextObject = {
    fullName: {
        required: "Full Name is Required."
    },
    password: {
        required: "Password is Required.",
        pattern: "Make sure password is 8 Characters long. Atleast 1 Uppercase, 1 Special character, 1 Digit and 2 Lowercase characters."
    },
    confirm_password: {
        required: "Please Retype Password",
        validate: "Password Mismatch."
    },
    dob: {
        required: "Date of Birth is Required."
    }
};


const UserDetails = () => {

    const currentFullName = useSelector(selectCurrentFullName);
    const currentPassword = useSelector(selectCurrentPassword);

    const {
        register,
        getValues,
        handleSubmit,
        control,
        watch,
        formState: { isValid, errors },
        setError,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            'fullName': currentFullName,
            'password': currentPassword,
            'dob': dayjs(minimumAgeBar()).format(DATE_FORMAT)
        }
    });

    const [checkFullNamePassword, { isLoading }] = useCheckFullNamePasswordMutation();
    const [err, setErr] = useState(null);

    const handleOnNext = async ({ ...formData }) => {
        try {
            console.log(formData)
            //await checkFullNamePassword({ ...formData }).unwrap();
        } catch (error) {
            if (error?.status && Math.floor(Number(error?.status) / 100) === 4 && error?.data?.message) {
                let property = error?.data?.message?.property;
                let errorMessage = error?.data?.message?.errorMessage;

                setError(property, {
                    type: 'fromServer',
                    message: errorMessage
                })
            }
            else if (error?.status === 500 && error?.data?.message) {
                setErr(error?.message?.errorMessage);
            }
            else {
                setErr('Something went Wrong! Please try again.');
            }
        }
    };

    const dispatch = useDispatch();
    const handleBackClick = () => {
        const values = getValues();
        dispatch(setFullNamePassword({ ...values }));
        dispatch(movePrevious());
    }

    return (
        <Box
            width={'100%'}
            display={'flex'}
            flexDirection="column"
            alignItems={'center'}
            gap={'1.5em'}
            padding={'1.5em 1em 1.5em 1em'}
        >
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
                    gap={'1.5em'}
                >
                    <Controller
                        control={control}
                        name="fullName"
                        defaultValue={''}
                        rules={{
                            required: true
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <ThemedField
                                    {...field}
                                    ref={null}
                                    name={'fullName'}
                                    label="Full Name"
                                    size='small'
                                    fullWidth
                                    error={error !== undefined}
                                    helperText={error ? helperTextObject.fullName[error?.type] : ''}
                                />
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="password"
                        defaultValue={''}
                        rules={{
                            required: true,
                            pattern: PASSWORD_PATTERN
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <PasswordField
                                {...field}
                                ref={null}
                                name={'password'}
                                label="Password"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                                helperText={
                                    error
                                        ? error?.type === 'fromServer'
                                            ? error?.message
                                            : helperTextObject.password[error?.type]
                                        : ''
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        id={'confirm_password'}
                        defaultValue={''}
                        {...register("confirm_password", {
                            required: true,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return false;
                                }
                            },
                        })}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <ThemedField
                                    {...field}
                                    ref={null}
                                    name={'confirm_password'}
                                    label="Confirm Password"
                                    size='small'
                                    fullWidth
                                    error={error !== undefined}
                                    helperText={error ? helperTextObject.confirm_password[error?.type] : ''}
                                />
                            )
                        }}
                    />

                    <Controller
                        name={'dob'}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                            return (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DesktopDatePicker
                                        disableMaskedInput
                                        label={'Date of Birth'}
                                        control={control}
                                        inputFormat={DATE_FORMAT}
                                        value={value}
                                        minDate={maximumAgeBar()}
                                        maxDate={minimumAgeBar()}
                                        onChange={(event) => {
                                            onChange(dayjs(event).format(DATE_FORMAT));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size='small'
                                                error={error !== undefined}
                                                helperText={error ? helperTextObject.dob[error?.type] : ''}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )
                        }}
                    />

                    {
                        err
                        && <Box
                            width={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Typography variant='body1' color={colors.danger}>
                                {err}
                            </Typography>
                        </Box>
                    }
                    <ButtonGroup
                        fullWidth
                        disableElevation
                        variant="contained"
                        size='large'
                        sx={{ borderRadius: '2em' }}
                        aria-label="action button group"
                    >
                        <ThemedLoadingButton
                            variant='contained'
                            fullWidth
                            loading={isLoading}
                            loadingPosition='start'
                            startIcon={<ArrowBackRounded />}
                            disableElevation
                            onClick={handleBackClick}
                        >
                            Go Back
                        </ThemedLoadingButton>
                        <ThemedLoadingButton
                            variant='contained'
                            fullWidth
                            loading={isLoading}
                            loadingPosition='end'
                            endIcon={<AppRegistrationRounded />}
                            disableElevation
                            type='submit'
                            disabled={Object.keys(errors).length === 0 ? false : !isValid}
                        >
                            Register
                        </ThemedLoadingButton>
                    </ButtonGroup>
                </Box>
            </form>
        </Box>
    )
}

export default UserDetails;