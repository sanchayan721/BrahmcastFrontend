import { Link } from '@mui/material'
import React from 'react';
import { colors } from '../theme/style';

const DefaultLink = ({ to, text, newPage, underline, variant }) => {
    return (
        <Link
            href={to}
            target={newPage && '_blank'}
            underline={underline ? 'always' : 'none'}
            color={colors.link__primary}
            variant={variant ? variant : 'body1'}
        >
            {text}
        </Link>
    )
}

export default DefaultLink