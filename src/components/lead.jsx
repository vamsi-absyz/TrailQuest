import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Slider from "./slider";
import SignInForm from "./forms";
import Cookies from "js-cookie";
import { label } from "framer-motion/client";

export const Lead = () => {
  // const [selectedTag, setSelectedTag] = useState([]); // Manages selected tags
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState("");
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  // const [tagData, setTagData] = useState([]);

  const fields = [
    {
      name: "name",
      placeholder: "Full name",
      type: "text",
      required: true,
      label: "Full name",
    },
    {
      name: "number",
      placeholder: "Phone number",
      type: "number",
      required: false,
      label: "Contact Number",
    },
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      required: false,
      label: "Email Address",
    },
    {
      name: "company",
      placeholder: "Your company name",
      type: "text",
      required: true,
      label: "Your Company",
    },
    {
      name: "confirm",
      label: "Do you use Salesforce?",
      placeholder: "Field",
      type: "radio",
      required: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ];

  const handleFormSubmit = (data) => {
    Cookies.set("name", data.get("name") !== "" ? data.get("name") : "user");
    Cookies.set(
      "number",
      data.get("number") !== "" ? data.get("number") : "XYZ"
    );
    Cookies.set(
      "email",
      data.get("email") !== "" ? data.get("email") : "user@gmail.com"
    );
    Cookies.set(
      "company",
      data.get("company") !== "" ? data.get("company") : "XYZ"
    );
    Cookies.set(
      "isChecked",
      data.get("confirm") !== "" ? data.get("confirm") : ""
    );
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="bg-[#F2F3F3] bg-img w-full flex flex-col justify-start items-center bg-cover md:bg-contain"
    >
      <div className="flex lg:hidden w-full justify-center items-center">
        <img src={Logo} alt="logo" className="w-[110px] " />
      </div>
      <div className="w-full sm:px-[2rem] md:px-[2rem] sm:pb-[2rem] md:pb-1 pt-[10px] ">
        <Grid
          container
          spacing={2}
          className="m-auto h-full w-full flex justify-evenly"
        >
          <Grid
            item
            xs={10}
            sm={7}
            md={4}
            className="flex !justify-start !items-start flex-wrap !flex-col"
            sx={{
              gap: "10px",

              "@media (min-width: 768px) and (max-width: 1024px)": {
                marginTop: "50px",
              },
              "@media (min-width: 1024px)": {
                marginTop: "10px",
              },
            }}
          >
            <div className="mb-[8px]">
              <span className="font-medium text-[22px] text-[#17233A]">
                Let’s Make Things Happen Together!
              </span>
            </div>
            <div className="w-full">
              <SignInForm
                title="Absyz"
                onSubmit={handleFormSubmit}
                fields={fields}
              />
            </div>
          </Grid>



          {/* Carousel section */}
          <Grid
            item
            xs={8}
            sm={6}
            md={3}
            className="flex justify-start !flex-col items-center h-[100vh] md:h-[100vh] !mt-[2rem] md:!mt-0 lg:!mt-0"
          >
            <div className="justify-center items-center w-full pt-[20px] mb-[20px] hidden lg:flex">
              <img src={Logo} alt="logo" className="w-[110px] " />
            </div>
            <div className="carousel_img_lead">
              <Slider />
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
