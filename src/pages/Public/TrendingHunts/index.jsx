import React from 'react'
import './trending-hunts.css'
import { Box } from '@mui/system'
import { Typography, useMediaQuery } from '@mui/material'

const TrendingHunts = () => {
    const laptop = useMediaQuery('(max-width: 150em)');
    return (
        <Box className={'trending-hunts'}>
            <Typography
                component='h2'
                fontWeight={'medium'}
                lineHeight={'1em'}
                color="primary"
                fontSize={laptop ? '3em' : '4em'}
                className='trending__hunts-texts'
                sx={{ minWidth: '7em' }}
            >
                Trending Hunts
            </Typography>
            <Typography
                className='trending__hunts-subtitle'
                component='h3'
                fontSize={'1em'}
                lineHeight={'1em'}
                fontWeight={'light'}
                zIndex={11}
            >
                Skills in high demand
            </Typography>
            <Box
                className={'trending__hunts-skills__in__demand'}
            >
                
            </Box>
        </Box>
    )
}

export default TrendingHunts