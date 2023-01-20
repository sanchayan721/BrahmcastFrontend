import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DATE_FORMAT, maximumAgeBar, minimumAgeBar } from '../../../utils/dateHelper'
import { clearFormStatus, selectCurrentUserInfo } from '../../../features/registration/registrationSlice'
import ThemedField from '../../TextFilelds/ThemedField'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RadioGroupGender from '../../RadioGroupGender'
import FormNavigation from '../../FormNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { moveNext, movePrevious } from '../../../features/registration/navigateRegistrationFormSlice'
import CollapsableError from '../../TextFilelds/CollapsableError'


const helperTextObject = {
    fullName: {
        required: "Name is Required."
    },
    dob: {
        required: "Date of Birth is Required."
    }
};

const UserInfo = () => {

    const currentUserInfo = useSelector(selectCurrentUserInfo);

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
            'fullName': currentUserInfo.fullName,
            'dob': dayjs(minimumAgeBar()).format(DATE_FORMAT)
        }
    });

    const dispatch = useDispatch();
    const handleBackClick = () => {
        dispatch(clearFormStatus());
        dispatch(movePrevious());
    };

    const handleOnNext = () => {
        dispatch(moveNext());
    };

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
                gap={'1.5em'}
            >
                {/* Full Name */}
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
                        Your Name
                    </Typography>
                    <Controller
                        control={control}
                        name="fullName"
                        defaultValue={''}
                        rules={{
                            required: true
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <>
                                    <ThemedField
                                        {...field}
                                        ref={null}
                                        name={'fullName'}
                                        label="Full Name"
                                        size='small'
                                        fullWidth
                                        error={error !== undefined}
                                    />
                                    <CollapsableError growCondition={error !== undefined}>
                                        {
                                            error
                                                ? error?.type === 'userError'
                                                    ? error?.errorMessage
                                                    : helperTextObject.fullName[error?.type]
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
                        Date of Birth
                    </Typography>
                    <Controller
                        name={'dob'}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                            return (
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DesktopDatePicker
                                            disableMaskedInput
                                            control={control}
                                            inputFormat={DATE_FORMAT}
                                            value={value}
                                            minDate={maximumAgeBar()}
                                            maxDate={minimumAgeBar()}
                                            onChange={(event) => {
                                                onChange(dayjs(event).format(DATE_FORMAT));
                                            }}
                                            renderInput={(params) => (
                                                <ThemedField
                                                    {...params}
                                                    fullWidth
                                                    size='small'
                                                    error={error !== undefined}
                                                    sx={{
                                                        '& button': {margin: '0 -1.2em'}
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <CollapsableError growCondition={error !== undefined}>
                                        {
                                            error
                                                ? error?.type === 'userError'
                                                    ? error?.errorMessage
                                                    : helperTextObject.dob[error?.type]
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
                        Gender
                    </Typography>

                    <RadioGroupGender />

                    <Controller
                        control={control}
                        name={'gender_keep_anonymous'}
                        id={'gender_keep_anonymous'}
                        label='Select to keep anonymus.'
                        render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <>
                                    <FormControlLabel
                                        ref={null}
                                        sx={{
                                            alignSelf: 'flex-start',
                                            height: '1em',
                                            marginLeft: '0.2em',
                                            marginTop: '0.5em'
                                        }}
                                        label={
                                            <Typography
                                                component={'span'}
                                                noWrap
                                            >
                                                Keep Anonymous
                                            </Typography>
                                        }
                                        control={
                                            <Checkbox
                                                {...field}
                                                ref={null}
                                                onChange={onChange}
                                                checked={!!value}
                                                color={'primary'}
                                            />
                                        }
                                    />
                                </>
                            )
                        }}
                    />
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
                    {/* <Fade in={err?.length > 0} unmountOnExit>
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
                    </Fade> */}

                    <FormNavigation
                        buttonPreviousCLick={handleBackClick}
                        buttonNextDisable={Object.keys(errors).length === 0 ? false : !isValid}
                        isLoading={false}
                    />
                </Box>
            </Box>
        </form>
    )
}

export default UserInfo