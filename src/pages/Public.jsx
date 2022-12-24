import React from 'react';
import LoginForm from '../components/Forms/LoginForm';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RegisterForm } from '../components/Forms';
import DefaultLink from '../components/Link/DefaultLink';

const Public = () => {
    return (
        <Box
            width={'100%'}
            padding={'0 3em'}
        >
            <Box
                width={'max-content'}
                display={'flex'}
                flexDirection={'column'}
                gap={'1em'}
            >
                <Box>
                    <Box
                        display={'flex'}
                        gap={'2em'}
                    >
                        <LoginForm />
                        <RegisterForm />
                    </Box>
                    <Typography
                        display={'flex'}
                        justifyContent="center"
                        gap={'0.5em'}
                    >
                        Are you a Studio?
                        <DefaultLink to={'/'} text={'Click here'} underline={true} />
                    </Typography>
                </Box>
            </Box>

            <Box
                width={'100%'}
                height={'50em'}
            >
                Explore the Creative Market
            </Box>
            <Box
                width={'100%'}
                height={'50em'}
            >
                Trending Hunts
            </Box>
            <Box
                width={'100%'}
                height={'50em'}
            >
                Brahmcast Studios
            </Box>
            <Box
                width={'100%'}
                height={'50em'}
            >
                Post any Media Requirement
            </Box>
            <Box
                width={'100%'}
                height={'50em'}
            >
                Influential Creators
            </Box>
            <Box
                width={'100%'}
                height={'50em'}
            >
                Connect with every Creator in the world
            </Box>
        </Box>
    )
}

export default Public