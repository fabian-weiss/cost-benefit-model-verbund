"use client";
import SectionContainer from "@/components/SectionContainer";
import "@/styles/header-section.css";
import { useSetDefaultValues } from "@/utils/set-default-values";
import Link from "next/link";

function HeaderSection(props: { title: string; body: string }) {
  const { setDefaultValues } = useSetDefaultValues();

  return (
    <SectionContainer contentClasses="fw-header-container">
      <h1 onClick={() => setDefaultValues()}>{props.title}</h1>
      <p>
        {`${props.body} View the instructions to use the model `}
        <span>
          <Link
            className="fw-underline"
            target="_blank"
            href={"/instructions.pdf"}
          >
            here
          </Link>
        </span>
        .
      </p>
    </SectionContainer>
  );
}

export default HeaderSection;
