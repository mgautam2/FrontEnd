import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default function BarGraph(props) {
  let logsToDisplay = props.logsToDisplay;
  let logsKeyword = props.logsKeyword;

  let renderTick = (tickProps) => {
    return <p>{(tickProps.index + 1)}</p>;
  };

    return (
      <BarChart
        width={1000}
        height={500}
        data={logsToDisplay.splice(0, 10)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={logsKeyword.itemName} interval={0} tick={renderTick} height={1} />
        {/* dataKey="date" axisLine={false} tickLine={false} interval={0} tick={renderQuarterTick} height={1} scale="band" xAxisId="quarter" />
         */}
        <YAxis unit=' mins' />
        
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#248586" />
      </BarChart>
    );
}
