import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, Paper, Fade, Button } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Slider from "./slider";
import SignInForm from "./forms";
import Cookies from "js-cookie";
import { label } from "framer-motion/client";
import { useSetState } from "@mantine/hooks";
import "./lead.css";

export const Lead = () => {
  // const [selectedTag, setSelectedTag] = useState([]); // Manages selected tags
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState("");
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  // const [tagData, setTagData] = useState([]);
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [checked, setChecked] = useState(true); // Controls the Fade effect

  const onStartClick = () => {
    setChecked(false); // Start fade out when the button is clicked
    setTimeout(() => {
      setIsLandingPage(false); // Switch to the next page after the fade out
      setChecked(true); // Start fade in for the new content
    }, 500); // Delay to match the duration of the fade out
  };
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
      required: true,
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
    <>
      <Fade in={checked}>
        {isLandingPage ? (
          <Box className="landing-bg-img flex flex-col items-center w-full h-full">
            <h1 className="font-bold font-medium text-center !text-[24px] text-[#ffffff] sm:!text-[2.8rem] md:!text-[2.8rem] lg:!text-[32px] ">
              <span className="typewriter-line1">
                Lets Play
              </span>
              <br />
              <span className="typewriter-line2">Know Your Salesforce Character!</span>
            </h1>
            <Button
              onClick={onStartClick}
              style={{
                backgroundColor: "#0470EF",
                borderRadius: "20px",
                color: "white",
                fontSize: "1.6rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.8rem 3rem",
                marginRight: "8px",
                marginTop: "7rem",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
                boxShadow: "2px 6px 10px rgba(0, 0, 0, 0.2)",
                fontWeight: "bold",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(5px)";
                e.currentTarget.style.boxShadow =
                  "0px 2px 5px rgba(0, 0, 0, 0.2)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "2px 6px 10px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "2px 6px 10px rgba(0, 0, 0, 0.2)";
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = "translateY(5px)";
                e.currentTarget.style.boxShadow =
                  "0px 2px 5px rgba(0, 0, 0, 0.2)";
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0px 6px 10px rgba(0, 0, 0, 0.2)";
              }}
              onTouchCancel={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0px 6px 10px rgba(0, 0, 0, 0.2)";
              }}
            >
              Start
            </Button>
          </Box>
        ) : (
          <Box
            sx={{ flexGrow: 1 }}
            className="bg-[#F2F3F3] bg-img w-full flex flex-col justify-start items-center bg-cover md:bg-contain"
          >
            <div className="flex lg:hidden w-full justify-center items-center mt-[5rem]">
              <img src={Logo} alt="logo" className="w-[160px] " />
            </div>
            <div className="w-full sm:px-[2rem] md:px-[2rem] sm:pb-[2rem] md:pb-1 pt-[10px] ">
              <Grid
                container
                spacing={2}
                className="m-auto h-full w-full flex"
                sx={{
                  justifyContent: {
                    xs: "center",
                    sm: "flex-start",
                    md: "space-evenly",
                  },
                }}
              >
                <Grid
                  item
                  sm={0.5}
                  md={0}
                  lg={0}
                  className="hidden sm:flex md:hidden lg:hidden"
                ></Grid>
                <Grid
                  item
                  xs={10}
                  sm={7}
                  md={4}
                  className="flex !justify-start !items-start flex-wrap !flex-col sm:!pl-[3rem] xl:!pl-0 !pl-0"
                  sx={{
                    gap: "10px",

                    "@media (min-width: 768px) and (max-width: 1024px)": {
                      marginTop: "50px",
                    },
                    "@media (min-width: 1024px)": {
                      // marginTop: "10px",
                    },
                  }}
                >
                  <div className="mb-[8px]">
                    <span className="font-medium !text-[22px] text-[#17233A] sm:!text-[26px] md:!text-[22px] lg:!text-[22px] ">
                      Let's Make Things Happen Together!
                    </span>
                  </div>
                  <div className="w-full ">
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
                  className="flex justify-start !flex-col items-center h-[100vh] md:h-[100vh] !mt-[2rem] md:!mt-0 lg:!mt-0 sm:!pl-[3rem] !pl-0"
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
        )}
      </Fade>
    </>
  );
};
