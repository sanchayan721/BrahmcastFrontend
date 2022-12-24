import { Outlet } from 'react-router-dom';
import { PublicFooter } from '../components/Footer';
import { PublicHeader } from '../components/header';

const PublicPageLayout = () => {
    return (
        <>
            <PublicHeader />
            <main
                className="App"
                style={{
                    marginTop: '6.3em'
                }}
            >
                <Outlet />
            </main>
            <PublicFooter />
        </>
    )
};

export default PublicPageLayout;