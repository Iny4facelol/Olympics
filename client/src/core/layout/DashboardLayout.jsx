import Footer from "../components/Footer";
import HeaderDashboard from "../components/HeaderDashboard";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <HeaderDashboard />
      <main>{children}</main>
      <Footer />
    </>
  );
}
