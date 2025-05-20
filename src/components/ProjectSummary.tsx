import { useOverviewStore } from "@/stores/useOverviewStore";

function ProjectSummary() {
  const overviewContext = useOverviewStore();
  const title: string = "Project Summary";
  const body: string =
    "See the summary of all the submodels below. Download the whole report to see details.";
  return (
    <>
      {overviewContext.overviewInputs ? (
        <>
          <tr>
            <th colSpan={6} className="fw-dialog-title">
              {title}
            </th>
          </tr>
          {/* Subtitle Row */}
          <tr>
            <th colSpan={6} className="fw-dialog-subtitle">
              {body}
            </th>
          </tr>
          <tr className="fw-results-list-table-row__header">
            <th className="fw-table-default-col" colSpan={1}>
              Project Title
            </th>
            <td className="fw-table-large-col" colSpan={5}>
              {overviewContext.overviewInputs.projectTitle ?? "Project X"}
            </td>
          </tr>
          <tr className="fw-results-list-table-row__header">
            <th colSpan={1}>Budget</th>
            <td colSpan={5}>
              €{overviewContext.overviewInputs.budget ?? "10.000,00"}
            </td>
          </tr>
          <tr className="fw-results-list-table-row__header">
            <th colSpan={1}>Project Owner</th>
            <td colSpan={5}>
              {overviewContext.overviewInputs.projectOwner ?? "John Doe"}
            </td>
          </tr>
          <tr className="fw-results-list-table-row__header">
            <th colSpan={1}>Project description</th>
            <td colSpan={5}>
              {overviewContext.overviewInputs.projectDescription ??
                "A project that changes the world"}
            </td>
          </tr>
          <tr className="fw-results-list-table-row__header">
            <th colSpan={1}>Project type</th>
            <td colSpan={5}>{overviewContext.overviewInputs.projectType}</td>
          </tr>
          <tr>
            <td className="fw-table-spacer" colSpan={6}></td>
          </tr>
          {/* <tbody>
            <tr className="fw-results-list-table-row__data fw-table-spacer">
              <td>
                {overviewContext.overviewInputs.projectTitle ?? "Project X"}
              </td>
              <td>
               
                €{overviewContext.overviewInputs.budget ?? "10.000,00"}
              </td>
              <td>
                {overviewContext.overviewInputs.projectOwner ?? "John Doe"}
              </td>
              <td colSpan={2}>
                {overviewContext.overviewInputs.projectDescription ??
                  "A project that changes the world"}
              </td>
              <td>{overviewContext.overviewInputs.projectType}</td>
            </tr>
          </tbody> */}
        </>
      ) : (
        <tr>
          <td colSpan={6}>{`Nothing found as project overview.`}</td>
        </tr>
      )}
    </>
  );
}

export default ProjectSummary;
