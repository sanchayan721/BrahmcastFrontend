import { MuiOtpInput } from 'mui-one-time-password-input'
import React from 'react'

const OtpInputField = ({ ...field }) => {

    const validateChar = (value, index) => {
        const isOnlyNumberAndBackspace = /^\d+\b/.test(value);
        const isString = typeof value === 'string';
        const isBackspace = isString && value === '';

        return isBackspace || isOnlyNumberAndBackspace;
    }

    return (
        <MuiOtpInput
            {...field}
            sx={{ gap: '1.5em' }}
            length={6}
            validateChar={validateChar}
            TextFieldsProps={{
                size: 'small',
                placeholder: '-',
                fullWidth: true
            }}
        />
    )
}

export default OtpInputField