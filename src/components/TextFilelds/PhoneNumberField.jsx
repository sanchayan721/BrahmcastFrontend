import React from 'react';
import MuiPhoneNumber from 'mui-phone-number';


const PhoneNumberField = (props) => {

    return (
        <MuiPhoneNumber
            {...props}
            size={'small'}
            defaultCountry='in'
            variant='outlined'
            disableAreaCodes={true}
            autoFormat={true}
            preferredCountries={['in', 'us', 'it', 'de', 'uk', 'au']}
            fullWidth
            
            sx={{
                height: '100%',
                width: '100%',
                '& .MuiInputBase-root': {
                    paddingLeft: '0.5em',
                    '& .MuiInputAdornment-root': {
                        marginRight: '0.3em',
                        '& .MuiPhoneNumber-flagButton': {
                            padding: '8px'
                        },
                        '& svg': {
                            transform: 'scale(1.2)'
                        }
                    }
                },

                '& fieldset': {
                    borderRadius: '0.5em',
                }
            }}
        />
    )
}

export default PhoneNumberField