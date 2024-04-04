import { REACT_APP_BASE_URL } from '../../../EnvironmentVariables';
import { FileOptions } from './wc-tool-options/WcToolOptions';

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

export interface FileCountResultDto {
  id: string;
  byteCount: number;
  charsCount: number;
  wordsCount: number;
  linesCount: number;
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
      return (
        await fetch(
          `${baseUrl}/file-by-id?${new URLSearchParams({ id: fileId })}`
        )
      ).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },

  getFilePropertiesById: async (
    fileId: string,
    fileOptions: FileOptions
  ): Promise<FileCountResultDto> => {
    try {
      return (
        await fetch(
          `${baseUrl}/file-properties-by-id?${new URLSearchParams({
            id: fileId,
            // '0' or '1' because can't use URLSearchParams with booleans
            byte: fileOptions.byte ? '1' : '0',
            chars: fileOptions.chars ? '1' : '0',
            words: fileOptions.words ? '1' : '0',
            lines: fileOptions.lines ? '1' : '0',
          })}`
        )
      ).json();
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
