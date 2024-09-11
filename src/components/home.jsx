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
      className="min-h-[100vh] p-[4rem] w-full flex justify-center items-center"
    >
      <Grid2 container spacing={2} className="m-auto h-full w-full">
        <Grid2 size={6} className="flex justify-center items-center">
          <div>
            <Chip.Group>
              <Group justify="center">
                {characterData.map((character) => (
                  <div key={character.id} className="flex justify-start items-center">
                    {character.tags.map((tag, index) => (
                      <div key={index} className="mx-[2px]">
                        <Chip value={tag} color="gray" variant="outline">
                          {tag}
                        </Chip>
                      </div>
                    ))}

                  </div>
                ))}
              </Group>
            </Chip.Group>
          </div>
        </Grid2>
        <Grid2 size={6}>
          <div>size=4</div>
        </Grid2>
      </Grid2>
    </Box>
  );
};
