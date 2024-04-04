import { REACT_APP_BASE_URL } from '../../../EnvironmentVariables';

export interface FileDto {
  id: string;
  name: string;
}

export interface FileWithContentDto {
  id: string;
  name: string;
  startContent: string;
  endContent: string;
}

const baseUrl = `${REACT_APP_BASE_URL}/wc-tool`;

export const WcToolService = {
  getAllFiles: async (): Promise<FileDto[]> => {
    try {
      return (await fetch(`${baseUrl}/all-files-names`)).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },

  getFileById: async (fileId: string): Promise<FileWithContentDto> => {
    try {
      return (await fetch(`${baseUrl}/file-by-id?id=${fileId}`)).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
