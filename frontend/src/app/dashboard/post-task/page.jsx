"use client";
import { useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/Button";
import * as Yup from "yup";
import { uploadFile, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { LoadingButton } from '@mui/lab';
// import { 
//   useSimulateContract,
//   useAccount,
//   useReadContract,
//   useContractRead
//  } from 'wagmi'
import { 
  useContractWrite, 
  usePrepareContractWrite,
  useWaitForTransaction 
 } from "wagmi";
 import {VerxioSubmitTaskABI} from "../../../components/abi/VerxioSubmitTask.json"
 import { create } from 'ipfs-http-client'
 import { Buffer } from 'buffer'
 

const projectId = "d03c7fa657ad431fb4aee1180ba3de7b"
const projectSecret = "3d8e59a2318042ab95b23190c03bc58f"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})
 
const Page = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [fileUrl, updateFileUrl] = useState(``)

  useEffect(() => {
    const unsubscribe = authSubscribe((newUser) => {
      setUser(newUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const initialValues = {
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    jobType: "",
    paymentMethod: "",
    totalPeople: "",
    amount: "",
    fileDoc: "",
  };

  const validationchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    requirements: Yup.string().required("Requirement is required"),
    jobType: Yup.string().required("Job type is required"),
    paymentMethod: Yup.string().required("Please select payment method"),
    totalPeople: Yup.number("value must be a number").required(
      "Please input amount"
    ),
    amount: Yup.number("value must be a number").required(
      "Please input amount"
    ),
    fileDoc: Yup.string().required("Please upload necessary doc"),
  });

  const submitValue = async (values) => {
    {
      console.log("Form values:", values);
      let url; 
      try {
        // Handle file upload logic
        // if (values.fileDoc !== undefined) {
        //   const added = await client.add(values.fileDoc)
        //   const url = `https://infura-ipfs.io/ipfs/${added.path}`
        //   updateFileUrl(url)
        //   console.log("IPFS URI: ", url)
        // }

        // Access the download URL and other form values here
          // console.log("upload successful!...");
          // console.log("Download URL:", url);
          const taskID = nanoid()
          const { config } = usePrepareContractWrite({
            address: '0xa2a3b38f6088d729a1454bcd2863ce87b9953079',
            abi: VerxioSubmitTaskABI,
            functionName: "submitTask",
            args: [
              taskID,
              values.title,
              values.description,
              "values.fileDocURL",
              values.totalPeople,
              values.amount,
              values.jobType,
              values.paymentMethod,
              values.responsibilities,
              values.requirements
             ],
          });
          const { data, isLoading, isSuccess, write } = useContractWrite(config);
              // Call the write function
          const transaction = write();

        // Additional logic after the transaction is submitted
        console.log("Transaction submitted:", transaction);

        console.log("Task upload successful!...", data);

        // Now you can perform additional submit logic, e.g., send data to the server
      } catch (error) {
        console.error("File Error:", error);
      }
    }
  };

  return (
    <div className="border rounded-[8px] px-[90px] py-[50px]">
      <div className="border text-center w-full py-[65px] px-[94px] font-semibold text-[32px] rounded-lg bg-post-hero-img bg-no-repeat bg-cover  bg-[rgba(0,0,0,0.1)]">
        What{" "}
        <span className="text-[#00ADEF] border-b-[2px] border-[#00ADEF] italic">
          work call
        </span>{" "}
        do you have in mind today?
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={validationchema}
      >
        {({ isValid, handleSubmit, values, dirty, setFieldValue }) => (
          <Form className="mt-6 flex flex-col gap-5 w-[80%]">
            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="title">Enter Task Title</label>
              <Field
                name="title"
                className="border outline-none rounded-[4px] border-black p-2"
              />
              <ErrorMessage name="title" component={Error} />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="description">Enter Task Description</label>
              <Field
                name="description"
                className="border outline-none rounded-[4px] border-black p-2"
              />
              <ErrorMessage name="description" component={Error} />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="responsibilities">
                Enter Task Responsibilities
              </label>
              <Field
                name="responsibilities"
                as="textarea"
                className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
              />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="requirements">Enter Task Requirements</label>
              <Field
                as="textarea"
                name="requirements"
                className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
              />
              <ErrorMessage name="requirements" component={Error} />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="jobType">Task Type</label>
              <Field
                name="jobType"
                as="select"
                className="border outline-none rounded-[4px] border-black p-2"
              >
                <option value="">select task type</option>
                <option value="quest">Quest</option>
                <option value="bounty">Bounty</option>
                <option value="contract">Contract</option>
                <option value="fulltime">Full Time</option>
              </Field>
              <ErrorMessage name="jobType" component={Error} />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="paymentMethod">Payment Token</label>
              <Field
                name="paymentMethod"
                as="select"
                className="border outline-none rounded-[4px] border-black p-2"
              >
                <option value="">select payment token eg. ICP</option>
                <option value="icp">ICP</option>
                <option value="etherum">Ethereum</option>
                <option value="solana">Solana</option>
              </Field>
              <ErrorMessage name="paymentMethod" component={Error} />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="totalPeople">
                How many people are required for the task?
              </label>
              <Field
                name="totalPeople"
                className="border outline-none rounded-[4px] border-black p-2"
              />
              <ErrorMessage name="totalPeople" component={Error} />
            </div>

            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="amount">Enter payment amount</label>
              <Field
                name="amount"
                className="border outline-none rounded-[4px] border-black p-2"
              />
              <ErrorMessage name="amount" component={Error} />
            </div>
            <div className="flex flex-col gap-3 text-16 ">
              <label htmlFor="fileDoc">Upload file (doc, pdf, png, jpg, etc.)</label>
              <input 
              name="fileDoc"
              className="border outline-none rounded-[4px] border-black p-2"
              type="file"
              onChange={(event) => setFieldValue("fileDoc", event.currentTarget.files[0])}
              />
              <ErrorMessage name="fileDoc" component={Error} />
            </div>
            <div>
              <Button
                type="submit"
                name="Submit"
                className="mt-8 w-full "
                onClick={() => {
                  if (isValid && dirty) {
                    // console.log(values);
                    submitValue(values);
                  }
                }}
              />
              {/* <LoadingButton
                type="submit"
                variant="contained"
                // color="primary"
                className="mt-8 w-full"
                loading={loading}
                onClick={() => {
                  if (isValid && dirty) {
                    submitValue(values);
                    setLoading(true);
                  }
                }}
              >
                Submit
              </LoadingButton> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;

const Error = ({ children }) => {
  return <p className="text-red-400  text-[12px] mt-[-5px]">{children}</p>;
};
