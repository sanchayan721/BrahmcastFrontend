import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './App';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading';
import theme from './components/theme/style';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={ theme }>
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path='/*' element={<App />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);