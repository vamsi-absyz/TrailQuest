import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Slider from "./slider";
import SignInForm from "./forms";
import Cookies from "js-cookie";

export const Lead = () => {
    // const [selectedTag, setSelectedTag] = useState([]); // Manages selected tags
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedId, setSelectedId] = useState("");
    const isTabletOrLarger = useMediaQuery("(min-width: 768px)");
    const navigate = useNavigate();
    // const [tagData, setTagData] = useState([]);

    const fields = [
        { name: "name", placeholder: "Full name", type: "text", required: true },
        { name: "number", placeholder: "Phone number", type: "number", required: false },
        { name: "email", placeholder: "Email address", type: "email", required: false },
        { name: "company", placeholder: "Your company name", type: "text", required: false },
    ];

    const handleFormSubmit = (data) => {
        Cookies.set("name", data.get("name"));
        Cookies.set("number", data.get("number"));
        Cookies.set("email", data.get("email"));
        Cookies.set("company", data.get("company"));
    };

    return (
        <Box
            sx={{ flexGrow: 1 }}
            className="bg-[#F2F3F3] bg-img w-full flex flex-col justify-start items-center bg-cover md:bg-contain"
        >
            <div className="w-full sm:px-[2rem] md:px-[2rem] sm:pb-[2rem] md:pb-1 pt-[10px] ">
                <Grid
                    container
                    spacing={2}
                    className="m-auto h-full w-full flex justify-evenly"
                >
                    <Grid
                        item
                        xs={5}
                        sm={5}
                        md={4.5}
                        className="flex justify-start items-start flex-wrap !flex-col "
                        style={{ gap: "10px", marginTop: "60px" }}
                    >
                        <div className="mb-[8px]">
                            <span className="font-medium text-[22px] text-[#17233A]">
                                Let’s Make Things Happen Together!
                            </span>
                        </div>
                        <div className="w-full">
                            <div className="mb-[1rem]">
                                <span>Please fill the details</span>
                            </div>
                            <SignInForm title="Absyz" onSubmit={handleFormSubmit} fields={fields} />
                        </div>
                    </Grid>

                    <Grid item xs={2}></Grid>

                    {/* Carousel section */}
                    <Grid
                        item
                        xs={4}
                        sm={3}
                        md={3}
                        className="flex justify-end !flex-col items-center h-[100vh] md:h-[100vh]"
                    >
                        <div className="carousel_img">
                            {/* <Carousels /> */}
                            <Slider />
                        </div>
                        <div className="flex justify-center items-center w-full pt-[20px]">
                            <img src={Logo} alt="logo" className="w-[110px] " />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};
