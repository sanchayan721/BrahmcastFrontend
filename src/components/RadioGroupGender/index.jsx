import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { colors } from '../theme/style'

const RadioGroupGender = () => {
    return (
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="male"
            name="radio-buttons-group"
            row
            sx={{
                width: '100%',
                justifyContent: 'space-between',
                '& .MuiFormControlLabel-root': {
                    border: `0.8px solid ${colors.border}`,
                    borderRadius: '0.5em',
                    margin: '0',
                    width: '7em',
                    '& .MuiButtonBase-root': {
                        padding: '0.5em 0.8em'
                    },
                    '&:hover': {
                        border: `0.8px solid ${colors.black}`,
                    }
                }
            }}
        >
            <FormControlLabel value="male" control={<Radio size='small' />} label="Male" />
            <FormControlLabel value="female" control={<Radio size='small' />} label="Female" />
            <FormControlLabel value="other" control={<Radio size='small' />} label="Others" />
        </RadioGroup>
    )
}

export default RadioGroupGender;