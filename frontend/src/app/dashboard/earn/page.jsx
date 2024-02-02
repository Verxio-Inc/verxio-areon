"use client";

import JobCard from "../../../components/jobComponent/JobCard";
import { useEffect, useState, React } from "react";
import {
  useSimulateContract,
  useAccount,
  useReadContract,
  useContractRead,
} from "wagmi";
import { VerxioSubmitTaskABI } from "../../../components/abi/VerxioSubmitTask.json";
import { useNav } from "../../../context/nav_context";
import { getAccount } from "@wagmi/core";
import { VerxioUserProfileABI } from "../../../components/abi/VerxioUserProfile.json";

const Page = () => {
  const { userProfileDetail, setUserProfileDetail } = useNav();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const user = getAccount();
    setUserAddress(user.address);
  }, []);

  const { data, isError, isLoading, refetch } = useContractRead({
    address: "0x596661d498cb0ec4fde296fe318123834fc0dbbf",
    abi: VerxioSubmitTaskABI,
    functionName: "getAllTasks",
  });

  console.log("Showing job results: ", data);

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
  }, [ setUserProfileDetail, userProfile]);

  console.log("Showing user profile: ", userProfileDetail);

  return (
    <>
      <div className="border p-[32px] rounded-2xl">
        <h2 className="text-primary text-[28px] font-semibold mb-[32px] capitalize">
          Welcome back {userProfileDetail?.firstName}
        </h2>
        {data?.map((item) => (
          <JobCard key={item.key} jobs={item} />
        ))}
      </div>
    </>
  );
};

export default Page;
