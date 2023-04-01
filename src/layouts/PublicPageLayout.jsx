import { Outlet } from 'react-router-dom';
import { PublicFooter } from '../components/Footer';
import { PublicHeader } from '../components/header';
import ScrollbarShadow from '../components/ScrollbarShadow/ScrollbarShadow';

const PublicPageLayout = () => {
    return (
        <ScrollbarShadow>
            <PublicHeader />
            <main className="App no-select">
                <Outlet />
            </main>
            <PublicFooter />
        </ScrollbarShadow>
    )
};

export default PublicPageLayout;