import { Link } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { colors } from '../theme/style';
import Countdown from '../Countdown';

const DefaultLink = ({ to, text, newPage, underline, variant, color, ...others }) => {
    return (
        <Link
            {...others}
            href={to}
            target={newPage && '_blank'}
            underline={underline ? 'always' : 'none'}
            color={!color ? colors.link__primary : color}
            variant={variant ? variant : 'body1'}
        >
            {text}
        </Link>
    )
};

export const ButtonLink = ({ text, variant, onClick, ...others }) => {

    return (
        <Link
            {...others}
            component={'button'}
            onClick={onClick}
            variant={variant ? variant : 'body1'}
            sx={{
                '&[disabled]': {
                    color: colors.muted,
                    pointerEvents: 'none',
                    textDecoration: 'none'
                },
            }}
        >
            {text}
        </Link>
    )
}

export const TimeOutLink = ({
    text,
    variant,
    onClick,
    timeOutSeconds,
    ...others
}) => {

    const [countdown, setCountdown] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const buttonOnClick = async () => {
        await onClick();
        setDisabled(true);
        setCountdown(timeOutSeconds);
        setTrigger(!trigger);

        setTimeout(() => {
            setDisabled(false)
        }, (timeOutSeconds + 1.5) * 1000)

    }

    return (
        <Link
            {...others}
            variant={variant ? variant : 'body1'}
            component={'button'}
            disabled={disabled}
            onClick={buttonOnClick}
            sx={{
                display: 'flex',
                gap: '1em',
                '&[disabled]': {
                    color: colors.muted,
                    pointerEvents: 'none',
                    textDecoration: 'none'
                },
            }}
        >
            {text}
            <Countdown
                initialSeconds={countdown}
                trigger={trigger}
                color={colors.muted}
            />
        </Link>
    )
}

export default DefaultLink;