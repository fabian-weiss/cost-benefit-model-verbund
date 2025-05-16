import { ProjectType } from "@/enums/ProjectType";
import { ProjectTypeWeights } from "@/types/project-type-weights";

export const defaultProjectWeight: ProjectTypeWeights = {
  societalWeights: 1,
  environmentalWeights: 1,
  rioWeights: 0.2,
};
export const maxDefaultProjectScore: number = 1 + 0.2;
export const minDefaultProjectScore: number = -1 - 0.2;
export const societalProjectWeight: ProjectTypeWeights = {
  societalWeights: 1.5,
  environmentalWeights: 1,
  rioWeights: 0.2,
};
export const maxSocietalProjectScore: number = 2.5 / 2 + 0.2;
export const minSocietalProjectScore: number = -2.5 - 0.2;

export const environmentalProjectWeight: ProjectTypeWeights = {
  societalWeights: 1,
  environmentalWeights: 1.5,
  rioWeights: 0.2,
};
export const maxEnvironmentalProjectScore: number = 2.5 / 2 + 0.2;
export const minEnvironmentalProjectScore: number = -2.5 - 0.2;

export const rioProjectWeight: ProjectTypeWeights = {
  societalWeights: 1,
  environmentalWeights: 1,
  rioWeights: 0.4,
};
export const maxRioProjectScore: number = 2 + 0.4;
export const minRioProjectScore: number = -2 - 0.4;

export const getMinMaxBasedOnProjectType = (
  projecType?: ProjectType
): { min: number; max: number } => {
  switch (projecType) {
    case ProjectType.DEFAULT:
      return { min: minDefaultProjectScore, max: maxDefaultProjectScore };
    case ProjectType.SOCIAL:
      return { min: minSocietalProjectScore, max: maxSocietalProjectScore };
    case ProjectType.SUSTAINABLE:
      return {
        min: minEnvironmentalProjectScore,
        max: maxEnvironmentalProjectScore,
      };
    case ProjectType.INNOVATIVE:
      return { min: minRioProjectScore, max: maxRioProjectScore };
    default:
      return { min: minDefaultProjectScore, max: maxDefaultProjectScore };
  }
};
