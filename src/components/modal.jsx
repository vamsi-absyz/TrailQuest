import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { characterData } from "../utils/mock_data"; // Assuming this is your data source
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ConfettiBackground } from "./ConfettiBackground";
import { ShareSocial } from "react-share-social";

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
  const [playConfetti, setPlayConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleDoItAgain = () => {
    setPlayConfetti(false); // Reset confetti animation
    setTimeout(() => {
      setPlayConfetti(true); // Trigger animation again after reset
    }, 100); // Small delay to ensure reset
  };
  const containerRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      setPlayConfetti(true); // Trigger confetti animation
    }
  }, [isModalOpen]);
  console.log(selectedTag,"tagselected")
  useEffect(() => {
    if (selectedTag && selectedTag.length > 0) {
      // Collect IDs from selectedTag and filter data based on the IDs
      function getHighestFrequencyId(array) {
        // Step 1: Create a frequency map for the IDs
        const idFrequencyMap = array.reduce((acc, obj) => {
          const id = obj.id;
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});
      
        // Step 2: Find the ID with the highest frequency
        const highestFrequencyId = Object.keys(idFrequencyMap)
          .map(Number) // Convert keys to numbers for comparison
          .reduce((highestId, currentId) => {
            // Compare frequencies
            if (idFrequencyMap[currentId] > (idFrequencyMap[highestId] || 0)) {
              return currentId;
            }
            return highestId;
          }, -1); // Initial value is -1
      
        return highestFrequencyId;
      }
      const data = getHighestFrequencyId(selectedTag);

      const filterData = characterData.filter((arr) => arr.id === data);
      console.log(filterData, "filterdata");
      setModalData(filterData);
      console.log(data, "dddddddddddd");
    }
  }, [selectedTag]);

  const generateWelcomeMessage = (character) => {
    if (!character) return "";

    let pronounMessage;
    switch (character.pronoun) {
      case "He/Him":
        pronounMessage = `Say hello to the one and only, the unstoppable force, the legend himself - ${character[0].title}!`;
        break;
      case "She/Her":
        pronounMessage = `Here comes the queen of awesomeness, the brilliant and bold ${character[0].title}!`;
        break;
      case "They/Them":
        pronounMessage = `${character[0].title} is here, and trust me, you’re in for an inclusive, adventurous ride with them!`;
        break;
      default:
        pronounMessage = `${character[0].title} has arrived, and the excitement just went through the roof!`;
    }
    return `${pronounMessage}`;
  };
  console.log(modalData, "modaldata");
  return (
    <>
      {modalData && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-40 "
            style={{ backgroundColor: "rgba(242, 243, 243, 0.9)" }}
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
                    "&:hover": {
                      backgroundColor: "#1776E5", // Optional: Change color on hover
                    },
                  }}
                >
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </div>

              <div className="flex flex-col justify-center items-center text-center ">
                <div>
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
                <Grid
                  className="flex justify-center items-center mt-4 relative z-10"
                  ref={containerRef}
                >
                  {playConfetti && (
                    <ConfettiBackground
                      key={confettiKey}
                      containerRef={containerRef}
                    />
                  )}
                  <img
                    src={modalData[0].image}
                    alt={modalData[0].title}
                    className="!w-[180px] !h-[200px] object-contain"
                  />
                </Grid>

                <Grid className="flex gap-2 mt-4">
                  <button
                    onClick={handleDoItAgain}
                    style={{
                      backgroundColor: "#1776E5",
                      borderRadius: "5px",
                      color: "white",
                      height: "35px",
                      width: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
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
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    Share
                  </button>
                  {/* <ShareSocial
     url ="https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrations-Ruth.png"
     socialTypes={['facebook','twitter','reddit','linkedin',"whatsapp"]}
   /> */}
                </Grid>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
