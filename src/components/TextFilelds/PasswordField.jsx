import React from 'react'
import ThemedField from './ThemedField'
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = (props) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemedField
                {...props}
                id={props.id}
                label={props.label}
                fullWidth={props.fullWidth}
                type={showPassword ? 'text' : 'password'}
                size={props.size}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    )
                }}
            />
    )
}

export default PasswordField