import { Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper";
import { LoginForm } from '../../../components/Forms';
import DefaultLink from '../../../components/Link/DefaultLink';
import { CreativeCommunityFull } from '../../../assets/images';
import './creative-community.css';
import RegisterForm from '../../../components/Forms/RegisterForm';
import useMediaQuery from '@mui/material/useMediaQuery';


const CreativeCommunity = () => {

    const laptop = useMediaQuery('(max-width: 150em)');

    return (
        <div className='creative__community__forms'>
            <Typography
                variant='h2'
                fontWeight={'medium'}
                lineHeight={'1.125em'}
                color="primary"
                fontSize={laptop ? '3em' : '4em'}
                className='creative__community__texts'
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
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="authSwiper"
                        style={{ width: '29em' }}
                        noSwiping={true}
                        noSwipingSelector={'input'}
                    >

                        <SwiperSlide style={{ padding: '2em' }}>
                            <LoginForm />
                        </SwiperSlide>
                        <SwiperSlide style={{ padding: '2em' }}>
                            <RegisterForm />
                        </SwiperSlide>

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