import React from 'react'
import ThemedButton from './ThemedButton'
import { Box, Typography } from '@mui/material'

const ThemedIconButton = (props) => {
    return (
        <ThemedButton
            variant={props.varient}
            sx={{
                padding: '0.4em',
                "& svg": {
                    height: '2em',
                    width: '2em'
                }
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width='100%'
            >
                {props.icon}
                <Typography 
                    variant='button' 
                    color={'primary'}
                    flexGrow='1'
                >
                    {props.text}
                </Typography>
            </Box>
        </ThemedButton>
    )
}

export default ThemedIconButton