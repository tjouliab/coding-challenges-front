import { useEffect, useState } from 'react';
import { FileDto, FileWithContentDto, WcToolService } from './WcToolService';
import './WcTool.css';

function WcTool() {
  const [files, setFiles] = useState<FileDto[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileDto>();
  const [selectedFileWithContent, setSelectedFileWithContent] =
    useState<FileWithContentDto>();

  useEffect((): void => {
    WcToolService.getAllFiles()
      .then((res: FileDto[]) => {
        setFiles(res);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleOptionClick(file: FileDto): void {
    setSelectedFile(file);
    WcToolService.getFileById(file.id)
      .then((res: FileWithContentDto) => {
        setSelectedFileWithContent(res);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  function getTextToDisplay(startContent: string, endContent: string): string {
    return `${startContent} ${endContent ? `\n[...]\n${endContent}` : ''}`;
  }

  return (
    <>
      <div className='exercice-container'>
        <h1>Word Count Tool</h1>
        <div className='actions-container'>
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              id='dropdownMenuButton'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Select a file
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              {files.map((file) => (
                <li key={file.id}>
                  <a
                    className={`dropdown-item ${
                      selectedFile === file ? 'active' : ''
                    }`}
                    href='#'
                    onClick={() => handleOptionClick(file)}
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <h4 className='text-separator'>OR</h4>
          <button className='btn btn-secondary' type='button'>
            Download
          </button>
        </div>

        {selectedFileWithContent ? (
          <>
            <div className='input-group'>
              <span className='input-group-text'>
                {selectedFileWithContent.name}
              </span>
              <textarea
                readOnly
                className='form-control'
                aria-label='With textarea'
                value={getTextToDisplay(
                  selectedFileWithContent.startContent,
                  selectedFileWithContent.endContent
                )}
              ></textarea>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default WcTool;
