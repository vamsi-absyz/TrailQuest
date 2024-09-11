import { useState } from "react";
import { Box, Grid2, Stack } from "@mui/material";
import { Chip, Group } from "@mantine/core";

export const Home = () => {
  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

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
          <div>
            <Chip.Group>
              <Group justify="center">
                <Chip value="1">Single chip</Chip>
                <Chip value="2">Can be selected</Chip>
                <Chip value="3">At a time</Chip>
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
