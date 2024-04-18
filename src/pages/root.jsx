import {Outlet} from "react-router-dom";
import NavbarComponent from "/src/components/Navbar.jsx";

export const Root = () => {
    return (
        <>
            <NavbarComponent />
            <Outlet />
        </>
    )
}