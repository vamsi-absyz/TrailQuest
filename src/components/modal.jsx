import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { characterData } from "../utils/mock_data"; // Assuming this is your data source
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ConfettiBackground } from "./ConfettiBackground";


const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      // type: 'spring',
      // stiffness: 300,
      // damping: 20,
      // duration: 0.5,
      // ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export const Modal = ({ isModalOpen, handleCloseModal, selectedTag }) => {
  const [modalData, setModalData] = useState(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (selectedTag && selectedTag.length > 0) {
      // Collect IDs from selectedTag and filter data based on the IDs
      const ids = selectedTag.map((item) => item.id);

      // Filter characterData for matching IDs
      const filteredData = characterData.filter((item) =>
        ids.includes(item.id)
      );

      // If data is found, set it for modal
      if (filteredData.length > 0) {
        // Assuming you want to display the first matching entry, or apply some logic here
        setModalData(filteredData[0]);
      }
    }
  }, [selectedTag]);

  const generateWelcomeMessage = (character) => {
    if (!character) return "";

    let pronounMessage;
    switch (character.pronoun) {
      case "He/Him":
        pronounMessage = `Say hello to the one and only, the unstoppable force, the legend himself - ${character.title}!`;
        break;
      case "She/Her":
        pronounMessage = `Here comes the queen of awesomeness, the brilliant and bold ${character.title}!`;
        break;
      case "They/Them":
        pronounMessage = `${character.title} is here, and trust me, you’re in for an inclusive, adventurous ride with them!`;
        break;
      default:
        pronounMessage = `${character.title} has arrived, and the excitement just went through the roof!`;
    }
    return `${pronounMessage}`;
  };
  console.log(modalData, "modaldata");
  return (
    <>
      {modalData && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex justify-center items-center"
          >
            <div
              className="bg-white px-6 rounded-lg shadow-lg relative"
              style={{
                width: "430px",
                height: "430px",
              }}
            >
              <div className="flex justify-end items-end w-full my-[10px]">
              <IconButton 
  onClick={handleCloseModal} 
  sx={{ 
    backgroundColor: "#1776E5", 
    '&:hover': { 
      backgroundColor: "#1776E5" // Optional: Change color on hover 
    }
  }}
>
  <CloseIcon sx={{ color: "white" }} />
</IconButton>

              </div>

              <div className="flex flex-col justify-center items-center text-center ">
              <ConfettiBackground containerRef={containerRef} />
              <div ref={containerRef} className="relative z-10">

                  <h1
                    style={{
                      color: "#1776E5",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    Congratulations
                  </h1>
                </div>

                <div className="flex justify-center text-center ">
                  <span className="text-[1rem]" style={{ color: "#17233A" }}>
                    {generateWelcomeMessage(modalData)}
                  </span>
                </div>
                <Grid className="flex justify-center items-center mt-4">
                
                  <img
                    src={modalData.image}
                    alt={modalData.title}
                    className="!w-[180px] !h-[200px] object-contain"
                  />
                </Grid>

                <Grid className="flex gap-2 mt-4">
                  <button
                    style={{
                      backgroundColor: "#1776E5",
                      borderRadius: "5px",
                      color: "white",
                      height: "35px",
                      width: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Do it again
                  </button>

                  <button
                    style={{
                      backgroundColor: "#30335C",
                      borderRadius: "5px",
                      color: "white",
                      height: "35px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Share
                  </button>
                </Grid>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
