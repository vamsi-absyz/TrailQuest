

import { useState } from "react";
import { Box, Grid, Grid2,useMediaQuery } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import CheckIcon from '@mui/icons-material/Check';
import { Carousels } from "./carousel";
import { Modal } from "./modal";
import { CharcaterInfo } from "./charcaterInfo";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[mobileView,setMobileView]=useState(false)
  const [selectedId, setSelectedId] = useState("");
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
const navigate=useNavigate();
  const handleClick = (tag, id) => {
    setSelectedId(id);
    setSelectedTag(tag);
    if(isTabletOrLarger){

      setIsModalOpen(true); // Open the modal when a chip is clicked
    }else{
       navigate("/character")
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
      className="min-h-[100vh] sm:p-[4rem] w-full flex justify-center items-center"
    >
      <Grid container spacing={2} className="m-auto h-full w-full !my-[1rem]">
        {/* Make the Chip group responsive */}
        <Grid
          xs={12} // Takes full width on extra small screens
          sm={12} // Takes full width on small screens
          md={8} // Takes 8 out of 12 columns on medium screens
          className="flex justify-start items-center flex-wrap"
          style={{ gap: "10px" }} // Adds spacing between chips for better mobile view
        >
          <Chip.Group className="">
            <Group className="flex justify-center items-center p-[40px] sm:p-0" gap={10} style={{ flexWrap: "" }}>
              {characterData.map((character) => (
                <div key={character.id} className="flex justify-center items-center !sm:flex-row flex-wrap w-full sm:w-auto flex-row">
                  {character.tags.map((tag, index) => (
                    <div key={index} className="m-[4px] sm:mx-[4px]">
                      <Chip
                        icon={selectedTag === tag && isModalOpen ? <CheckIcon className="!w-[16px] !h-[16px]" /> : null}

                        value={tag}
                        color="indigo"
                        variant="outline"
                        className="chips capitalize font-medium bg-[#fff]"
                        onClick={() => handleClick(tag, character.id)}
                      >
                        {tag}
                      </Chip>
                    </div>
                  ))}
                </div>
              ))}
            </Group>
          </Chip.Group>
        </Grid>

        {/* Carousel section */}
        <Grid
          xs={12} // Takes full width on extra small screens
          sm={12} // Takes full width on small screens
          md={4} // Takes 4 out of 12 columns on medium screens
          className="flex justify-end items-center"
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
