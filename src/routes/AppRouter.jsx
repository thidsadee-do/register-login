import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import userAuth from "../hooks/userAuth";
import RegisterForm from "../layout/RegisterForm";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import AdminHome from "../layout/AdminHome";
import Home from "../layout/Home";
const guesRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginForm /> }, 
      { path: "/register", element: <RegisterForm /> },
      { path: "*", element: <p>Page Not Found</p> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> }, 
      { path: "/register", element: <RegisterForm /> },
      { path: "*", element: <p>Page Not Found</p> },
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <AdminHome /> }, 
      { path: "/home", element: <AdminHome /> }, 
      { path: "*", element: <Home/> },
    ],
  },
]);




export default function AppRouter() {
  const { user } = userAuth();
  const finalRouter = user?.user_id ? user.user_role === "ADMIN" ? adminRouter : userRouter : guesRouter;
  return <RouterProvider router={finalRouter} />;
}
