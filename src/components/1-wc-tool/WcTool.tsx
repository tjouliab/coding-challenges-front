import { useEffect, useState } from "react";
import { WcToolService } from "../../services/WcToolService";
import "./WcTool.css";

function WcTool() {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);

  useEffect((): void => {
    WcToolService.getAllFilesNames()
      .then((res) => {
        console.log("res", res);
        setFileNames(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          // onClick={onclick()}
        >
          Select a file
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {fileNames.map((fileName) => (
            <li key={fileName}>
              <a className="dropdown-item" href="#">
                {fileName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default WcTool;
