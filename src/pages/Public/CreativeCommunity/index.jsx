import { Typography } from '@mui/material';
import { formTypes } from '../../../utils/formTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper";
import DefaultLink from '../../../components/Link/DefaultLink';
import { CreativeCommunityFull } from '../../../assets/images';
import './creative-community.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { speed } from '../../../components/theme/style';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentAuthStep, setActiveAuthStep } from '../../../features/auth/authNavigationSlice';


const CreativeCommunity = () => {

    const laptop = useMediaQuery('(max-width: 150em)');

    const currentAuthStep = useSelector(selectCurrentAuthStep);
    const [authSwiper, setAuthSwiper] = useState(null);
    useEffect(() => {
        let index = formTypes.findIndex(el => el.name === currentAuthStep);
        if (index > -1) {
            authSwiper && authSwiper.slideTo(index, speed.medium, true);
        }
    },
        [
            authSwiper,
            currentAuthStep
        ]
    );

    const dispatch = useDispatch();
    const handleSlideChange = (swipeEvent) => {
        let activeIndex = swipeEvent?.activeIndex;
        if (activeIndex !== undefined) {
            dispatch(setActiveAuthStep({ activeStep: formTypes[activeIndex].name }))
        }
    };

    return (
        <div className='creative__community__forms'>
            <Typography
                variant='h2'
                fontWeight={'medium'}
                lineHeight={'1.125em'}
                color="primary"
                fontSize={laptop ? '3em' : '4em'}
                className='creative__community__texts'
                sx={{minWidth: '7em'}}
            >
                Welcome to <br />
                your Creative <br />
                Community
            </Typography>

            {/* Login and Register Part */}
            <div
                style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
                className="creative__community__swiper"
            >
                <div
                    className="swiper__wrapper"
                    style={{
                        position: 'absolute',
                        width: 'max-content',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Swiper
                        id='auth__form-swiper'
                        onSwiper={(swpr) => setAuthSwiper(swpr)}
                        onInit={(swpr) => swpr.slideTo(formTypes.length - 1, 0, true)}
                        onSlideChange={handleSlideChange}
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className={'authSwiper'}
                        style={{ width: '29em' }}
                        noSwiping={true}
                        noSwipingSelector={'input'}
                    >
                        {
                            formTypes.map((authForm, key) => {
                                return (
                                    <SwiperSlide key={key} style={{ padding: '2em' }} className={authForm.name}>
                                        {authForm.component}
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <Typography
                        display={'flex'}
                        justifyContent="center"
                        gap={'0.5em'}
                    >
                        Are you a Studio?
                        <DefaultLink to={'/'} text={'Click here'} underline={true} />
                    </Typography>
                </div>
            </div>
            <CreativeCommunityFull className='creative__community_image' />
        </div>
    )
}

export default CreativeCommunity