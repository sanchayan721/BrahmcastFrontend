import { Tabs } from '@mui/material'
import React from 'react'
import { colors, speed } from '../theme/style'

const ThemedTabs = ({ value, onChange, onClick, ariaLabel, children }) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            onClick={onClick}
            aria-label={ariaLabel}
            sx={{
                minWidth: '10em',
                minHeight: 'unset',
                '& .MuiTabs-fixed': {
                    width: '100%',
                    height: 'max-content',
                    '& .MuiTabs-flexContainer': {
                        height: 'max-content',
                        gap: '1em',
                        '& button': {
                            minWidth: '10em',
                            borderRadius: '2em',
                            overflow: 'hidden',
                            margin: '0',
                            padding: '0',
                            minHeight: 'unset',
                            height: '3em',
                            border: `0.8px solid ${colors.primary}`,
                            transition: `all ${speed.fast}ms ease 0s`,
                            '& *': {
                                color: colors.primary,
                                transition: `color ${speed.fast}ms ease 0s`,
                            },
                            "&: hover": {
                                background: 'rgba(217, 153, 55, 0.04)',
                            },
                        }
                    }
                },
                '& .MuiTabs-indicator': {
                    height: '100%',
                    borderRadius: '2em',
                    zIndex: -1
                },
                '& .Mui-selected': {
                    "&: hover": {
                        background: 'rgb(151, 107, 38) !important',
                        border: `0.8px solid rgb(151, 107, 38) !important`,
                    },
                    '& *': {
                        color: `${colors.white} !important`,
                    }
                },
            }}
        >
            {children}
        </Tabs>
    )
}

export default ThemedTabs