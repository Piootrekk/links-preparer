import { useState } from "react";
import { temperMonkeyScript } from "@/other/tmpScript";
import { getData } from "./LocalStorage";

export type TConfig = {
  doubleInput: {
    mask: string;
    content: string;
  }[];
  script: string;
};

const useConfigScript = () => {
  const storageConfig = getData("config");
  const [config, setConfig] = useState<TConfig>(
    storageConfig !== undefined
      ? storageConfig
      : {
          doubleInput: [
            {
              mask: "",
              content: "",
            },
          ],
          script: temperMonkeyScript,
        }
  );

  const incrementDoubleInput = () => {
    setConfig((prev) => ({
      ...prev,
      doubleInput: [
        ...prev.doubleInput,
        {
          mask: "",
          content: "",
        },
      ],
    }));
  };
  const removeLiastDoubleInput = () => {
    if (config.doubleInput.length > 1) {
      setConfig((prev) => ({
        ...prev,
        doubleInput: prev.doubleInput.slice(0, -1),
      }));
    }
  };
  return {
    config,
    setConfig,
    incrementDoubleInput,
    removeLiastDoubleInput,
  };
};

export default useConfigScript;
