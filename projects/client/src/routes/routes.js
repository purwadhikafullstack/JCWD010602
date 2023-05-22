import PageLogin from "../pages/pageLogin";
import PageRegister from "../pages/pageRegister";
import VerifyEmail from "../components/verifyEmail";
import ProfilePictureForm from "../components/ProfilePic";
import ResetPasswordForm from "../components/ResetPass";
import SendResetPasswordForm from "../components/SendReset";
import UploadProof from "../components/UploadProof";
import BookingForm from "../components/BookingForm";
import MyCalendar from "../components/AvailableRoom";
import SalesReport from "../components/SalesReport";

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
  {
    path: "/profilepic",
    element: <ProfilePictureForm />,
  },
  {
    path: "/reset",
    element: <ResetPasswordForm />,
  },
  {
    path: "/verifyreset",
    element: <SendResetPasswordForm />,
  },
  {
    path: "/booking",
    element: <BookingForm />,
  },
  {
    path: "/room",
    element: <MyCalendar />,
  },
  {
    path: "/proof",
    element: <UploadProof />,
  },
  {
    path: "/sales-report",
    element: <SalesReport />,
  },
  {
    path: "/tenant",
    element: <AdminListing />,
  },
  {
    path: "tenantregister",
    element: <TenantRegister />,
  },
  {
    path: "rooms",
    element: <Rooms />,
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
