import AdminListing from "../pages/adminlisting";
import TenantRegister from "../pages/tenantregister";
import Rooms from "../pages/rooms";
import PageRegister from "../pages/pageRegister";
import VerifyEmail from "../components/verifyEmail";
import DataRoom from "../components/dataRoom";
import PageDataProperty from "../pages/pageDataProperty";
import PageDataTransaction from "../pages/pageDataTransaction";
const routes = [
    {
      path: '/tenant',
      element: <AdminListing />,
    },
    {
      path: 'tenantregister',
      element: <TenantRegister />
    },
    {
      path: 'rooms',
      element: <Rooms />
    },
    {
        path: "/register",
        element: (
            <PageRegister />
        ),
    },
    {
        path: "/verification",
        element: (
            <VerifyEmail />
        ),
    },
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
    {
        path: "/data-property",
        element: <PageDataProperty />,
    },
    {
        path: "/data-transaction",
        element: <PageDataTransaction />,
    },
];

export default routes;
