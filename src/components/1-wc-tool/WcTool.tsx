import { useEffect, useState } from "react";
import { FileDto, WcToolService } from "../../services/WcToolService";
import "./WcTool.css";

function WcTool() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<FileDto>();

  useEffect((): void => {
    WcToolService.getAllFilesNames()
      .then((res) => {
        setFileNames(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  function handleOptionClick(fileName: string): void {
    setSelectedFileName(fileName);
    WcToolService.getFileByName(fileName)
      .then((res: FileDto) => {
        setSelectedFile(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getTextToDisplay(startContent: string, endContent: string): string {
    return `${startContent} ${endContent ? `[...] ${endContent}` : ""}`;
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
              {fileNames.map((fileName) => (
                <li key={fileName}>
                  <a
                    className={`dropdown-item ${
                      selectedFileName === fileName ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => handleOptionClick(fileName)}
                  >
                    {fileName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <h4 className="text-separator">OR</h4>
          <button className="btn btn-secondary" type="button">
            Download
          </button>
        </div>

        {selectedFile ? (
          <div className="input-group">
            <span className="input-group-text">{selectedFile.name}</span>
            <textarea
              readOnly
              className="form-control"
              aria-label="With textarea"
              value={getTextToDisplay(
                selectedFile.startContent,
                selectedFile.endContent
              )}
            ></textarea>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default WcTool;
