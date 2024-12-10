import { useOverview } from "@/providers/overview-provider";

function ProjectSummary() {
  const overviewContext = useOverview();
  const title: string = "Project Summary";
  const body: string =
    "See the summary of all the submodels below. Download the whole report to see details.";
  return (
    <>
      {overviewContext.overviewInputs ? (
        <>
          <tbody>
            <tr className="fw-x">
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
          </tbody>
          <tbody>
            <tr className="fw-results-list-table-row__header">
              <th>Project Title</th>
              <th>Budget</th>
              <th>Project Owner</th>
              <th colSpan={2}>Project description</th>
              <th>Project type</th>
            </tr>
          </tbody>
          <tbody>
            <tr className="fw-results-list-table-row__data fw-table-spacer">
              <td>
                {overviewContext.overviewInputs.projectTitle ?? "Project X"}
              </td>
              <td>
                {/* {getScoreLabel(
                        factor.value,
                        societalModelContext.modelResults?.weights[
                          factorKey as keyof typeof societalModelContext.modelResults.weights
                        ] ?? 1
                      )} */}
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
          </tbody>
        </>
      ) : (
        <tbody>
          <tr>
            <td colSpan={6}>{`Nothing found as project overview.`}</td>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default ProjectSummary;
