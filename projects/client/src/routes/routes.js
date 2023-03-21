import AdminListing from "../pages/adminlisting";
import TenantRegister from "../pages/tenantregister";
import Rooms from "../pages/rooms";

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
    }
]

export default routes;