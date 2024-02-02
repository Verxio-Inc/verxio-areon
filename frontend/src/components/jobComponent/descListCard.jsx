import React from "react";

const DescListCard = ({ label, type, value }) => {
  return (
    <>
      <h2 className="font-semibold text-[16px] mb-5 capitalize ">{label}:</h2>
      {type === "list" ? (
        <ul className="mb-5 list-disc mx-6">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mb-5 text-[14px]">{value}</p>
      )}
    </>
  );
};

export default DescListCard;
