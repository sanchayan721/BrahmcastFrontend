import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ThemedField from '../components/TextFilelds/ThemedField'
import ThemedLoadingButton from '../components/Buttons/ThemedLoadingButton';
import { AppRegistrationRounded, ArrowForwardRounded, LoginRounded } from '@mui/icons-material';
import { Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import ThemedIconButton from '../components/Buttons/ThemedIconButton';
import { FacebookIcon, GoogleIcon } from '../assets/icons';
import ThemedButton from '../components/Buttons/ThemedButton';
import DefaultLink from '../components/Link/DefaultLink';
import { colors } from '../components/theme/style';
import { useCheckUsernameEmailMutation } from '../features/registration/registrationApiSlice';
import { EMAIL_PATTERN, USERNAME_PATTERN } from '../utils/patterns';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectCurrentAcceptTC, selectCurrentEmail, selectCurrentUserName } from '../features/registration/registrationSlice';
import { moveNext } from '../features/registration/navigateRegistrationFormSlice';


const helperTextObject = {
    username: {
        required: "Username is Required",
        pattern: "Min 4 and max 30 charecters, no spaces. ( _  -  .  @ are allowed )"
    },
    email: {
        required: "Email is Required.",
        pattern: "Invalid Email Address."
    },
    accept_tc: {
        required: "Required"
    },
};

const mapStateToProps = (state) => ({
    ...state.registration
});

let UserValidation = () => {

    const currentUsername = useSelector(selectCurrentUserName);
    const currentEmail = useSelector(selectCurrentEmail);
    const currentAccept_tc = useSelector(selectCurrentAcceptTC);

    const {
        handleSubmit,
        control,
        watch,
        formState: { isValid, errors },
        setError,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            'username': currentUsername,
            'email': currentEmail,
            'accept_tc': currentAccept_tc
        }
    });

    const [showNext, setShowNext] = useState(false);

    useEffect(() => {
        currentAccept_tc && setShowNext(true);
        const subscription = watch((value) => { value && value?.accept_tc && setShowNext(true) });
        return () => subscription.unsubscribe();
    }, [currentAccept_tc, watch]);

    /* useEffect(()=> {
        const subscription = watch((value) => { console.log(value) });
        return () => subscription.unsubscribe();
    }, []) */

    const [checkUsernameEmail, { isLoading }] = useCheckUsernameEmailMutation();
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();

    const handleOnNext = async ({ ...formData }) => {
        try {

            await checkUsernameEmail({ ...formData }).unwrap();
            dispatch(moveNext());
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
                        name="username"
                        defaultValue={''}
                        rules={{
                            required: true,
                            pattern: USERNAME_PATTERN
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <ThemedField
                                    {...field}
                                    ref={null}
                                    name={'username'}
                                    label="Username"
                                    size='small'
                                    fullWidth
                                    error={error !== undefined}
                                    helperText={
                                        error
                                            ? error?.type === 'fromServer'
                                                ? error?.message
                                                : helperTextObject.username[error?.type]
                                            : ''
                                    }
                                />
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="email"
                        defaultValue={''}
                        rules={{
                            required: true,
                            pattern: EMAIL_PATTERN
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <ThemedField
                                    {...field}
                                    ref={null}
                                    name={'email'}
                                    label="email"
                                    size='small'
                                    fullWidth
                                    error={error !== undefined}
                                    helperText={
                                        error
                                            ? error?.type === 'fromServer'
                                                ? error?.message
                                                : helperTextObject.email[error?.type]
                                            : ''
                                    }
                                />
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name={'accept_tc'}
                        id={'accept_tc'}
                        label='Accept terms and conditions'
                        rules={{
                            required: true
                        }}
                        render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
                            return (
                                <FormControlLabel
                                    ref={null}
                                    sx={{
                                        marginLeft: '0.1em',
                                        alignSelf: 'flex-start',
                                        gap: '0.5em',
                                        height: '1em'
                                    }}
                                    label={
                                        <Typography
                                            component={'span'}
                                            display={'flex'}
                                            justifyContent="center"
                                            gap={'0.4em'}
                                            noWrap
                                        >
                                            I accept the
                                            <DefaultLink
                                                to={'/terms-and-conditions'}
                                                underline={true}
                                                newPage={true}
                                                text={'Terms & Conditions.'}
                                                color={error !== undefined && colors.danger}
                                            />
                                            {error !== undefined && `(${helperTextObject.accept_tc[error?.type]})`}
                                        </Typography>
                                    }
                                    control={
                                        <Checkbox
                                            {...field}
                                            sx={error !== undefined ? { color: colors.danger } : {}}
                                            ref={null}
                                            onChange={onChange}
                                            checked={value}
                                            color={error !== undefined ? 'error' : 'primary'}
                                        />
                                    }
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
                        endIcon={showNext ? <ArrowForwardRounded /> : <AppRegistrationRounded />}
                        disableElevation
                        type='submit'
                        disabled={Object.keys(errors).length === 0 ? false : !isValid}
                    >
                        {showNext ? 'Next' : 'Register'}
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
                        icon={<GoogleIcon style={{ height: '1.5em', width: '1.5em' }} />}
                        text={'Register with Google'}
                    />
                    <ThemedIconButton
                        varient='outlined'
                        icon={<FacebookIcon style={{ height: '1.5em', width: '1.5em' }} />}
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
        </Box>
    )
}

UserValidation = connect(mapStateToProps)(UserValidation);

export default UserValidation