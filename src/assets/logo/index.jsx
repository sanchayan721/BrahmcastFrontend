import { Box } from '@mui/system'
import React from 'react'
import { ReactComponent as LogoImage } from './logo.svg';
import { ReactComponent as LogomarkImage } from './logomark.svg';

const Logo = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'1.125em'}
            height={'1.3em'}
        >
            <div
                style={{
                    height: '2.3em',
                    width: '2.3em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    className={'logo-image'}
                    style={{
                        height: '3.5em',
                        width: '3.5em',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%'
                    }}
                >
                    <LogoImage height={'2.3em'} width={'2.3em'} />
                </div>
            </div>
            <LogomarkImage height={'1.2em'} />
        </Box>
    )
}

export default Logo;