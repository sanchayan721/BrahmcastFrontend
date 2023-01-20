import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

const ThemedLoadingButton = styled(LoadingButton)(() => ({
    borderRadius: '2em',
    fontSize: 'inherit'
}));

export default ThemedLoadingButton;