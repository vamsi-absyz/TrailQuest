import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { characterData } from '../utils/mock_data';

export const Carousels = () => {
    return (
        <Carousel
            axis="vertical"
            showThumbs={false}
            infiniteLoop={false}
            stopOnHover={false}
            autoPlay={true}
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            swipeable={false}
        >
            {
                characterData.map((img) => (
                    <div key={img.id}>
                        <img src={img.image} className=' !w-full !h-[375px] object-contain' />
                    </div>
                ))
            }
        </Carousel >
    )
}
