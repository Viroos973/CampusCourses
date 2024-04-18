import { createBrowserRouter } from 'react-router-dom';
import {ROUTES} from "./const/route.js";
import {Root} from "./pages/root.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";
import Greetings from "./components/Greetings.jsx";
import ListGroups from "./pages/listGroup.jsx";
import ListCourses from "./pages/listCourses.jsx";
import CourseDetail from "./pages/courseDetail.jsx";

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
            },
            {
                path: ROUTES.GROUP,
                element: <ListCourses url={""}/>
            },
            {
                path: ROUTES.COURSE_MY,
                element: <ListCourses url={"my"}/>
            },
            {
                path: ROUTES.COURSE_TEACHING,
                element: <ListCourses url={"teaching"}/>
            },
            {
                path: ROUTES.COURSES,
                element: <CourseDetail/>
            }
        ]
    }
])