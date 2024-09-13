import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import { Carousels } from "./carousel";
import { useNavigate } from "react-router-dom";
import { Modal } from "./modal";


export const Home = () => {
  const [selectedTag, setSelectedTag] = useState([]); // Manages selected tags
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
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

  // const handleClick = (tag, id) => {
  //   // If the tag is already selected, remove it; otherwise, add it
  //   const newSelectedTags = selectedTag.includes(tag)
  //     ? selectedTag.filter((t) => t !== tag) // Deselect the tag if it's already selected
  //     : [...selectedTag, tag]; // Otherwise, add it

  //   // Allow deselection or selection if the current number of selected tags is less than 6
  //   if (newSelectedTags.length <= 6) {
  //     setSelectedTag(newSelectedTags);
  //   }

  //   // Your existing logic
  //   if (isTabletOrLarger) {
  //     setIsModalOpen(true);
  //   } else {
  //     navigate(`/character/${id}`);
  //   }
  // };

  // const handleClick = (tag, id) => {
  //   // If the tag is already selected, allow deselecting it
  //   if (selectedTag.includes(tag)) {
  //     const newSelectedTags = selectedTag.filter((t) => t !== tag);
  //     setSelectedTag(newSelectedTags);
  //   }
  //   // Otherwise, only add the tag if there are less than 6 selected
  //   else if (selectedTag.length < 6) {
  //     const newSelectedTags = [...selectedTag, tag];
  //     setSelectedTag(newSelectedTags);
  //   }

  //   // Your existing logic for modal or navigation
  //   if (isTabletOrLarger) {
  //     setIsModalOpen(true);
  //   } else {
  //     navigate(`/character/${id}`);
  //   }
  // };

  const handleClick = (tag, id) => {
    // If the tag is already selected, allow deselecting it
    if (selectedTag.includes(tag)) {
      const newSelectedTags = selectedTag.filter((t) => t !== tag);
      setSelectedTag(newSelectedTags);
    }
    // Otherwise, only add the tag if there are less than 6 selected
    else if (selectedTag.length < 6) {
      const newSelectedTags = [...selectedTag, tag];
      setSelectedTag(newSelectedTags);
    }

    // Open the modal if exactly 6 tags are selected
    if (selectedTag.length === 5 && !selectedTag.includes(tag)) {
      // This ensures the modal opens when the 6th tag is added
      setIsModalOpen(true);
    }
    // Navigate if not on tablet or larger screen
    else if (!isTabletOrLarger) {
      navigate(`/character/${id}`);
    }
  };



  console.log(selectedTag, "selectedTagselectedTag");

  const handleCloseModal = () => {
    setSelectedId("");
    setIsModalOpen(false);
    setSelectedTag([]);
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="min-h-[100vh] bg-[#F2F3F3] bg-img w-full flex flex-col justify-start items-center"
    >
      <div className="m-auto sm:px-[2rem] md:px-[2rem] sm:pb-[2rem] md:pb-1 pt-[10px] ">
        <Grid container spacing={2} className="m-auto h-full w-full flex justify-evenly">
          {/* Chip Group */}
          <Grid
            item
            xs={7}
            sm={8}
            md={7}
            className="flex justify-start items-start flex-wrap !flex-col"
            style={{ gap: "10px" }}
          >
            <div className="mb-[20px]">
              <span className="font-medium text-[22px] text-[#17233A]">
                Select 6 Characteristics That Best Describe You
              </span>
            </div>
            <Chip.Group className="" multiple>
              <Group className="flex justify-center items-center px-[20px] pb-[40px] pt-[20px] sm:p-0" gap={10}>
                <div className="flex justify-start items-center !sm:flex-row flex-wrap w-full sm:w-auto flex-row">
                  {tagData.map((item, index) => (
                    <div key={index} className="m-[4px] sm:mx-[4px]">
                      <Chip
                        size="xs"
                        icon={null}
                        checked={selectedTag.includes(item.tag)} // Check if the tag is selected
                        value={item.tag}
                        className={`chips capitalize text-[#032d60] font-medium bg-[#fff] ${selectedTag.includes(item.tag) ? 'bg-teal-500 text-white' : ''
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
            className="flex justify-end items-start"
          >
            <div className="carousel_img">
              <Carousels />
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Modal */}
      {/* {(isModalOpen && isTabletOrLarger) && (
        <Modal
          selectedTag={selectedTag}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          selectedId={selectedId}
        />
      )} */}

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

