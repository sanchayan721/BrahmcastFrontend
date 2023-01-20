import React from 'react'
import ThemedLoadingButton from '../Buttons/ThemedLoadingButton'
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material'

const FormNavigation = ({ buttonPreviousCLick, buttonNextDisable, isLoading }) => {
    return (
        <React.Fragment>
            <ThemedLoadingButton
                fullWidth
                disableElevation
                variant="outlined"
                size='large'
                loading={false}
                loadingPosition='start'
                startIcon={<ArrowBackRounded />}
                onClick={buttonPreviousCLick}
            >
                Previous
            </ThemedLoadingButton>

            <ThemedLoadingButton
                fullWidth
                disableElevation
                variant="contained"
                size='large'
                loading={isLoading}
                loadingPosition='end'
                endIcon={<ArrowForwardRounded />}
                type='submit'
                disabled={buttonNextDisable}
            >
                Next
            </ThemedLoadingButton>
        </React.Fragment>
    )
}

export default FormNavigation