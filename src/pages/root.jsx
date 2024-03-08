import {Outlet} from "react-router-dom";
import NavbarComponent from "/src/components/navbar.jsx";

export const Root = () => {
    return (
        <>
            <NavbarComponent />
            <Outlet />
        </>
    )
}