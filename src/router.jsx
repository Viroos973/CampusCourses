import { createBrowserRouter } from 'react-router-dom';
import {ROUTES} from "./const/route.js";
import {Root} from "./pages/root.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";
import Greetings from "./components/Greetings.jsx";
import ListGroups from "./pages/listGroup.jsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <Greetings />
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />
            },
            {
                path: ROUTES.REGISTER,
                element: <Register />
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile />
            },
            {
                path: ROUTES.GROUP_COURSES,
                element: <ListGroups/>
            }
        ]
    }
])