import React, { useCallback, useEffect, useState } from 'react'
import { ThemedCard } from '../../Cards'
import { selectActiveStep, setTotalSteps } from '../../../features/registration/navigateRegistrationFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';
import { selectCurrentAccountType, selectCurrentVerifyOTP } from '../../../features/registration/registrationSlice';
import LoginInfo from './LoginInfo';
import VerifyOTP from './VerifyOTP';
import UserInfo from './UserInfo';
import AccountType from './AccountType';
import { ACCOUNT_TYPES } from '../../../utils/accountTypes';
import { CreatorAccountInfo, CreatorDetailInfo } from '../AccountSpecific/Creator';
import { StudioAccountInfo, StudioDetailInfo } from '../AccountSpecific/Studio';
import { ProjectOwnerAccountInfo, ProjectOwnerDetailInfo } from '../AccountSpecific/ProjectOwner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from "swiper";
import { colors, speed } from '../../theme/style';

const RegisterForm = () => {

    const steps = [
        {
            title: "Register",
            subtitle: "It's quick and Easy",
            component: <LoginInfo />
        },
        {
            title: "User Info",
            subtitle: "A little bit about yourself",
            component: <UserInfo />
        },
        {
            title: "Account Type",
            subtitle: "who are You?",
            component: <AccountType />
        },
    ];

    const verificationStep = {
        title: "Verification",
        subtitle: "Enter OTP",
        component: <VerifyOTP />
    };

    const creatorRegistrationSteps = [
        {
            title: "Account Info",
            subtitle: "Add Primary Account Information",
            component: <CreatorAccountInfo />
        },
        {
            title: "Creator Detail Info",
            subtitle: "Spice it up before launching",
            component: <CreatorDetailInfo />
        }
    ];

    const studioRegistrationSteps = [
        {
            title: "Account Info",
            subtitle: "Add Primary Account Information",
            component: <StudioAccountInfo />
        },
        {
            title: "Studio Detail Info",
            subtitle: "Spice it up before launching",
            component: <StudioDetailInfo />
        }
    ];

    const projectOwnerRegistrationSteps = [
        {
            title: "Account Info",
            subtitle: "Add Primary Account Information",
            component: <ProjectOwnerAccountInfo />
        },
        {
            title: "Project Owner Detail Info",
            subtitle: "Spice it up before launching",
            component: <ProjectOwnerDetailInfo />
        }
    ];

    const currentVerifyOTP = useSelector(selectCurrentVerifyOTP);
    currentVerifyOTP && steps.splice(1, 0, verificationStep);

    const currentAccountType = useSelector(selectCurrentAccountType);
    switch (currentAccountType) {
        case ACCOUNT_TYPES.Creator:
            steps.push(...creatorRegistrationSteps);
            break;

        case ACCOUNT_TYPES.Studio:
            steps.push(...studioRegistrationSteps);
            break;

        case ACCOUNT_TYPES.ProductOwner:
            steps.push(...projectOwnerRegistrationSteps);
            break;

        default:
            break;
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTotalSteps(steps.length));
    }, [dispatch, steps.length]);

    const activeStep = useSelector(selectActiveStep);
    const [swiperContent, setSwiperContent] = useState(null);
    const [swiperHeader, setSwiperHeader] = useState(null);
    const swipeAll = useCallback(() => {
        swiperContent.slideTo(activeStep, speed.medium, true);
        swiperHeader.slideTo(activeStep, speed.slow, true);
    },
        [
            activeStep,
            swiperContent,
            swiperHeader
        ]
    );
    useEffect(() => {
        swiperContent && swipeAll();
    }, [swipeAll, swiperContent])

    return (
        <ThemedCard
            elevation={6}
            sx={{
                display: 'flex',
                width: '25em',
                height: 'max-content',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0'
            }}
        >
            <Box width="100%">
                <Swiper
                    onSwiper={(swpr) => setSwiperHeader(swpr)}
                    style={{ width: '100%' }}
                    centeredSlides={true}
                    hashNavigation={{ watchState: true }}
                    noSwiping={true}
                    noSwipingClass='register__swiper-header'
                    spaceBetween={60}
                    effect={'fade'}
                    modules={[EffectFade]}
                >
                    {
                        steps.map((step, key) => {
                            return (
                                <SwiperSlide
                                    key={key}
                                    className='register__swiper-header'
                                    style={{ display: 'flex', flexDirection: 'column', padding: '1em', background: colors.white }}
                                >
                                    <Typography varient="h3" color={'primary'} fontSize={'1.5em'} fontWeight={'bold'}>{step.title}</Typography>
                                    <Typography lineHeight={'1.256em'} fontWeight={'medium'}>{step.subtitle}</Typography>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </Box>

            <Box width={'100%'}>
                <Divider orientation='horizontal' />
            </Box>

            <Box
                width={'100%'}
                minHeight={'32.5em'}
                height={'auto'}
                display={'flex'}
                flexDirection="column"
                alignItems={'center'}
                gap={'1.5em'}
                overflow={'hidden'}
            >
                <Swiper
                    onSwiper={(swpr) => setSwiperContent(swpr)}
                    style={{ width: '100%' }}
                    centeredSlides={true}
                    hashNavigation={{ watchState: true }}
                    noSwiping={true}
                    noSwipingClass='register__swiper-content'
                    spaceBetween={40}
                >
                    {
                        steps.map((step, key) => {
                            return (
                                <SwiperSlide
                                    key={key}
                                    className='register__swiper-content'
                                    style={{ padding: '1em 1em 1.5em 1em', background: colors.white }}
                                >
                                    {step.component}
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Box>
        </ThemedCard >
    )
};

export default RegisterForm;