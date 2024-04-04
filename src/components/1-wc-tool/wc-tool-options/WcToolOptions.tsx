import { useEffect, useState } from 'react';
import './WcToolOptions.css';

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

interface WcToolOptionsProps {
  emitOptions: (options: FileOptions) => void;
}

function WcToolOptions({ emitOptions }: WcToolOptionsProps) {
  const [options, setOptions] = useState<FileOptions>({
    byte: { activated: false, count: 0, displayText: 'Bytes' },
    chars: { activated: false, count: 0, displayText: 'Chars' },
    words: { activated: false, count: 0, displayText: 'Words' },
    lines: { activated: false, count: 0, displayText: 'Lines' },
  });

  useEffect((): void => {
    emitOptions(options);
  }, [options]);

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
      <div className='container'>
        <div className='checkbox-container'>
          {Object.entries(options).map(
            ([key, option]: [string, FileOption]) => (
              <div className='form-check' key={key}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id={key}
                  checked={option.activated}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor={key}>
                  {option.displayText}
                </label>
              </div>
            )
          )}
        </div>
        <div className='result-container'>
          {Object.entries(options).map(
            ([key, option]: [string, FileOption]) => (
              <div className='form-check' key={key}>
                {option.count}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default WcToolOptions;
