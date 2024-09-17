import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import { Carousels } from "./carousel";
import { useNavigate } from "react-router-dom";
import { Modal } from "./modal";
import Logo from "../assets/images/logo.png";
import Slider from "./slider";

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

      setTagData(allTagsWithId);
    }
  }, []);

  const handleClick = (tag, id) => {
    // Create a tag object
    const tagObject = { tag, id };

    // Check if the tag is already selected
    if (selectedTag.some((t) => t.tag === tag)) {
      // Remove the tag object from the array
      const newSelectedTags = selectedTag.filter((t) => t.tag !== tag);
      setSelectedTag(newSelectedTags);
    } else if (selectedTag.length < 6) {
      // Add the tag object to the array
      const newSelectedTags = [...selectedTag, tagObject];
      setSelectedTag(newSelectedTags);
    }

    // Open the modal if exactly 6 tags are selected
    if (selectedTag.length === 5 && !selectedTag.some((t) => t.tag === tag)) {
      setIsModalOpen(true);
    }

    // Navigate if not on tablet or larger screen
    if (!isTabletOrLarger && selectedTag.length === 5) {
      navigate(`/character/`, { state: selectedTag });
    }
  };

  const handleCloseModal = () => {
    setSelectedId("");
    setIsModalOpen(false);
    setSelectedTag([]);
    window.location.reload();
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="bg-[#F2F3F3] bg-img w-full flex flex-col justify-start items-center bg-cover md:bg-contain"
    >
      <div className="m-auto sm:px-[2rem] md:px-[2rem] sm:pb-[2rem] md:pb-1 pt-[10px] ">
        <Grid
          container
          spacing={2}
          className="m-auto h-full w-full flex justify-evenly"
        >
          {/* Chip Group */}
          <Grid
            item
            xs={7}
            sm={8}
            md={7}
            className="flex justify-center items-start flex-wrap !flex-col"
            style={{ gap: "10px" }}
          >
            <div className="mb-[8px]">
              <span className="font-medium text-[22px] text-[#17233A]">
                Select 6 Characteristics That Best Describe You
              </span>
            </div>
            <Chip.Group className="" multiple>
              <Group
                className="flex justify-center items-center p-0 pt-0 md:px-[20px] pb-[40px] md:pt-[20px] sm:p-0"
                gap={10}
              >
                <div className="flex justify-start items-center !sm:flex-row flex-wrap w-full sm:w-auto flex-row">
                  {tagData.map((item, index) => (
                    <div key={index} className="m-[4px] sm:mx-[4px]">
                      <Chip
                        size="xs"
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

          {/* Carousel section */}
          <Grid
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
