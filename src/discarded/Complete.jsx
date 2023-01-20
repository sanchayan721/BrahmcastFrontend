import React from 'react';
import TickAnimation from '../../../assets/animations/TickAnimation';
import CrossAnimation from '../../../assets/animations/CrossAnimation';
import FormNavigation from '../../FormNavigation';
import { useDispatch } from 'react-redux';
import { clearFormStatus } from '../../../features/registration/registrationSlice';
import { movePrevious } from '../../../features/registration/navigateRegistrationFormSlice';

const Complete = () => {

    const dispatch = useDispatch();
    const handleBackClick = () => {
        dispatch(clearFormStatus());
        dispatch(movePrevious());
    };

    return (
        <>
            <TickAnimation />
            <CrossAnimation />
            <FormNavigation
                buttonPreviousCLick={handleBackClick}
                buttonNextDisable={false}
                isLoading={false}
            />
        </>
    )
}

export default Complete