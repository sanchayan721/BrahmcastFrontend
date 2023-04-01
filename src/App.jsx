import React, { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicPageLayout from './layouts/PublicPageLayout';
import RequireAuth from './features/auth/RequireAuth';
import ROLES_LIST from './utils/Roles_list';
import UserHome from './pages/UserHome';

const Public = lazy(() => import('../src/pages/Public'));

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<PublicPageLayout/>}>
                <Route index element={<Public />} />
            </Route>
            <Route path='/studios' element={<PublicPageLayout/>}>
                <Route index element={<Public />} />
            </Route>
            <Route path='/production' element={<PublicPageLayout/>}>
                <Route index element={<Public />} />
            </Route>
            {/* Protected Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]}/>}>
                <Route path='/family/:username' element={<UserHome />}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
};

export default App;