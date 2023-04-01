import React from 'react';
import { Box } from '@mui/system';
import "swiper/css/bundle";
import CreativeCommunity from './CreativeCommunity';
import './public.css';
import CreativeMarket from './CreativeMarket';
import MediaRequirement from './MediaRequirement';
import TrendingHunts from './TrendingHunts';

const Public = () => {
    
    return (
        <>
            <CreativeCommunity />
            <CreativeMarket />
            <TrendingHunts />
            <Box
                width={'100%'}
                height={'50em'}
            >
                Brahmcast Studios
            </Box>
            <MediaRequirement />
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
        </>
    )
}

export default Public