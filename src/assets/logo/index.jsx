import { Box } from '@mui/system'
import React from 'react'
import { ReactComponent as LogoImage } from './logo.svg';
import { ReactComponent as LogomarkImage } from './logomark.svg';

const Logo = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            gap={'1em'}
            height={'1.3em'}
        >
            <LogoImage />
            <LogomarkImage />
        </Box>
    )
}

export default Logo