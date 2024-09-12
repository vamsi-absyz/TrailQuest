import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { characterData } from "../utils/mock_data";
import { Grid, Grid2, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

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
            type: 'spring', // Using spring for bounciness
            stiffness: 300,
            damping: 20,
            duration: 0.5,
            ease: [0.6, 0.05, -0.01, 0.9], // Custom ease for smoother animation
        },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export const Modal = ({ isModalOpen, handleCloseModal, selectedTag, selectedId }) => {
    const [modalData, setModalData] = useState([]);
    useEffect(() => {
        console.log(isModalOpen, handleCloseModal, selectedTag, selectedId, "prorpspspsss")
        if (selectedId && selectedTag) {
            const filterData = characterData.filter((item) => item.id === selectedId);
            console.log(filterData[0], "filterDAta");
            setModalData(filterData[0])
        }

    }, []);

    const generateWelcomeMessage = (character) => {
        let pronounMessage;
        switch (character.pronoun) {
            case 'He/Him':
                pronounMessage = `Say hello to the one and only, the unstoppable force, the legend himself - ${character.title}!`;
                break;
            case 'She/Her':
                pronounMessage = `Here comes the queen of awesomeness, the brilliant and bold ${character.title}!`;
                break;
            case 'They/Them':
                pronounMessage = `${character.title} is here, and trust me, you’re in for an inclusive, adventurous ride with them!`;
                break;
            default:
                pronounMessage = `${character.title} has arrived, and the excitement just went through the roof!`;
        }
        // const description = `Known for being ${character.tags.join(',')}, ${character.title} represents ${character.description}. Get ready for an unforgettable experience!`;
        return `${pronounMessage} `;
    };

    console.log(modalData, "modalData")

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

                    {/* Zoom in/out modal with spring animation and fade effect */}
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
                                width: '700px',
                                height: '400px',
                                // display: 'flex',
                                // flexDirection: 'column',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                            }}
                        >
                            <div className="flex justify-end items-end w-full my-[10px]">
                                <IconButton onClick={handleCloseModal}>
                                    <CloseIcon />
                                </IconButton>
                            </div>

                            <div className="pl-[1rem]">
                                <Grid container spacing={2}>
                                    <Grid xs={7}>
                                        <div>
                                            <span className="text-[1.5rem] font-bold capitalize" style={{ color: "#032d60" }}>{generateWelcomeMessage(modalData)}</span>

                                            <div className="mt-[8px]">
                                                <span>{modalData.description}</span>

                                                <div className="my-[8px]">
                                                    <span>Favorite Trailhead badge : <a href={modalData.trailheadBadge} target="_blank" className="text-[#032d60] hover:underline hover:text-[#032d60]">{modalData.trailheadText}</a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid xs={5} className="flex justify-center items-center">
                                        <img src={modalData.image} alt={modalData.title} className="!w-[180px] !h-[300px] object-contain" />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence >
            )}
        </>
    )
}
