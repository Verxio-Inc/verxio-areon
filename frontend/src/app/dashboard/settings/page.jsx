"use client";
import { useContext, useEffect, useState, React, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/Button";
import Edit from "../../../assets/edit.svg";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import {
  useContractWrite,
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { VerxioUserProfileABI } from "../../../components/abi/VerxioUserProfile.json";
import { getAccount } from "@wagmi/core";
import { root } from "../../../../store";
import { setUserProfile } from "../../../../slices/jobSlice";
import { useNav } from "../../../context/nav_context";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [userBIO, setUserBIO] = useState("");

  const dispatch = useDispatch();
  const router = useRouter


  const userProfile2 = useSelector(
    (state) => state.persistedReducer.jobValues.userProfile
  );

  const {userProfile3, setUserProfile3} = useNav()

  const user = getAccount();
  const userAddress = user.address;
  const { userProfileDetail, setUserProfileDetail } = useNav();;

  console.log("User Info: ", userAddress);

  const { data: userProfile } = useContractRead({
    address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    // address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    abi: VerxioUserProfileABI,
    functionName: "getProfile",
    args: [userAddress],
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
    dispatch(setUserProfile(userProfile));
    setUserProfile3(userProfile2)
  }, []);

  // use userProfile3 if dispatch own is confusing you, if it works, i will change it to the dispatch own.. cause it will be important..


  // console.log("Showing user profile: ", userProfile);
  // console.log("Showing user profile2: ", userProfile2);// this is dispatch own,
    
  console.log("Showing user profile3: ", userProfile3);// this is useNav own....

  const { config } = usePrepareContractWrite({
    // address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    abi: VerxioUserProfileABI,
    functionName: "updateProfile",
    args: [
      firstName,
      lastName,
      phoneNumber,
      userEmail,
      websiteURL,
      "profile-testurl.com",
      "document-testurl.com",
      userBIO,
    ],
      userBIO,
    ],
  });

  const {
    data: updateProfileData,
    isLoading: isUpdatingProfile,
    isSuccess: isProfileUpdated,
    write: updateProfileWrite,
    isError: isUpdatingProfileError,
  } = useContractWrite(config);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    phoneNumber: "",
    website: "",
    fileDoc: "",
    profileImageDoc: "",
  };

  const validationchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    bio: Yup.string().required("Bio is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.number("value must be a number").required(
      "Please input number"
    ),
    fileDoc: Yup.string().required("Please upload necessary doc"),
  });

  const submitValue = async (values) => {
    {
      console.log("Image Profile: ", selectedImage);
      console.log("Form values:", values);
      console.log("Uploading Files...");

      setFirstName(values.firstName),
        setLastName(values.lastName),
        setUserBIO(values.bio),
        setUserEmail(values.email),
        setPhoneNumber(values.phoneNumber),
        setWebsiteURL(values.website);
      try {
        const transaction = write();
        // Additional logic after the transaction is submitted
        console.log("Transaction submitted:", transaction);

        console.log("Task upload successful!...", data);
        // if (values.fileDoc !== undefined) {}

        console.log("Profile upload successful!...");

        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setUserEmail("");
        setUserBIO("");
        setWebsiteURL("");

        // Now you can perform additional submit logic, e.g., send data to the server
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }
  };

  return (
    <>
      <div>
        <form
          className="mt-8 flex flex-col gap-5 w-[80%] "
          onSubmit={handleUpdateProfile}
        >
          <div className="flex relative justify-center -mt-24 mb-14">
            <div className="w-[200px] h-[200px] bg-slate-500  border-[8px] border-white rounded-full absolute -top-[100px]">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="profile picture"
                  width={200}
                  height={200}
                  className="w-full h-full rounded-full bg-cover"
                />
              )}
              <div
                className="bg-white p-[10px] rounded-full z-20 absolute -right-2 shadow-md top-[124px] cursor-pointer "
                onClick={handleUploadButtonClick}
              >
                <Image src={Edit} alt="Edit image" className=" w-6" />
              </div>
            </div>
            <input
              name="profileImageDoc"
              type="file"
              capture="environment"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="firstName">First Name</label>

            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="firstName"
              placeholder="John"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>
          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Doe"
              name="lastName"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="bio">User Bio</label>
            <textarea
              value={userBIO}
              onChange={(e) => setUserBIO(e.target.value)}
              id="bio"
              cols="30"
              rows="10"
              placeholder="Tell us about you"
              name="bio"
              className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="email">Contact Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="123-456-7890"
              name="phoneNumber"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>
          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="website">Website</label>
            <input
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
              type="text"
              placeholder="www.insertyourlink.com"
              name="website"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>

              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="fileDoc">
                  Upload file (doc, pdf, png, jpg, etc.)
                </label>
                <input
                  name="fileDoc"
                  className="border outline-none rounded-[4px] border-black p-2"
                  type="file"
                  onChange={(event) =>
                    setFieldValue("fileDoc", event.currentTarget.files[0])
                  }
                />
                <ErrorMessage name="fileDoc" component={Error} />
              </div>
              <div>
                <Button
                  type="submit"
                  name="Update Profile"
                  className="mt-8 w-full "
                  isLoading={true}
                  onClick={() => {
                    if (isValid && dirty) {
                      // console.log(values);
                      submitValue(values);
                      // router.push('/dashboared/earn') 
                      //condition for above, if successful then router.push
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
    </>
  );
};

export default Page;