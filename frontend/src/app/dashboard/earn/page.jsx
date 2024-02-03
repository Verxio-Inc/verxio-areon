"use client";
import JobCard from "../../../components/jobComponent/JobCard";
import { useEffect, useState, React } from "react";
import { useContractRead } from "wagmi";
import { VerxioSubmitTaskABI } from "../../../components/abi/VerxioSubmitTask.json";
import { useNav } from "../../../context/nav_context";
import { getAccount } from "@wagmi/core";
import { VerxioUserProfileABI } from "../../../components/abi/VerxioUserProfile.json";

const Page = () => {
  const { userProfileDetail, setUserProfileDetail } = useNav();
  const [userAddress, setUserAddress] = useState("");

  const user = getAccount();
  useEffect(() => {
    setUserAddress(user.address);
  }, []);

  const { data} = useContractRead({
    address: "0x596661d498cb0ec4fde296fe318123834fc0dbbf",
    abi: VerxioSubmitTaskABI,
    functionName: "getAllTasks",
  });

  // console.log("Showing job results: ", data);

  const { data: userProfile } = useContractRead({
    address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    abi: VerxioUserProfileABI,
    functionName: "getProfile",
    args: [userAddress],

    watch: true,
    onSuccess(data) {
      console.log("Success: UserProfile", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    setUserProfileDetail(userProfile);
  }, [userProfile]);

  console.log("Showing user profile: ", userProfileDetail);

  return (
    <>
      <div className="border p-[32px] rounded-2xl">
        <h2 className="text-primary text-[28px] font-semibold mb-[32px] capitalize">
          Welcome back
          {/* {userProfileDetail?.firstName} */}
        </h2>
        {data
          ?.slice()
          .reverse()
          .map((item) => (
            <JobCard key={item.taskId} jobs={item} />
          ))}
      </div>
    </>
  );
};

export default Page;
