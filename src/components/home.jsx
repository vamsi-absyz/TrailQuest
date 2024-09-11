import { useState } from "react";
import { Box, Grid2 } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckIcon from '@mui/icons-material/Check';

export const Home = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleClick = (tag, id) => {
    console.log('You clicked the Chip with tag:', tag, id);
    setSelectedTag(tag); // You can also update state or perform other actions
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="min-h-[100vh] p-[4rem] w-full flex justify-center items-center bg-[]"
    >
      <Grid2 container spacing={2} className="m-auto h-full w-full">
        <Grid2 size={6} className="flex justify-center items-center">
          <Chip.Group className="">
            <Group justify="center" gap={10}>
              {characterData.map((character) => (
                <div key={character.id} className="flex justify-start items-center">
                  {character.tags.map((tag, index) => (
                    <div key={index} className="mx-[4px]">
                      <Chip
                        icon={<CheckIcon className="!w-[16px] !h-[16px]" />}
                        value={tag} color="indigo" variant="outline" className="chips capitalize font-medium bg-[#fff]" onClick={() => handleClick(tag, character.id)}>
                        {tag}
                      </Chip>
                    </div>
                  ))}
                </div>
              ))}
            </Group>
          </Chip.Group>
        </Grid2>
        <Grid2 size={6}>
          {/* <div>Selected Tag: {selectedTag}</div> */}
        </Grid2>
      </Grid2>
    </Box>
  );
};
