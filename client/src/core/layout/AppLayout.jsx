import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import "./AppLayout.css";

export default function AppLayout({ children }) {
  return (
    <>
      <HeaderHome />
      <main className="main-user flex-grow-1">{children}</main>
      <Footer />
    </>
  );
}
