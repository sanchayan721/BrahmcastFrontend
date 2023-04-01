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
import { colors, speed } from '../theme/style'
import { PASSWORD_PATTERN, USERNAME_OR_EMAIL_PATTERN } from '../../utils/patterns'
import { useSwiper } from 'swiper/react'

const helperTextObject = {
    username_email: {
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
        formState: { isValid, errors },
        reset,
        setFocus,
        watch
    } = useForm({
        reValidateMode: 'onChange'
    });

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
            err && type.match('change') && setErr(null);
        });
        return () => subscription.unsubscribe();
    }, [err, watch]);

    const swiper = useSwiper();

    return (
        <ThemedCard
            elevation={6}
            sx={{
                display: 'flex',
                width: '25em',
                height: 'max-content',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0'
            }}
        >
            <Box
                width="100%"
                display={'flex'}
                flexDirection='column'
                padding={'1em'}
            >
                <Typography varient="h3" color={'primary'} fontSize={'1.5em'} fontWeight={'bold'}>Log In</Typography>
                <Typography lineHeight={'1.256em'} fontWeight={'medium'}>Resume your journey</Typography>
            </Box>
            <Box width={'100%'}>
                <Divider orientation='horizontal' />
            </Box>
            <Box
                width={'100%'}
                display={'flex'}
                flexDirection="column"
                alignItems={'center'}
                gap={'2em'}
                padding={'1.6em 1em 1.5em 1em'}
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
                        gap={'1.2em'}
                    >
                        <Controller
                            control={control}
                            name="username_email"
                            defaultValue={''}
                            rules={{
                                required: true,
                                pattern: USERNAME_OR_EMAIL_PATTERN
                            }}
                            render={({ field, fieldState: { error } }) => {
                                return (
                                    <ThemedField
                                        {...field}
                                        ref={null}
                                        name={'username_email'}
                                        id='username__email'
                                        label="Unsername or Email"
                                        size='small'
                                        fullWidth
                                        error={error !== undefined || err !== null}
                                        helperText={error ? helperTextObject.username_email[error?.type] : ''}
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
                            render={({ field, fieldState: { error } }) => {
                                return (
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

                        <ThemedLoadingButton
                            variant='contained'
                            size='large'
                            fullWidth
                            loading={isLoading}
                            loadingPosition='end'
                            endIcon={<LoginRounded />}
                            disableElevation
                            type='submit'
                            disabled={Object.keys(errors).length === 0 ? false : !isValid}
                        >
                            Log In
                        </ThemedLoadingButton>
                        <DefaultLink
                            to={'/reset-password'}
                            text="Forgot password?"
                            lineHeight={'1em'}
                            sx={{ marginTop: '0.5em' }}

                        />
                    </Box>
                </form>
                <Box
                    width={'100%'}
                    marginY={'0.2em'}
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
                    gap={'1.33em'}
                >
                    <Box
                        width={'16em'}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={'0.8em'}
                    >
                        <ThemedIconButton
                            varient='outlined'
                            icon={<GoogleIcon style={{ height: '1.5em', width: '1.5em' }} />}
                            text={'Continue with Google'}
                        />
                        <ThemedIconButton
                            varient='outlined'
                            icon={<FacebookIcon style={{ height: '1.5em', width: '1.5em' }} />}
                            text={'Continue with Facebook'}
                        />
                    </Box>
                    <Typography variant='body1' lineHeight={'0.5em'}>Not a member?</Typography>
                    <ThemedButton
                        variant='outlined'
                        fullWidth
                        size='large'
                        endIcon={<AppRegistrationRounded />}
                        onClick={() => swiper.slideNext(speed.medium, true)}
                    >
                        Register
                    </ThemedButton>
                </Box>
            </Box>
        </ThemedCard>
    )
}

export default LoginForm;