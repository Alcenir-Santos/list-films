import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Filme from './pages/Film';
import Header from './components/Header';
import Error from './pages/Error';
import Favorites from './pages/Favorites/indes';

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/film/:id" element={<Filme />} />
                <Route path='/favorites' element={<Favorites />} />

                {/* deve ser sempre a ultima rota */}
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}