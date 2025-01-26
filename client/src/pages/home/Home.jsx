import AppLayout from "../../core/layout/AppLayout";
import { Container } from "react-bootstrap";
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";
import Section3 from "./components/Section3/Section3";
import Section4 from "./components/Section4/Section4";
import "./Home.css";
import Section5 from "./components/Section5/Section5";

export default function Home() {
  return (
    <AppLayout>
      <Container className="d-flex flex-column custom-container">
        <Section1 />
        <Section2 />
        <Section3 />
      </Container>
      <Container fluid className="mt-5 section-4">
        <Section4 />
      </Container>
      <Container>
        <Section5 />
      </Container>
    </AppLayout>
  );
}
