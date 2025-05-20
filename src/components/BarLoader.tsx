import "@/styles/bar-loader.css";

function BarLoader(props: { width?: string; height?: string }) {
  return (
    // <div className="fw-section-container">
    <div
      style={{
        width: props.width ?? "100vw",
        height: props.height ?? "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // paddingBottom: "calc(var(--default-padding)*2)",
      }}
    >
      <div className="fw-bar-loader-container">
        <div className="fw-loading-bar" />
      </div>
    </div>
    // </div>
  );
}

export default BarLoader;
