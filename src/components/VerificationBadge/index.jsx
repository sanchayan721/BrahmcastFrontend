import { Tooltip } from '@mui/material'
import React from 'react'
import { CorrectIcon, WarningIcon } from '../../assets/icons'

export const VerifiedBadge = () => {
    return (
        <Tooltip
            title="Verified"
            placement="left"
            arrow
        >
            <CorrectIcon
                height={'1.35em'}
                width={'1.35em'}
                className='badge__icon'
                style={{
                    transform: 'translateX(0.45em)',
                    margin: '0 0.3em'
                }}
            />
        </Tooltip>
    )
}

export const NotVerifiedBadge = () => {
    return (
        <Tooltip
            title="Not Verified"
            placement="left"
            arrow
        >
            <WarningIcon
                height={'1.4em'}
                width={'1.4em'}
                className='badge__icon'
                style={{
                    transform: 'translateX(0.45em)',
                    margin: '0 0.3em',
                }}
            />
        </Tooltip>
    )
}