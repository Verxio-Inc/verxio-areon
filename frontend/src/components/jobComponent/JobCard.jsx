"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Thumbsup from "../../assets/thumbs-up.svg";
import Thumbsdown from "../../assets/thumbs-down.svg";
import Comment from "../../assets/comment.svg";
import Ethereum from "../../assets/ethereum.svg";
import ICP from "../../assets/icp-logo.svg";
import Solana from "../../assets/solana-logo.svg";
import USDC from '../../assets/usdc-logo.svg'
import USDT from '../../assets/usdt-logo.svg'
import Button from "../Button";
import { setJobDetails } from "../../../slices/jobSlice";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { useNav } from "../../context/nav_context";
import { useSelector, useDispatch } from "react-redux";

const JobCard = ({ jobs }) => {
  // console.log(jobs);

  const dispatch = useDispatch();

  const logo = (coin) => {
    if (coin === "icp") {
      return ICP;
    } else if (coin === "etherum") {
      return Ethereum;
    } else if (coin === "solana") {
      return Solana;
    } else if (coin === 'USDT'){
      return USDT
    } else if (coin === 'USDC'){
      return USDC
    }
  };


  const handleDescription = () => {
    const updatedDetails = {
      ...jobs,
      amount:
        typeof jobs.amount === "bigint" ? Number(jobs.amount) : jobs.amount,
      downvotes:
        typeof jobs.downvotes === "bigint"
          ? Number(jobs.downvotes)
          : jobs.downvotes,
      upvotes:
        typeof jobs.upvotes === "bigint" ? Number(jobs.upvotes) : jobs.upvotes,
      postedTime:
        typeof jobs.postedTime === "bigint"
          ? Number(jobs.postedTime)
          : jobs.postedTime,
      totalPeople:
        typeof jobs.totalPeople === "bigint"
          ? Number(jobs.totalPeople)
          : jobs.totalPeople,
    };
    dispatch(setJobDetails(updatedDetails));
  };

  return (
    <div className="bg-[#FFFFFF] sm:px-[32px] sm:py-[24px] rounded-2xl shadow mb-[34px]">
      <div className="rounded-2xl bg-[#F7F7FD] p-[18px] ">
        <div className="  flex justify-between">
          <div className=" flex gap-4">
            <div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 aspect-square object-cover rounded-full border" />
              {/* <image
              src={jobs?.jobPosterProfileUrl}
              alt="profile image"
              width={100}
              height={100}
            /> */}
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-[#020202] text-[18px] font-semibold capitalize">
                  {jobs.jobPosterFirstName} {jobs.jobPosterLastName}
                </p>
                <p className="font-normal text-[14px] text-[#424242]">
                  {jobs.jobPosterBio}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[#0B0B28] text-[16px] font-semibold capitalize">
            open
          </p>
        </div>
        <p className="text-[#484851] font-normal lg:truncate sm:max-w-[400px] mt-3 sm:ml-5 text-[14px]">
          {jobs.jobTitle}
        </p>
      </div>
      <div className="flex justify-between mt-[22px] items-center">
        <div className=" flex gap-[24px] items-center">
          <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center">
            <div className="flex gap-1 items-center border-r pr-2 mr-2">
              <Image alt="like it" src={Thumbsup} className="cursor-pointer" />
              <p className="text-[12px]">{Number(jobs.upvotes)}</p>
            </div>
            <Image
              alt="dislike it"
              src={Thumbsdown}
              className="cursor-pointer"
            />
          </div>
          <div className="border rounded-lg px-4 py-[9px] border-[#B6B8EC] flex gap-2 items-center">
            <Image
              alt="comment on it"
              src={Comment}
              className="cursor-pointer"
            />
            <p className="text-[12px]">0</p>
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center gap-2">
            <p className="text-[15px] font-medium">{Number(jobs.amount)}</p>
            {/* <span className="text-[8px] mr-1">$300</span> */}
            <Image
              alt="Ethereum"
              src={logo(jobs.paymentMethod)}
              className="w-[16px]"
            />
          </div>
          <Button
            href="/dashboard/earn/job-description"
            onClick={() => handleDescription()}
            outline
            name="Apply"
            className="text-[#00ADEF]"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
