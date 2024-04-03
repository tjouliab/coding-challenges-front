import { REACT_APP_BASE_URL } from "../../EnvironmentVariables";

export interface FileDto {
  name: string;
  startContent: string;
  endContent: string;
}

const baseUrl = `${REACT_APP_BASE_URL}/wc-tool`;

export const WcToolService = {
  getAllFilesNames: async (): Promise<string[]> => {
    try {
      return (await fetch(`${baseUrl}/all-files-names`)).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },

  getFileByName: async (fileName: string): Promise<FileDto> => {
    try {
      return (await fetch(`${baseUrl}/file-by-name?name=${fileName}`)).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
