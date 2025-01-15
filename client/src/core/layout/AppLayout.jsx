import Footer from "../components/Footer";

export default function AppLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
