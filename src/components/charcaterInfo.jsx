import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { characterData } from "../utils/mock_data";
import { Grid, Grid2, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export const CharcaterInfo = ({
  isModalOpen,
  handleCloseModal,
  selectedTag,
  selectedId,
}) => {
  const [modalData, setModalData] = useState([]);
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
  const navigate=useNavigate();
  useEffect(() => {
    console.log(
      isModalOpen,
      handleCloseModal,
      selectedTag,
      selectedId,
      "prorpspspsss"
    );
    if (selectedId && selectedTag) {
      const filterData = characterData.filter((item) => item.id === selectedId);
      console.log(filterData[0], "filterDAta");
      setModalData(filterData[0]);
    }

  }, []);

  useEffect(()=>{
    if(isTabletOrLarger){
        navigate("/")
    }
  },[isTabletOrLarger])

  const generateWelcomeMessage = (character) => {
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
    // const description = `Known for being ${character.tags.join(',')}, ${character.title} represents ${character.description}. Get ready for an unforgettable experience!`;
    return `${pronounMessage} `;
  };
console.log(modalData,"modaldata")
  return (
    <>
      {modalData && (
        <div className="mt-10 p-5">
          <div className="pl-[1rem]">
            <Grid container spacing={2}>
            <Grid xs={12} className="flex justify-center items-center">
                <img
                  src={modalData.image}
                  alt={modalData.title}
                  className="!w-[160px] !h-[260px] object-contain"
                />
              </Grid>
              <Grid xs={12}>
                <div>
                  <span className="text-[1rem] font-medium capitalize">
                    {generateWelcomeMessage(modalData)}
                  </span>
                </div>
              </Grid>
              
              <button style={{backgroundColor:"blueviolet"}} onClick={()=>navigate("/")}>Back</button>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};
