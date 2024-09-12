

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
      className="min-h-[100vh] sm:px-[4rem] sm:pb-[4rem] w-full flex flex-col justify-center items-center"
    >

      <div className="flex justify-start items-center w-full pl-[10px] sm:pl-0">
        <img src={Logo} alt="logo" className="w-[110px] " />
      </div>
      <Grid container spacing={2} className="m-auto h-full w-full !my-[1rem]">
        {/* Make the Chip group responsive */}
        <Grid
          xs={7} // Takes full width on extra small screens
          sm={8} // Takes full width on small screens
          md={8} // Takes 8 out of 12 columns on medium screens
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
          <div className="carousel_img">
            <Carousels />
          </div>
        </Grid>
      </Grid>

      {/* Modal with enhanced framer-motion animation */}
      {(isModalOpen && isTabletOrLarger) && (
        <Modal
          selectedTag={selectedTag}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          selectedId={selectedId}
        />
      )}
      {/* {mobileView && <CharcaterInfo
       selectedTag={selectedTag}
       handleCloseModal={handleCloseModal}
       isModalOpen={isModalOpen}
       selectedId={selectedId}
      />} */}
    </Box>
  );
};
