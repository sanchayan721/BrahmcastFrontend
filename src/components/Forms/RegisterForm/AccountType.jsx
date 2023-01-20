import { Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../theme/style'
import { Box } from '@mui/system'
import { accountTypeDescription } from '../../../data/accountTypeDescription'
import FormNavigation from '../../FormNavigation'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { clearFormStatus, selectCurrentAccountType, setAccountType } from '../../../features/registration/registrationSlice'
import { moveNext, movePrevious } from '../../../features/registration/navigateRegistrationFormSlice'

const AccountType = () => {

    const currentAccountType = useSelector(selectCurrentAccountType);

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
            'account_type': currentAccountType,
        }
    });

    const dispatch = useDispatch();
    const handleBackClick = () => {
        dispatch(clearFormStatus());
        dispatch(movePrevious());
    };

    const handleOnNext = (formData) => {
        dispatch(setAccountType(formData));
        dispatch(moveNext());
    }

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
            >
                <Controller
                    control={control}
                    name={'account_type'}
                    rules={{ required: true }}
                    defaultValue={currentAccountType}
                    render={({ field }) => {
                        return (
                            <RadioGroup
                                {...field}
                                aria-labelledby="account-type-choice"
                                name="account_type"
                                sx={{ gap: '0.5em' }}
                            >
                                {
                                    accountTypeDescription.map((account, key) => {
                                        return (
                                            <Box
                                                key={key}
                                                width={'100%'}
                                                display={'flex'}
                                                flexDirection={'column'}
                                                sx={{
                                                    border: `0.8px solid ${colors.border}`,
                                                    borderRadius: '0.5em',
                                                    margin: '0',
                                                    '&:hover': {
                                                        border: `0.8px solid ${colors.black}`,
                                                    },
                                                    '& .MuiFormControlLabel-root': {
                                                        padding: '0 0.7em'
                                                    },
                                                    '& .text__account': {
                                                        padding: '0.7em 1em'
                                                    }
                                                }}
                                            >
                                                <FormControlLabel
                                                    value={account.type}
                                                    label={account.type}
                                                    control={<Radio size='small' />}
                                                />
                                                <Divider flexItem />
                                                <Typography fontSize={'0.7em'} className='text__account'>
                                                    {account.description}
                                                </Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </RadioGroup>
                        )
                    }}
                />
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
        </form >
    )
}

export default AccountType