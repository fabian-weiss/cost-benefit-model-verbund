import SectionContainer from "@/components/SectionContainer";
import "@/styles/header-section.css";

function HeaderSection(props: { title: string; body: string }) {
  return (
    <SectionContainer contentClasses="fw-header-container">
      <h1>{props.title}</h1>
      <p>{props.body}</p>
    </SectionContainer>
  );
}

export default HeaderSection;
