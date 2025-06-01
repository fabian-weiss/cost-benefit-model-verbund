import { AiModelType } from "@/enums/AiModelType";
import { ProjectType } from "@/enums/ProjectType";

export type OverviewInputs = {
  projectTitle?: string;
  projectDescription?: string;
  projectOwner?: string;
  budget?: number;
  projectType?: ProjectType;
  enableFinancial?: boolean;
  aiModelType?: AiModelType;
};
