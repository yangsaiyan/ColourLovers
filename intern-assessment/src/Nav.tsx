import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DisplayColor from './DisplayColor';
import DisplayFavorite from './DisplayFavorite';
import "./css/nav.css"

function Nav() {

    return (

        <div>
            <Router>
                <div className='nav-container'>
                    <nav className='nav'>
                        <Link to="/show-colors" className='link'>Show Colors</Link>
                        <Link to="/display-favorite" className='link'>Display Favorite</Link>
                    </nav>
                </div>
                <Routes>
                    <Route path="show-colors" element={<DisplayColor />} />
                    <Route path="display-favorite" element={<DisplayFavorite />} />
                </Routes>
            </Router >
        </div >
    );
}

export default Nav;
