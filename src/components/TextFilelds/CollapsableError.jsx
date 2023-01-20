import { Collapse, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../theme/style'

const CollapsableError = ({ growCondition, padding, children }) => {
    return (
        <Collapse
            in={growCondition}
            sx={{
                width: '100%',
                padding: padding ? padding : '0 1em'
            }}
        >
            <Typography
                component={'p'}
                fontSize={'0.65em'}
                color={colors.danger}
                sx={{ transform: "translateY(-0.5em)" }}
            >
                {children}
            </Typography>
        </Collapse>
    )
}

export default CollapsableError