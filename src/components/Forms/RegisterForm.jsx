import React, { useState } from 'react'
import { ThemedCard } from '../Cards'
import ThemedField from '../TextFilelds/ThemedField'
import PasswordField from '../TextFilelds/PasswordField'
import ThemedLoadingButton from '../Buttons/ThemedLoadingButton'
import ThemedButton from '../Buttons/ThemedButton'
import { Box, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material'
import DefaultLink from '../Link/DefaultLink'
import { FacebookIcon, GoogleIcon } from '../../assets/icons'
import ThemedIconButton from '../Buttons/ThemedIconButton'
import { AppRegistrationRounded, LoginRounded } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'


const helperTextObject = {
    fullName: {
        required: "Full Name is Required."
    },
    username: {
        required: "Username is Required",
        pattern: "Min 4 and max 20 charecters, no spaces."
    },
    email: {
        required: "Email is Required.",
        pattern: "Invalid Email Address."
    },
    password: {
        required: "Password is Required.",
        pattern: "Make sure password is 8 Characters long. Atleast 1 Uppercase, 1 Special character, 1 Digit and 2 Lowercase characters."
    },
    confirm_password: {
        required: "Please Retype Password",
        validate: "Password Mismatch."
    }
};

const RegisterForm = () => {

    const [loading, setLoading] = useState(false);

    const handleOnSubmit = ({confirm_password, ...formData}) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log(formData)
        }, 1000);
    }

    const { register, handleSubmit, control, watch, formState } = useForm({
        reValidateMode: 'onChange'
    });

    const { isValid } = formState;

    return (
        <ThemedCard
            elevation={4}
            sx={{
                display: 'flex',
                width: '25em',
                height: 'max-content',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2.5em',
                padding: '2.5em 1em'
            }}
        >
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                style={{
                    width: '100%'
                }}
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
                        render={({ field, fieldState: { error } }) => (
                            <ThemedField
                                {...field}
                                ref={null}
                                name={'fullName'}
                                id='full-name'
                                label="Full Name"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                                helperText={error ? helperTextObject.fullName[error?.type] : ''}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="username"
                        defaultValue={''}
                        rules={{
                            required: true,
                            pattern: /^\S{4,15}$/
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <ThemedField
                                {...field}
                                ref={null}
                                name={'username'}
                                id='username'
                                label="Username"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                                helperText={error ? helperTextObject.username[error?.type] : ''}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        defaultValue={''}
                        rules={{
                            required: true,
                            // eslint-disable-next-line no-useless-escape
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <ThemedField
                                {...field}
                                ref={null}
                                name={'email'}
                                id='email'
                                label="email"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                                helperText={error ? helperTextObject.email[error?.type] : ''}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        defaultValue={''}
                        rules={{
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z]).{8,}$/
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <PasswordField
                                {...field}
                                ref={null}
                                name={'password'}
                                id='user-password'
                                label="Password"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                                helperText={error ? helperTextObject.password[error?.type] : ''}
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
                        render={({ field, fieldState: { error } }) => (
                            <ThemedField
                                {...field}
                                ref={null}
                                name={'confirm_password'}
                                id='confirm-password'
                                label="Confirm Password"
                                size='small'
                                fullWidth
                                error={error !== undefined}
                                helperText={error ? helperTextObject.confirm_password[error?.type] : ''}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={'accept_tc'}
                        id={'accept_tc'}
                        defaultValue={false}
                        label='Accept terms and conditions'
                        rules={{
                            required: true
                        }}
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormControlLabel
                                ref={null}
                                sx={{
                                    marginLeft: '0.1em',
                                    alignSelf: 'flex-start',
                                    gap: '0.5em'
                                }}
                                label={
                                    <Typography
                                        component={'span'}
                                        display={'flex'}
                                        justifyContent="center"
                                        gap={'0.5em'}
                                    >
                                        I accept the
                                        <DefaultLink
                                            to={'/terms-and-conditions'}
                                            underline={true}
                                            newPage={true}
                                            text={'Terms & Conditions'}
                                        />
                                    </Typography>
                                }
                                control={
                                    <Checkbox
                                        {...field}
                                        ref={null}
                                        onChange={onChange}
                                        checked={value}
                                    />
                                }
                            />
                        )}
                    />

                    <ThemedLoadingButton
                        variant='contained'
                        size='large'
                        fullWidth
                        loading={loading}
                        loadingPosition='end'
                        endIcon={<AppRegistrationRounded />}
                        disableElevation
                        type='submit'
                        disabled={!isValid}
                    >
                        Register
                    </ThemedLoadingButton>
                </Box>
            </form>

            <Box
                width={'100%'}
            >
                <Divider orientation='horizontal'>
                    <Typography>or</Typography>
                </Divider>
            </Box>

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
                        icon={<GoogleIcon />}
                        text={'Register with Google'}
                    />
                    <ThemedIconButton
                        varient='outlined'
                        icon={<FacebookIcon />}
                        text={'Register with Facebook'}
                    />
                </Box>
                <Typography variant='body1'>Already a member?</Typography>
                <ThemedButton
                    variant='outlined'
                    fullWidth
                    size='large'
                    endIcon={<LoginRounded />}
                >
                    Log In
                </ThemedButton>
            </Box>
        </ThemedCard>
    )
}

export default RegisterForm;