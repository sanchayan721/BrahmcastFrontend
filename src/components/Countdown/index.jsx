import { Box, Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { colors } from '../theme/style';

const Countdown = (props) => {
    const { initialMinute = 0, initialSeconds = 0, trigger = false } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    useEffect(() => {
        setMinutes(initialMinute);
        setSeconds(initialSeconds);
    }, [trigger && trigger])

    return (
        <div>
            {
                minutes === 0 && seconds === 0
                    ? null
                    :
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        {
                            minutes !== 0
                            &&
                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                                alignItems={'center'}
                                gap={'0.1em'}
                                width={'2.95em'}
                            >
                                <Typography
                                    fontWeight={'medium'}
                                    color={props.color || colors.danger}
                                >
                                    {minutes}
                                </Typography>
                                <Typography color={props.color || colors.danger} >min</Typography>
                            </Box>
                        }
                        <Box
                            display={'flex'}
                            justifyContent={'flex-end'}
                            alignItems={'center'}
                            gap={'0.1em'}
                            width={'2.95em'}
                        >
                            <Typography
                                color={props.color || colors.danger}
                                fontWeight={'medium'}
                            >
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </Typography>
                            <Typography color={props.color || colors.danger}>sec</Typography>
                        </Box>
                        {
                            props.endAdornment !== undefined &&
                            <Typography color={props.color || colors.danger} width={'2em'} display={'flex'} justifyContent={'flex-end'}>{props.endAdornment}</Typography>
                        }
                    </Box>
            }
        </div>
    )
}

export default Countdown;