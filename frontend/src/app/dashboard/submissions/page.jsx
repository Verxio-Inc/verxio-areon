"use client";
import React, { useState } from "react";
import Button from "../../../components/Button";
import SubmissionCard from "../../../components/submissionCard";

const Page = () => {
  const [assignees, setAssignees] = useState([]);

  const [isCheckeds, setIscheckeds] = useState(false);
  const data = [
    {
      id: 1,
      name: "Kenechukwu Ikejiani",
      role: "Frontend Engineer | Web3 Content Writer and Editor at Dataron",
      date: "Jan, 17",
      desc: "As a frontend engineer, I have collaborated with cross-functional teams to translate design concepts into responsive and interactive web applications. If you are passionate about creating clean, efficient, and visually appealing interfaces.",
    },
    {
      id: 2,
      name: "Dove Chikamso",
      role: "Community Success Manager",
      date: "Jan, 18",
      desc: "I have in-depth experience providing personalized support and guidance to community members, addressing their individual needs and concerns which I think makes me fit for this role role.",
    },
    {
      id: 3,
      name: "Kinglsey Aniakor",
      role: "Customer Relationship Manager at Glow Inc ",
      date: "Jan, 20",
      desc: "Ready & willing to bring my expertise onboard and hold others accountable to actions that create progress & community success. I also have proven experience in community management, customer success, or related roles",
    },
      {
      id: 4,
      name: "Janet Obiakor",
      role: "Community Manager at Axio Lab",
      date: "Jan, 21",
      desc: "I can fully deliver on the expectations of this role because I have collaborated with subject matter experts and industry professionals to develop relevant and valuable content for the community. That network and experience is what I hope to bring on board the team.",
    },
  ];

  const selectUser = (item) => {
    setIscheckeds(!isCheckeds);

    const existingitem = assignees.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingitem !== -1) {
      assignees.splice(existingitem, 1);
    } else {
      setAssignees([...assignees, item]);
    }
  };

  console.log("assignees", assignees);

  return (
    <div className="border rounded-lg px-[41px] py-[37px]">
      <div className="flex justify-between mb-9 ">
        <h2 className="text-primary text-[28px] font-semibold capitalize">
          Submissions
        </h2>
        <Button outline name="assign" />
      </div>

      {data.map((item) => (
        <SubmissionCard
          key={item.id}
          item={item}
          selectUser={selectUser}
          isChecked={isCheckeds}
        />
      ))}
    </div>
  );
};

export default Page;
