import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { characterData } from "../utils/mock_data"; // Assuming this is your data source
import {
  Box,
  Grid,
  IconButton,
  Skeleton,
  Zoom,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ConfettiBackground } from "./ConfettiBackground";
import { EmailShare, WpShare } from "./share";
import Cookies from "js-cookie";
import Dog from "../assets/images/Group 80.svg";

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
    transition: {},
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export const Modal = ({ isModalOpen, handleCloseModal, selectedTag }) => {
  const [modalData, setModalData] = useState(null);
  const [playConfetti, setPlayConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  // const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state
  // Image from assets

  console.log(modalData, "modalData");

  const capitalizeFirstLetter = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  const name = capitalizeFirstLetter(Cookies.get("name"));

  const handleDoItAgain = () => {
    setPlayConfetti(false); // Reset confetti animation
    setTimeout(() => {
      setPlayConfetti(true); // Trigger animation again after reset
    }, 100); // Small delay to ensure reset
  };
  const containerRef = useRef(null);

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = (err) => reject(err);
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      setPlayConfetti(true); // Trigger confetti animation
    }
  }, [isModalOpen]);

  useEffect(() => {
    setLoading(false);
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
      setModalData(filterData);

      // Preload the image
      preloadImage(filterData[0]?.image)
        .then(() => {
          setLoading(true); // Image loaded
        })
        .catch((error) => {
          console.log(error, "Error while loading image");
          setLoading(true); // Handle load error if any
        });
    }
  }, [selectedTag]);

  return (
    <>
      {modalData && loading ? (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-40 "
            style={{ backgroundColor: "rgba(242, 243, 243, 0.9)" }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex justify-center items-center"
            transition={{ duration: 0.2 }}
          >
            <Box
              className="bg-white rounded-lg shadow-lg relative w-[450px] sm:!w-[550px] lg:!w-[450px]"
              sx={
                {
                  // width: { xs: "450px", sm: "600", md: "450px" },
                }
              }
            >
              <div className="flex justify-end items-end w-full my-[10px] px-[10px]">
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    backgroundColor: "#1776E5",
                    padding: "6px",
                    "&:hover": {
                      backgroundColor: "#1776E5", // Optional: Change color on hover
                    },
                  }}
                >
                  <CloseIcon sx={{ fill: "#ffffff", fontSize: "0.8rem" }} />
                </IconButton>
              </div>

              <div className="flex flex-col justify-center items-center text-center px-[18px] pb-[24px]">
                <div>
                  <h1
                    style={{
                      color: "#1776E5",
                      fontSize: "30px",
                      fontWeight: "bold",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Congratulations, {name}
                  </h1>
                  <span className="text-[14px] text-[#17233A] !pt-[8px]">
                    we’ve found the perfect mascot to match you.
                  </span>
                </div>

                <Grid
                  className="flex justify-center items-center relative z-10 py-[20px]"
                  ref={containerRef}
                >
                  <div className="animation">
                    {playConfetti && (
                      <ConfettiBackground
                        key={confettiKey}
                        containerRef={containerRef}
                      />
                    )}
                  </div>

                  <div className="relative">
                    <Zoom in={true} style={{}}>
                      <img
                        src={modalData[0].image}
                        alt="congratulations"
                        loading="lazy"
                        className="!h-[260px] sm:!h-auto lg:!h-[260px] xl:!l-[260px] object-scale-down"
                      />
                    </Zoom>
                  </div>
                </Grid>

                <Grid className="flex gap-2 mt-4 w-full justify-center items-center">
                  <button
                    onClick={handleDoItAgain}
                    style={{
                      backgroundColor: "#405368",
                      borderRadius: "5px",
                      color: "white",
                      fontSize: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 18px",
                      marginRight: "8px",
                    }}
                  >
                    Do it again
                  </button>

                  {modalData && <WpShare modalData={modalData} />}
                </Grid>
              </div>
            </Box>
          </motion.div>
        </AnimatePresence>
      ) : modalData && loading === false ? (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-[#f2f3f3] opacity-70 backdrop-blur-md z-20"></div>

          <div className="relative z-50 flex justify-center items-center h-full w-full">
            <CircularProgress
              className="loader"
              sx={{ color: "red" }}
              size={60}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
