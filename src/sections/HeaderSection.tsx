import SectionContainer from "@/components/SectionContainer";
import "@/styles/header-section.css";
import Link from "next/link";

function HeaderSection(props: { title: string; body: string }) {
  return (
    <SectionContainer contentClasses="fw-header-container">
      <h1>{props.title}</h1>
      <p>
        {`${props.body} View the instructions to use the model `}
        <Link target="_blank" href={"/instructions.pdf"}>
          here
        </Link>
        .
      </p>
    </SectionContainer>
  );
}

export default HeaderSection;
