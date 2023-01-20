import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ThemedButton = styled(Button)(() => ({
    borderRadius: '2em',
    fontSize: 'inherit'
}));

export default ThemedButton;