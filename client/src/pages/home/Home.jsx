import AppLayout from "../../core/layout/AppLayout";
import { Container } from "react-bootstrap";
import Section1 from "./components/Section1/Section1";

export default function Home() {
  return (
    <AppLayout>
      <Container>
        <Section1 />
      </Container>
    </AppLayout>
  );
}
