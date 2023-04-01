import { Card } from '@mui/material'
import React from 'react'

const ScrollbarShadow = ({ children }) => {
    return (
        <>
            <Card
                elevation={5}
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    height: '100vh',
                    width: '5em',
                    transform: 'translateX(5em)',
                    zIndex: 2
                }}
            />
            {children}
        </>
    );
};

export default ScrollbarShadow