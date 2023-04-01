import { AppRegistrationRounded, LoginRounded } from "@mui/icons-material";
import { LoginForm, RegisterForm } from "../components/Forms";

export const formTypes = [
    {
        name: 'Register',
        component: <RegisterForm />,
        icon: <AppRegistrationRounded />
    },
    {
        name: 'Login',
        component: <LoginForm />,
        icon: <LoginRounded />
    },
];