import Search from "./search";
import classNames from "classnames";

import './navbar.css'



const Navbar = ({src,loading,theme,changeTheme, setText})=>{
    return(
        <nav className={classNames({'darkT': theme, 'lightT': !theme},'navBar')}>
            <h1>Pokédex</h1>
            <div className="rightNavbar">
                <Search setText={setText} src={src} loading={loading}/>
                <button className={classNames({'darkT': !theme, 'lightT': theme},"themeButton")} onClick={changeTheme}><i className={theme ? "fa fa-sun" :"fa fa-moon"}></i></button>
            </div>
        </nav>
    )
}

export default Navbar;