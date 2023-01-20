import React from 'react';
import { ReactComponent as LogoImage } from '../assets/logo/logo.svg';
import { ReactComponent as LogomarkImage } from '../assets/logo/logomark.svg';

const Loading = () => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1em'
            }}
        >
            <LogoImage height={'2.3em'} width={'2.3em'} />
            <LogomarkImage height={'1.2em'} />
        </div>
    )
}

export default Loading