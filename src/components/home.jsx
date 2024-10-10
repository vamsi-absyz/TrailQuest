import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
// import { Carousels } from "./carousel";
import { useNavigate } from "react-router-dom";
import { Modal } from "./modal";
import Logo from "../assets/images/logo.png";
import Slider from "./slider";
import Cookies from "js-cookie";

import { Grid, createTheme, ThemeProvider } from '@mui/material';

// Create a custom theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
export const Home = () => {
  const [selectedTag, setSelectedTag] = useState([]); // Manages selected tags
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const isTabletOrLarger = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    if (characterData) {
      const allTagsWithId = characterData
        .map((character) =>
          character.tags.map((tag) => ({ id: character.id, tag }))
        )
        .flat();


      const shuffledTags = allTagsWithId.sort(() => Math.random() - 0.5);

      setTagData(shuffledTags);
    }
  }, []);

  const handleClick = (tag, id) => {
    const tagObject = { tag, id };

    if (selectedTag.some((t) => t.tag === tag)) {
      const newSelectedTags = selectedTag.filter((t) => t.tag !== tag);
      setSelectedTag(newSelectedTags);
    } else if (selectedTag.length < 6) {
      const newSelectedTags = [...selectedTag, tagObject];
      setSelectedTag(newSelectedTags);
    }

    if (selectedTag.length === 5 && !selectedTag.some((t) => t.tag === tag)) {
      setIsModalOpen(true);
    }

    if (!isTabletOrLarger && selectedTag.length === 5) {
      navigate(`/character/`, { state: selectedTag });
    }
  };

  const handleCloseModal = () => {
    // setSelectedId("");
    // setIsModalOpen(false);
    // setSelectedTag([]);
    // window.location.reload();
    navigate("/");
    Cookies.remove("name");
    Cookies.remove("confirm")
    Cookies.remove("number")
    Cookies.remove("email");
    Cookies.remove("company")
  };

  useEffect(() => {
    const user = Cookies.get("name");
    if (user === undefined) {
      navigate("/")
    }
  })

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="bg-[#F2F3F3] bg-img w-full flex flex-col justify-start items-center bg-cover md:bg-contain"
    >

      <div className="flex lg:hidden w-full justify-center items-center sm:!my-[5rem] mt-4">
        <img src={Logo} alt="logo" className="w-[160px] " />
      </div>

      <div className="m-auto sm:px-[2rem] md:px-[2rem] sm:pb-[2rem] md:pb-1 pt-[10px] ">
        {/* <ThemeProvider theme={theme}> */}
        <Grid
          container
          spacing={2}
          className="m-auto h-full w-full flex sm:!justify-start lg:!justify-center"
        >
          <Grid item sm={0} md={0.5} className="lg:!hidden md:!hidden sm:!flex xs:!hidden"></Grid>

          {/* Chip Group */}
          <Grid
            item
            xs={10}
            sm={10}
            md={5.5}
            // lg={5.5}
            className="flex justify-start items-start flex-wrap !flex-col mt-0 lg:!mt-[60px] "
            style={{ gap: "10px" }}
          >
            <div className="mb-[8px]">
              <span className="font-medium text-[22px] text-[#17233A] sm:!text-[26px] md:max-w-[80%]">
                Select 6 Characteristics That Best Describe You
              </span>
            </div>
            <Chip.Group className="" multiple> 
              <Group
                className="flex justify-center items-center p-0 pt-0 md:pr-[20px] pb-[40px] md:pt-[20px] sm:p-0 md:max-w-[90%]"
                gap={10}
              >
                <div
                  className="flex justify-start items-center !sm:flex-row flex-wrap w-full sm:w-auto flex-row "
                  style={{ gap: 12 }}
                >
                  {tagData.map((item, index) => (
                    <div key={index} className="m-[4px] sm:mx-[4px]">
                      <Chip


                        // size="medium"
                        icon={null}
                        checked={selectedTag.some((t) => t.tag === item.tag)}
                        // checked={selectedTag.includes(item.tag)} // Check if the tag is selected
                        value={item.tag}
                        className={`chips capitalize text-[#032d60] font-medium bg-[#fff] ${selectedTag.includes(item.tag)
                          ? "bg-teal-500 text-white"
                          : ""
                          }`}
                        onClick={() => handleClick(item.tag, item.id)}
                      >
                        {item.tag}

                      </Chip>
                    </div>
                  ))}
                </div>
              </Group>
            </Chip.Group>
          </Grid>

          {/* <Grid item xs={0} sm={2} md={0} lg={0} className=""></Grid>
          <Grid item xs={0} sm={2} md={0} lg={0} className=""></Grid> */}


          {/* Carousel section */}
          <Grid
            xs={8}
            sm={6}
            md={3}
            className="flex justify-start !flex-col items-center h-[100vh] md:h-[100vh] !ml-[6rem] lg:!ml-0 xl:!ml-0 2xl:!ml-0"
          >
            <div className="justify-center items-center w-full pt-[20px] hidden lg:flex">
              <img src={Logo} alt="logo" className="w-[110px] " />
            </div>
            <div className="carousel_img">
              {/* <Carousels /> */}
              <Slider isModalOpen={isModalOpen} />
            </div>
          </Grid>

          <Grid item xs={0} md={0.5} className="hidden lg:flex"></Grid>

        </Grid>
        {/* </ThemeProvider> */}
      </div>

      {isModalOpen && isTabletOrLarger && (
        <Modal
          selectedTag={selectedTag}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          selectedId={selectedId}
        />
      )}
    </Box>
  );
};
