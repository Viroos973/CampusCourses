import { createBrowserRouter } from 'react-router-dom';
import {ROUTES} from "./const/route.js";
import {Root} from "./pages/root.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <Login />
            },
            {
                path: ROUTES.REGISTER,
                element: <Register />
            }
        ]
    }
])