import AdminListing from "../pages/adminlisting";
import TenantRegister from "../pages/tenantregister";
import Rooms from "../pages/rooms";
import PageRegister from "../pages/pageRegister";
import VerifyEmail from "../components/verifyEmail";

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
    }
]

export default routes;