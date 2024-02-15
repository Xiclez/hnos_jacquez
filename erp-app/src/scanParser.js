/*
import React, { useContext } from 'react';
import { ScanResultContext } from './ScanResultContext';

// Functional Component ParsedCode
const ParsedCode = () => {
  const code = useContext(ScanResultContext); // Assuming code is a string provided by the context
  const scanResult = parseCode(code); // Parse the code from the context

  // Display the parsed information
  return DisplayInfo(scanResult);
};

function parseCode(code) {
  let id = parseInt(code.slice(2, 16), 10);
  let weightKg = parseInt(code.slice(18, 23), 10) / 100;
  let weightLb = parseInt(code.slice(25, 30), 10) / 100;
  let serialNumber = code.slice(32);
  return {
    id,
    weightKg,
    weightLb,
    serialNumber,
  };
}

// Adjust this in the `scanParser.js` file or wherever `displayInfo` is defined
function DisplayInfo({ info }) {
  return (
    <div className="scanner-result">
      <h3>Información del producto</h3>
      <p>ID: {info.id}</p>
      <p>Peso en kg: {info.weightKg}</p>
      <p>Peso en lb: {info.weightLb}</p>
      <p>Número de serie: {info.serialNumber}</p>
    </div>
  );
}


export {parseCode,DisplayInfo};
*/