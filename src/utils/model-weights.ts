import { ProjectTypeWeights } from "@/types/project-type-weights";

export const defaultProjectWeight: ProjectTypeWeights = {
  societalWeights: 1,
  environmentalWeights: 1,
  rioWeights: 1,
};
export const societalProjectWeight: ProjectTypeWeights = {
  societalWeights: 1.5,
  environmentalWeights: 0.75,
  rioWeights: 0.75,
};

export const environmentalProjectWeight: ProjectTypeWeights = {
  societalWeights: 0.75,
  environmentalWeights: 1.5,
  rioWeights: 0.75,
};

export const rioProjectWeight: ProjectTypeWeights = {
  societalWeights: 0.75,
  environmentalWeights: 0.75,
  rioWeights: 1.5,
};
