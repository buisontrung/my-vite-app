// Home.tsx

import ChartBox from '../../components/ChartBox/ChartBox';
import Topbox from '../../components/topBox/TopBox';
import { chartBoxUser,chartBoxProduct,chartBoxConversion,chartBoxRevenue} from '../../data';
import './Home.scss'
const Home = () => {
    return (
        <div className="home">
            <div className="box box1">
                <Topbox/>
            </div>
            <div className="box box2"><ChartBox {...chartBoxUser}/></div>
            <div className="box box3"><ChartBox {...chartBoxProduct}/></div>
            <div className="box box4"></div>
            <div className="box box5"><ChartBox {...chartBoxRevenue}/></div>
            <div className="box box6"><ChartBox {...chartBoxConversion}/></div>
            <div className="box box7">Box7</div>
            <div className="box box8">Box8</div>
            <div className="box box9">Box9</div>

            
        </div>
    );
};

export default Home;
