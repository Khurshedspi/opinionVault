
import { useEffect } from 'react';
import MeetOurPartner from './MeetOurPartner';
import Slider from './Slider';
import TrendingServices from '../../components/TrendingServices/TrendingServices';

const Home = () => {
    useEffect(() => {
        const pathTitleMap = {
          "/": "Opinion Vault",
        };
        document.title = pathTitleMap[location.pathname] || "Opinion Vault";
      }, [location.pathname]);
    return (
        <div>
            <Slider></Slider>
            <TrendingServices></TrendingServices>
            <MeetOurPartner></MeetOurPartner>
        </div>
    );
};

export default Home;