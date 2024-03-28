import { REACT_APP_BASE_URL } from "../../EnvironmentVariables";

const baseUrl = `${REACT_APP_BASE_URL}/wc-tool`;

export const WcToolService = {
  getAllFilesNames: async (): Promise<string[]> => {
    try {
      return (await fetch(`${baseUrl}/all-files-names`)).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
