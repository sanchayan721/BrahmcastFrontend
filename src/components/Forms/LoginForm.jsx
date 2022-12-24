import { useState, useEffect } from 'react'
import { ThemedCard } from '../Cards'
import ThemedField from '../TextFilelds/ThemedField'
import PasswordField from '../TextFilelds/PasswordField'
import ThemedLoadingButton from '../Buttons/ThemedLoadingButton'
import ThemedButton from '../Buttons/ThemedButton'
import { Box, Divider, Typography } from '@mui/material'
import DefaultLink from '../Link/DefaultLink'
import { FacebookIcon, GoogleIcon } from '../../assets/icons'
import ThemedIconButton from '../Buttons/ThemedIconButton'
import { AppRegistrationRounded, LoginRounded } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { colors } from '../theme/style'

const helperTextObject = {
    email: {
        required: "Username or Email is Required",
        pattern: "Not a Username or Email"
    },
    password: {
        required: "Password is Required",
        pattern: "Wrong Password"
    }
};

const LoginForm = () => {

    const {
        handleSubmit,
        control,
        formState,
        reset,
        setFocus,
        watch
    } = useForm({
        reValidateMode: 'onChange'
    });

    const { isValid } = formState;

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [err, setErr] = useState(null);

    const handleOnSubmit = async (formData) => {
        try {

            const userData = await login({ ...formData }).unwrap();
            console.log(userData);
            dispatch(setCredentials({ ...userData }));
            reset({}, { keepValues: false });

            let from = location.state?.from?.pathname || `/family/${userData?.username}`;
            navigate(from, { replace: true });

        } catch (error) {
            if (error?.status === 400 || 401) {
                setErr(error?.data?.message)
            } else if (error?.status === 401) {
                setErr('Log In Failed!')
            }
        }
    }

    useEffect(() => {
        setFocus('username_email', { shouldSelect: true })
    }, [setFocus]);

    useEffect(() => {
        const subscription = watch((_value, { type }) => {
            err && type.match('change') && setErr(null)
        });
        return () => subscription.unsubscribe();
    }, [err, watch]);

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
                        name="username_email"
                        defaultValue={''}
                        rules={{
                            required: true,
                            pattern: /^\S{4,}$/
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <ThemedField
                                {...field}
                                ref={null}
                                name={'username_email'}
                                id='username__email'
                                label="Unsername or Email"
                                size='small'
                                fullWidth
                                error={error !== undefined || err !== null}
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
                                id="user__password"
                                label="Password"
                                size='small'
                                fullWidth
                                error={error !== undefined || err !== null}
                                helperText={error ? helperTextObject.password[error?.type] : ''}
                            />
                        )}
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

                    <ThemedLoadingButton
                        variant='contained'
                        size='large'
                        fullWidth
                        loading={isLoading}
                        loadingPosition='end'
                        endIcon={<LoginRounded />}
                        disableElevation
                        type='submit'
                        disabled={!isValid}
                    >
                        Log In
                    </ThemedLoadingButton>
                    <DefaultLink
                        to={'/reset-password'}
                        text="Forgot password?"
                    />
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
                        text={'Continue with Google'}
                    />
                    <ThemedIconButton
                        varient='outlined'
                        icon={<FacebookIcon />}
                        text={'Continue with Facebook'}
                    />
                </Box>
                <Typography variant='body1'>Not a member?</Typography>
                <ThemedButton
                    variant='outlined'
                    fullWidth
                    size='large'
                    endIcon={<AppRegistrationRounded />}
                >
                    Register
                </ThemedButton>
            </Box>
        </ThemedCard>
    )
}

export default LoginForm;