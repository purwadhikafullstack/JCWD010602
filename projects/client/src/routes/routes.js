import PageRegister from "../pages/pageRegister";
import VerifyEmail from "../components/verifyEmail";
import DataRoom from "../components/dataRoom";
const routes = [
  {
    path: "/register",
    element: <PageRegister />,
  },
  {
    path: "/verification",
    element: <VerifyEmail />,
  },
  {
    path: "/data-room",
    element: <DataRoom />,
  },
];

export default routes;
