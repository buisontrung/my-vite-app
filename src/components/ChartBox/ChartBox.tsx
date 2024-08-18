import { Link } from 'react-router-dom';
import './ChartBox.scss';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
  title: string;
  icon: string;
  color: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};

const ChartBox = (props: Props) => {
  return (
    <div className="chartBox">
      <div className="boxInfor">
        <div className="boxTitle">
          <img className="title" src="/logo-hvktmm.png" alt="icon" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to="/chart" style={{ color: props.color }}>
          Xem chi tiết
        </Link>
      </div>
      <div className="chartInfor">
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 50 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? 'tomato' : 'limegreen' }}
          >
            {props.percentage}%
          </span>
          <span className="duration">Tháng này</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;


