import Footer from "../components/Footer";
import HeaderDashboard from "../components/HeaderDashboard";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <HeaderDashboard />
      <main className="main-admin py-5 flex-grow-1">{children}</main>
      <Footer />
    </>
  );
}
