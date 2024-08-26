import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../componnent/LoginForm";
import userAuth from "../hooks/userAuth";
import RegisterForm from "../componnent/RegisterForm";
import Header from "../componnent/Header";
import UserHome from "../componnent/UserHome";
import DataUser from "../componnent/DataUser";
import DataBooking from "../componnent/DataBooking";
import DataHairStyle from "../componnent/DataStyleHair";
import UserBooking from "../componnent/UserBooking";
import StatusUser from "../componnent/StatusUser";
import CreateStylehair from "../componnent/CreateStylehair";
import AboutMe from "../componnent/AboutMe";
import Datadashboard from "../componnent/Datadashboard"
import BarberTeam from "../componnent/BarberTeam";
import Gallery from "../componnent/Gallery";
import Profile from "../componnent/profile";


// import Customerhistory from "../componnent/Customerhistory";




const guesRouter = createBrowserRouter([
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
      { path: "/LoginForm", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/DataUser", element: <DataUser /> },
      { path: "/DataBooking", element: <DataBooking /> },
      { path: "/DataHairStyle", element: <DataHairStyle /> },
      { path: "/UserBooking/*", element: <UserBooking /> },
      { path: "/StatusUser", element: <StatusUser /> },
      { path: "/CreateStylehair", element: <CreateStylehair /> },
      { path: "/Gallery", element: <Gallery/> },
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
      { path: "/UserBooking/*", element: <UserBooking /> },
      { path: "/StatusUser", element: <StatusUser /> },
      { path: "/AboutMe", element: <AboutMe /> },
      { path: "/BarberTeam", element: <BarberTeam /> },
      { path: "/Gallery", element: <Gallery /> },
      { path: "/Profile", element: <Profile /> },
      // { path: "*", element: <p>User</p> },
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
      { index: true, element: <Datadashboard/> },
      { path: "/DataUser", element: <DataUser /> },
      { path: "/DataBooking", element: <DataBooking /> },
      { path: "/DataHairStyle", element: <DataHairStyle /> },
      { path: "/Datadashboard", element: <Datadashboard /> },
      { path: "/CreateStylehair", element: <CreateStylehair /> },
      // { path: "/Customerhistory", element: <Customerhistory /> },
      { path: "*", element: <p className=" text-center text-rose-600 text-2xl">Administrator</p> },
    ],
  },
]);




export default function AppRouter() {
  const { user } = userAuth();
  console.log(user)
  const finalRouter = user?.user_id ? user.user_role === "ADMIN" ? adminRouter : userRouter : guesRouter;
  return <RouterProvider router={finalRouter} />;
}
