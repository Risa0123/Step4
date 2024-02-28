import React, { useState, useEffect, useRef } from "react";
import { useZxing } from "react-zxing";

interface BarcodeReaderProps {
  onScan: (result: string) => void;
}

const LIFFBarcodeReader: React.FC<BarcodeReaderProps> = ({ onScan }) => {
  const [barcodeError, setBarcodeError] = useState<string | null>(null);
  const [lastScans, setLastScans] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  const { ref } = useZxing({
    onError(error) {
      setBarcodeError(error.toString());
      console.log(barcodeError);
    },
    onDecodeResult(result) {
      const newDecodedText = result.getText();
      const updatedScans = [...lastScans, newDecodedText].slice(-3);
      setLastScans(updatedScans);

      setCount(currentCount => currentCount + 1);
      console.log(count);

      if (
        updatedScans.length === 3 &&
        updatedScans.every(code => code === newDecodedText)
      ) {
        onScan(newDecodedText);
        setCount(0);
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-start pt-10">
      {barcodeError && <p className="text-red-500">{barcodeError}</p>}
      <div className="flex flex-col items-center">
        <p className="text-lg text-gray-600 font-semibold mt-2">
          カメラをバーコードに向けてください(3回読み込みます)
        </p>
        <video ref={ref} className="border-4 border-gray-400 mt-4" />
        <p>
          <span>読み取り成功回数:{count}</span>
        </p>
      </div>
    </div>
  );
};

export default LIFFBarcodeReader;
