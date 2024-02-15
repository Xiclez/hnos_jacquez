import React, { useState, useContext } from 'react';
import App from './barcode.js';
import { ScanResultContext } from './ScanResultContext'; // Ensure this context is exported from barcode.js

function EntradaScanner() {
  const [showAlert, setShowAlert] = useState(false);
  const scanData = useContext(ScanResultContext); // Use context to access scan data
  
  const handleScanComplete = () => {
    // Assuming App calls this function when a scan is successfully completed
    setShowAlert(true); // Simply show the alert, scanData is accessed via context
  };

  // DisplayInfo logic is now assumed to be part of the App component or accessed via context
  return (
    <div>
      <h2>Registrar Entrada</h2>
      <App onScanComplete={handleScanComplete} />
      {showAlert && scanData && (
        <div className="alert">
          {/* Display scan result details. Adjust according to how DisplayInfo is integrated in App */}
          <h3>Información del producto</h3>
          <p>ID: {scanData.id}</p>
          <p>Peso en kg: {scanData.weightKg}</p>
          <p>Peso en lb: {scanData.weightLb}</p>
          <p>Número de serie: {scanData.serialNumber}</p>
          <button onClick={() => setShowAlert(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default EntradaScanner;
