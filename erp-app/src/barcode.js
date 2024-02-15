import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

// Context for sharing the scan result across components
const ScanResultContext = React.createContext('');

function App() {
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          const selectedDeviceId = videoInputDevices[0].deviceId;
          codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
            if (result) {
              setScanResult(result.getText()); // Process the result here
              codeReader.reset(); // Stop decoding after receiving a result
            }
            if (err && err !== 'NotFoundException') {
              console.error(err); // Log errors here
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      codeReader.reset(); // Stop decoding when the component unmounts
    };
  }, []);

  const handleFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const image = await fileToImage(file);
      const codeReader = new BrowserMultiFormatReader();
      try {
        const result = await codeReader.decodeFromImage(undefined, image.src);
        setScanResult(result.getText());
      } catch (error) {
        console.error('Error decoding file', error);
        setScanResult('No QR code or Code 128 found');
      } finally {
        codeReader.reset();
      }
    }
  };

  const fileToImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <ScanResultContext.Provider value={scanResult}>
      <div className="App">
        <header className="App-header">
          <h2>QR and Code 128 Scanner</h2>
          <video ref={videoRef} style={{ width: '100%' }}></video>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {scanResult && <p>Scan Result: {scanResult}</p>}
          <ParsedCode /> {/* Render ParsedCode component */}
        </header>
      </div>
    </ScanResultContext.Provider>
  );



}

const ParsedCode = () => {
  const code = useContext(ScanResultContext); // Assuming code is a string provided by the context
 // if (!code) return null; // Return null if there is no code to prevent parsing errors
  useEffect(() => {
    if (code) {
      const scanResult = parseCode(code);
      console.log(scanResult);
      // Show the parsed information in an alert pop-up
      alert(`Información del producto:
ID: ${scanResult.id}
Peso en kg: ${scanResult.weightKg}
Peso en lb: ${scanResult.weightLb}
Número de serie: ${scanResult.serialNumber}`);
    }
  }, [code]); // This effect depends on `code`
  //const scanResult = parseCode(code); // Parse the code from the context

  // Display the parsed information
  //return <DisplayInfo info={scanResult} />;
  
  return code;
};

function parseCode(code) {
  const idPattern = /\(01\)(\d+)/;
  const weightKgPattern = /\(3102\)(\d+)/;
  const weightLbPattern = /\(3202\)(\d+)/;
  const serialNumberPattern = /\(21\)(\d+)/;

  const idMatch = code.match(idPattern);
  const weightKgMatch = code.match(weightKgPattern);
  const weightLbMatch = code.match(weightLbPattern);
  const serialNumberMatch = code.match(serialNumberPattern);

  const id = idMatch ? parseInt(idMatch[1], 10) : null;
  // Divide by 100 to convert to the correct unit since the input is without a decimal point
  const weightKg = weightKgMatch ? parseInt(weightKgMatch[1], 10) / 100 : null;
  const weightLb = weightLbMatch ? parseInt(weightLbMatch[1], 10) / 100 : null;
  const serialNumber = serialNumberMatch ? serialNumberMatch[1] : null;

  const parsedCodeArray = [];
  parsedCodeArray.push(id);
  parsedCodeArray.push(weightKg);
  parsedCodeArray.push(weightLb);
  parsedCodeArray.push(serialNumber);

  console.log(parsedCodeArray);

  return {
    id,
    weightKg,
    weightLb,
    serialNumber,
  };


}
export default App;
