import Carousel from "../Carousel/Carousel";
import Collection from "../product cart/collection";
import Topproduct from "../product cart/topproduct";
import InfoCards from "../newcomponent/info";
import WhoWeAre from "../newcomponent/woweare";
import HelpSection from "../newcomponent/help";
import Jewelryinfo from "../newcomponent/Jewelryinfo";
import VideoSection from "../newcomponent/youtubevideo";
import HomeProductCard from "../product cart/homeproduct";

import Faqsection from "../newcomponent/faq";
export default function Home() {
  return (
    <div>
      <Carousel />
      <Collection />
      <HomeProductCard />
      <Topproduct />
      <WhoWeAre />
      <Jewelryinfo />
      <InfoCards />
      <VideoSection />
      <Faqsection/>
      <HelpSection />
    </div>
  );
}
