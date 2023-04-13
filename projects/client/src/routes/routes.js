import PageLogin from "../pages/pageLogin";
import PageRegister from "../pages/pageRegister";
import VerifyEmail from "../components/verifyEmail";

const routes = [
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/register",
    element: <PageRegister />,
  },
  {
    path: "/verification",
    element: <VerifyEmail />,
  },
];

export default routes;
