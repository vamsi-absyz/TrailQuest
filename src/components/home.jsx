// import { useState } from "react";
// import { Box, Grid2 } from "@mui/material";
// import { Chip, Group } from "@mantine/core";
// import { characterData } from "../utils/mock_data";
// import CheckIcon from '@mui/icons-material/Check';
// import { Carousels } from "./carousel";
// import { motion } from "framer-motion";

// export const Home = () => {
//   const [selectedTag, setSelectedTag] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleClick = (tag, id) => {
//     console.log('You clicked the Chip with tag:', tag, id);
//     setSelectedTag(tag);
//     setIsModalOpen(true); // Open the modal when a chip is clicked
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <Box
//       sx={{ flexGrow: 1 }}
//       className="min-h-[100vh] p-[4rem] w-full flex justify-center items-center"
//     >
//       <Grid2 container spacing={2} className="m-auto h-full w-full">
//         <Grid2 size={6} className="flex justify-start items-center">
//           <Chip.Group className="">
//             <Group justify="center" gap={10}>
//               {characterData.map((character) => (
//                 <div key={character.id} className="flex justify-start items-center">
//                   {character.tags.map((tag, index) => (
//                     <div key={index} className="mx-[4px]">
//                       <Chip
//                         icon={<CheckIcon className="!w-[16px] !h-[16px]" />}
//                         value={tag} color="indigo" variant="outline" className="chips capitalize font-medium bg-[#fff]" onClick={() => handleClick(tag, character.id)}>
//                         {tag}
//                       </Chip>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </Group>
//           </Chip.Group>
//         </Grid2>
//         <Grid2 size={6} className="flex justify-end items-center">
//           <div className="carousel_img">
//             <Carousels />
//           </div>
//         </Grid2>
//       </Grid2>

//       {/* Modal with framer-motion animation and blurred background */}
//       {isModalOpen && (
//         <>
//           {/* Black blurred backdrop */}
//           <div
//             className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
//             onClick={handleCloseModal}
//           ></div>

//           {/* Zoom in/zoom out animated modal */}
//           <motion.div
//             initial={{ scale: 0 }} // Starts from zoomed out
//             animate={{ scale: 1 }} // Zooms in
//             exit={{ scale: 0 }} // Zooms out when closed
//             transition={{ duration: 0.3 }} // Smooth animation timing
//             className="fixed inset-0 z-50 flex justify-center items-center"
//           >
//             <div
//               className="bg-white p-6 rounded-lg shadow-lg relative"
//               style={{
//                 width: '400px',
//                 height: '200px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <h2 className="text-xl font-semibold">Selected Tag: {selectedTag}</h2>
//               <p>This is the content of the modal. You selected: {selectedTag}</p>
//               <button
//                 className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={handleCloseModal}
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </Box>
//   );
// };


import { useState } from "react";
import { Box, Grid2 } from "@mui/material";
import { Chip, Group } from "@mantine/core";
import { characterData } from "../utils/mock_data";
import CheckIcon from '@mui/icons-material/Check';
import { Carousels } from "./carousel";
import { Modal } from "./modal";

export const Home = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");


  const handleClick = (tag, id) => {
    // console.log('You clicked the Chip with tag:', tag, id);
    setSelectedId(id)
    setSelectedTag(tag);
    setIsModalOpen(true); // Open the modal when a chip is clicked
  };

  const handleCloseModal = () => {
    setSelectedId("")
    setIsModalOpen(false);
    setSelectedTag(null)
  };


  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="min-h-[100vh] p-[4rem] w-full flex justify-center items-center"
    >
      <Grid2 container spacing={2} className="m-auto h-full w-full">
        <Grid2 size={6} className="flex justify-start items-center">
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
        <Grid2 size={6} className="flex justify-end items-center">
          <div className="carousel_img">
            <Carousels />
          </div>
        </Grid2>
      </Grid2>

      {/* Modal with enhanced framer-motion animation */}
      {isModalOpen && (
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
