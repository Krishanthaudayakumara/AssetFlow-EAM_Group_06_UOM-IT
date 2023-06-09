
import React, { useEffect, useState } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import "../../css/Facilitycss/AssetCard.css";

import axios from "axios";

type SubCategoryCountDto = {
  subCategoryType: string;
  itemCount: number;
};

type AssetCardProps = {
  workstationId: number;
  subcategoryCount: number;
};

function AssetCard({ workstationId, subcategoryCount }: AssetCardProps) {
  const [subCategoryCounts, setSubCategoryCounts] = useState<SubCategoryCountDto[]>([]);

  useEffect(() => {
    fetchSubCategoryCounts();
  }, []);

  const fetchSubCategoryCounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5087/api/Workstation/GetItemCountPerSubCategory/${workstationId}`
      );
      setSubCategoryCounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Custom_Card">
      {subCategoryCounts.slice(0, subcategoryCount).map((subCategoryCount) => (
        <div className="Asset_card" key={subCategoryCount.subCategoryType}>
          <div className="Asset_name">
            <div className="Ellipseicon-cantainer">
              <IoEllipsisHorizontalSharp />
            </div>
            <div className="Asset_info">
              <div className="Subcategory">{subCategoryCount.subCategoryType}</div>
              <div className="ItemCount">{subCategoryCount.itemCount}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AssetCard;
