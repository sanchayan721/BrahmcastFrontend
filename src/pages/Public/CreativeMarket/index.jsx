import React from 'react'
import './creative-market.css'
import { Card, CardMedia, Divider, Typography, useMediaQuery } from '@mui/material'
import { SwiperSlide } from 'swiper/react';
import { creativeMarket } from '../../../data/creativeMarket';
import SwiperCards3D from '../../../components/SwiperCards3D/SwiperCards3D';
import { colors } from '../../../components/theme/style';

const CreativeMarket = () => {
    const laptop = useMediaQuery('(max-width: 150em)');
    return (
        <div className='creative-market'>
            <Typography
                variant='h2'
                fontWeight={'medium'}
                lineHeight={'1em'}
                color="primary"
                fontSize={laptop ? '3em' : '4em'}
                className='creative__market-texts'
                sx={{ minWidth: '7em' }}
            >
                Explore the <br />
                Creative Market
            </Typography>

            <SwiperCards3D className={'creative__market-display'}>
                {
                    creativeMarket.map((datum, index) => {
                        return (
                            <SwiperSlide key={index}
                                style={{
                                    height: `${laptop ? '30em' : '50em'}`,
                                    width: `${laptop ? '18em' : '25.9em'}`,
                                    padding: 0,
                                    margin: 0
                                }}
                            >
                                <Card
                                    elevation={5}
                                    component={'article'}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1em',
                                        height: '100%',
                                        width: '100%'
                                    }}
                                >
                                    <CardMedia
                                        image={datum.image}
                                        title={datum.title}
                                        loading={'lazy'}
                                        sx={{
                                            height: laptop ? '18em' : '28em',
                                            width: '100%'
                                        }}
                                    />

                                    <Typography
                                        varient={'h3'}
                                        letterSpacing={'0.3em'}
                                        fontWeight={'medium'}
                                    >
                                        {datum.title}
                                    </Typography>
                                    <Divider
                                        flexItem
                                        sx={{
                                            borderBottom: `2px solid ${colors.primary}`,
                                            width: '8em',
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Typography
                                        variant='body1'
                                        padding={'0 1.5em 1.5em'}
                                        lineHeight={'1.125em'}
                                        fontSize={'0.7em'}
                                        textAlign={'center'}
                                    >
                                        {datum.description}
                                    </Typography>
                                </Card>
                            </SwiperSlide>
                        )
                    })
                }
            </SwiperCards3D>
        </div>
    )
}

export default CreativeMarket