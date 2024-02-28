import React from "react";

interface Product {
  PRD_CD: string;
  PRD_NAME: string;
  PRD_PRICE: number;
  // 他にも製品情報があれば追加する
}

interface ProductDisplayProps {
  product: Product;
}

const LIFFProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <div className="w-full max-w-md p-4 border-2 border-blue-500 rounded my-4">
      <div className="flex justify-between">
        <span className="font-bold">コード:</span>
        <span>{product?.PRD_CD || "該当なし"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">名称:</span>
        <span>{product?.PRD_NAME || "該当なし"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">単価:</span>
        <span>{product?.PRD_PRICE || "該当なし"}</span>
      </div>
      {/* その他の製品情報を表示する */}
    </div>
  );
};

export default LIFFProductDisplay;
