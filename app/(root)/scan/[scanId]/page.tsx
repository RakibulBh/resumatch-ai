import React from "react";

const ScanDetails = ({ params }: { params: { scanId: string } }) => {
  return <p>Post: {params.scanId}</p>;
};

export default ScanDetails;
