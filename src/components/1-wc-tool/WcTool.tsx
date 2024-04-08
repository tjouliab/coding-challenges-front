import { useEffect, useState } from "react";
import {
  FileCountResultDto,
  FileDto,
  FileWithContentDto,
  WcToolService,
} from "./WcToolService";
import "./WcTool.css";

interface FileOption {
  activated: boolean;
  count: number;
  displayText: string;
}

export interface FileOptions {
  byte: FileOption;
  chars: FileOption;
  words: FileOption;
  lines: FileOption;
}

function WcTool() {
  const [files, setFiles] = useState<FileDto[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileDto>();
  const [selectedFileWithContent, setSelectedFileWithContent] =
    useState<FileWithContentDto>();
  const [countDisabled, setCountDisabled] = useState<boolean>(true);
  const [options, setOptions] = useState<FileOptions>({
    byte: { activated: false, count: 0, displayText: "Bytes" },
    chars: { activated: false, count: 0, displayText: "Chars" },
    words: { activated: false, count: 0, displayText: "Words" },
    lines: { activated: false, count: 0, displayText: "Lines" },
  });

  useEffect((): void => {
    WcToolService.getAllFiles()
      .then((res: FileDto[]) => {
        setFiles(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect((): void => {
    setCountDisabled(
      Object.values(options).every(
        (option: { activated: boolean; count: number }) => !option.activated
      )
    );
  }, [options]);

  function handleOptionClick(file: FileDto): void {
    setSelectedFile(file);
    WcToolService.getFileById(file.id)
      .then((res: FileWithContentDto) => {
        setSelectedFileWithContent(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getTextToDisplay(startContent: string, endContent: string): string {
    return `${startContent} ${endContent ? `\n[...]\n${endContent}` : ""}`;
  }

  function handleCountClick(fileId: string): void {
    WcToolService.getFilePropertiesById(fileId, options)
      .then((res: FileCountResultDto) => {
        const newOptions = { ...options };
        Object.entries(res.data).map(([key, value]: [string, number]) => {
          (newOptions as any)[key].count = value;
        });
        console.log("newOptions", newOptions);
        setOptions(newOptions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function handleChange(event: any): void {
    const { id, checked }: { id: keyof FileOptions; checked: boolean } =
      event.target;
    setOptions({
      ...options,
      [id]: { ...options[id], activated: checked },
    });
  }

  return (
    <>
      <div className="exercice-container">
        <h1>Word Count Tool</h1>
        <div className="actions-container">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select a file
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {files.map((file) => (
                <li key={file.id}>
                  <a
                    className={`dropdown-item ${
                      selectedFile === file ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => handleOptionClick(file)}
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <h4 className="text-separator">OR</h4>
          <button className="btn btn-secondary" type="button">
            Upload
          </button>
        </div>

        {selectedFileWithContent ? (
          <>
            <div className="input-group">
              <span className="input-group-text">
                {selectedFileWithContent.name}
              </span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={getTextToDisplay(
                  selectedFileWithContent.startContent,
                  selectedFileWithContent.endContent
                )}
                disabled
                readOnly
              ></textarea>
            </div>
            <h4>What do you want to count ?</h4>
            <div className="container">
              <div className="checkbox-container">
                {Object.entries(options).map(
                  ([key, option]: [string, FileOption]) => (
                    <div className="form-check" key={key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={key}
                        checked={option.activated}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={key}>
                        {option.displayText}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="result-container">
                {Object.entries(options).map(
                  ([key, option]: [string, FileOption]) => (
                    <div className="form-check" key={key}>
                      {option.count}
                    </div>
                  )
                )}
              </div>
            </div>
            <button
              className="btn btn-secondary count-btn"
              type="button"
              disabled={countDisabled}
              onClick={() => handleCountClick(selectedFileWithContent.id)}
            >
              Count
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default WcTool;
