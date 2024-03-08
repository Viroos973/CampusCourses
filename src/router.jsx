import { createBrowserRouter } from 'react-router-dom';
import {ROUTES} from "./const/route.js";
import {Root} from "./pages/root.jsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
    }
])