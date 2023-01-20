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
                    marginTop: '5em',
                    overflow: 'scrollY'
                }}
            >
                <Outlet />
            </main>
            <PublicFooter />
        </>
    )
};

export default PublicPageLayout;