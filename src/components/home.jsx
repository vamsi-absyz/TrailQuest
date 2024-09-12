import { useState } from "react";
import { Box, Grid, Grid2, useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import CheckIcon from '@mui/icons-material/Check';
import { Carousels } from "./carousel";
import { Modal } from "./modal";
import { CharcaterInfo } from "./charcaterInfo";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/absyz-logo-big.png'

export const Home = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  const handleClick = (tag, id) => {
    setSelectedId(id);
    setSelectedTag(tag);
    if (isTabletOrLarger) {

      setIsModalOpen(true); // Open the modal when a chip is clicked
    } else {
      navigate(`/character/${id}`
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedId("");
    setIsModalOpen(false);
    setSelectedTag(null);
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="min-h-[100vh]  w-full flex flex-col justify-center items-center"
    >

      <div className="flex justify-start items-center w-full pl-[10px] pb-[10px] bg-[#032d6017]">
        <img src={Logo} alt="logo" className="w-[110px] " />
      </div>
      <div className="sm:px-[2rem] md:px-[4rem] sm:pb-[2rem] md:pb-[4rem] pt-[10px] mt-5 sm:mt-[1rem] md:mt-4">
        <Grid container spacing={2} className="m-auto h-full w-full">
          {/* Make the Chip group responsive */}
          <Grid
            xs={7}
            sm={8}
            md={8}
            className="flex justify-start items-center flex-wrap"
            style={{ gap: "10px" }} // Adds spacing between chips for better mobile view
          >
            <Chip.Group className="">
              <Group className="flex justify-center items-center px-[20px] pb-[40px] pt-[20px] sm:p-0" gap={10} style={{ flexWrap: "" }}>
                {characterData.map((character) => (
                  <div key={character.id} className="flex justify-center items-center !sm:flex-row flex-wrap w-full sm:w-auto flex-row">
                    {character.tags.map((tag, index) => (
                      <div key={index} className="m-[4px] sm:mx-[4px]">
                        <Chip
                          size="xs"
                          icon={null}
                          checked={false}
                          // value={tag}
                          color="indigo"
                          variant="outline"
                          className="chips capitalize text-[#032d60] font-medium bg-[#fff]"
                          onClick={() => handleClick(tag, character.id)}
                        >
                          #{tag}
                        </Chip>
                      </div>
                    ))}
                  </div>
                ))}
              </Group>
            </Chip.Group>
          </Grid>

          {/* Carousel section */}
          <Grid  // Takes full width on extra small screens
            xs={0}
            sm={0.5} // Takes full width on small screens
            md={0.5} ></Grid>
          <Grid
            xs={4} // Takes full width on extra small screens
            sm={3} // Takes full width on small screens
            md={3} // Takes 4 out of 12 columns on medium screens
            className="flex justify-end items-start"
          >
            <div className="carousel_img h-[100vh] sm:h-[100%]">
              <Carousels />
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Modal with enhanced framer-motion animation */}
      {(isModalOpen && isTabletOrLarger) && (
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
