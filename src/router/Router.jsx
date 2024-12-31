import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddServices from "../components/AddServices/AddServices";
import Services from "../components/Services/Services";
import MyServices from "../components/MyServices/MyServices";
import Reviews from "../components/Reviews/Reviews";
import ServiceDetails from "../components/ServiceDetails/ServiceDetails";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addServices",
        element: (
          <PrivateRouter>
            <AddServices></AddServices>
          </PrivateRouter>
        ),
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/myServices",
        element: (
          <PrivateRouter>
            <MyServices></MyServices>
          </PrivateRouter>
        ),
      },
      {
        path: "/reviews",
        element: (
          <PrivateRouter>
            <Reviews></Reviews>
          </PrivateRouter>
        ),
      },
      {
        path: "/serviceDetails/:id",
        element: <ServiceDetails></ServiceDetails>,
      },
    ],
  },
]);

export default router;
