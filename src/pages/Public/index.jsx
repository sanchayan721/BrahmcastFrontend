import React from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RegisterForm } from '../../components/Forms';
import DefaultLink from '../../components/Link/DefaultLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper";
import "swiper/css/bundle";
import './public.css';
import { CreativeCommunityFull } from '../../assets/images';
import CreativeCommunity from './CreativeCommunity';

const Public = () => {
    return (
        <>
            <CreativeCommunity />

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
        </>
    )
}

export default Public