import PageRegister from "../pages/pageRegister";
import VerifyEmail from "../components/verifyEmail";
import PageDataRoom from "../pages/pageDataRoom";
import PageDataProperty from "../pages/pageDataProperty";
import PageDataTransaction from "../pages/pageDataTransaction";
import Sidebar from "../components/sidebarwithHeader";
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
    element: <PageDataRoom />,
  },

  {
    path: "/data-property",
    element: <PageDataProperty />,
  },
  {
    path: "/data-transaction",
    element: <PageDataTransaction />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
];

export default routes;
