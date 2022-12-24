import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentRoles, selectCurrentToken, selectCurrentUser } from './authSlice';

const RequireAuth = ({ allowedRoles }) => {

    const token = useSelector(selectCurrentToken);
    const roles = useSelector(selectCurrentRoles);
    const user = useSelector(selectCurrentUser);

    const location = useLocation();

    return (
        token && roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{from: location}} replace />
                : <Navigate to="/" state={{from: location}} replace />
    )
}

export default RequireAuth