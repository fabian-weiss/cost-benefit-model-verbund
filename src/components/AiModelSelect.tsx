"use client";

import { AiModelType } from "@/enums/AiModelType";
import { useOverviewStore } from "@/stores/useOverviewStore";

export default function AiModelSelect() {
  const overViewStore = useOverviewStore();

  return (
    <div>
      <label htmlFor="model">Select AI Model:</label>
      <select
        style={{ padding: "8px", marginLeft: "8px" }}
        id="model"
        value={overViewStore.overviewInputs.aiModelType ?? AiModelType.OpenAI}
        onChange={(e) =>
          overViewStore.handleOverviewInput({
            aiModelType: e.target.value as AiModelType,
          })
        }
        // className="border rounded p-2 ml-2"
      >
        {Object.values(AiModelType).map((model) => (
          <option key={model} value={model}>
            {model.charAt(0).toUpperCase() + model.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
