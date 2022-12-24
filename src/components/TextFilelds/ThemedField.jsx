import { styled, TextField } from "@mui/material";

const ThemedField = styled(TextField)(() => ({
    '& fieldset': {
        borderRadius: '0.5em',
    }
}));

export default ThemedField;