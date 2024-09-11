import { useState } from "react";
import { Box, Grid2, Stack } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";

export const Home = () => {
  

  const handleClick = () => {
    // console.log('You clicked the Chip.');
  };
  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="min-h-[100vh] m-auto w-full flex justify-center items-center"
    >
      <Grid2 container spacing={2} className="m-auto h-full w-full">
      <Grid2 size={6} className="flex justify-center items-center">
      {/* <div>
        {characterData.map((character) => (
          <div key={character.id}>
            <h3>{character.title}</h3> 
            <Chip.Group>
              <Group justify="center">
                {character.tags.map((tag, index) => (
                  <Chip key={index} value={tag}>
                    {tag}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </div>
        ))}
      </div> */}
    </Grid2>
        <Grid2 size={6}>
          <div>size=4</div>
        </Grid2>
      </Grid2>
    </Box>
  );
};
