import "@/styles/results-group.css";

function ResultsGroup(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="fw-results-group">
      <h3 className="fw-pb5">{props.title}</h3>
      {props.children}
    </div>
  );
}

export default ResultsGroup;
