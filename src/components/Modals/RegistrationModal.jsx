import React from 'react'
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

const RegistrationModal = ({open, handleClose}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            Hi
        </Modal>
    )
}

export default RegistrationModal