import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'aparekh5@illinois.edu', watchTime: 4000, 
  },
  {
    name: 'anjablfa@illinois.edu', watchTime: 3000,
  },
  {
    name: 'wkbfjka9@illinois.edu', watchTime: 2000, 
  },
  {
    name: 'wfwfcw9@illinois.edu', watchTime: 2780, 
  },
  {
    name: 'dddge9@illinois.edu', watchTime: 1890, 
  },
  {
    name: 'skhwsdh7@illinois.edu', watchTime: 2390,
  },
  {
    name: 'afdgb6@illinois.edu', watchTime: 3490,
  },
  {
    name: 'aparekh5@illinois.edu', watchTime: 4000, 
  },
  {
    name: 'anjablfa@illinois.edu', watchTime: 3000,
  },
  {
    name: 'wkbfjka9@illinois.edu', watchTime: 2000, 
  },
  {
    name: 'wfwfcw9@illinois.edu', watchTime: 2780, 
  },
  {
    name: 'dddge9@illinois.edu', watchTime: 1890, 
  },
  {
    name: 'skhwsdh7@illinois.edu', watchTime: 2390,
  },
  {
    name: 'afdgb6@illinois.edu', watchTime: 3490,
  },
  {
    name: 'aparekh5@illinois.edu', watchTime: 4000, 
  },
  {
    name: 'anjablfa@illinois.edu', watchTime: 3000,
  },
  {
    name: 'wkbfjka9@illinois.edu', watchTime: 2000, 
  },
  {
    name: 'wfwfcw9@illinois.edu', watchTime: 2780, 
  },
  {
    name: 'dddge9@illinois.edu', watchTime: 1890, 
  },
  {
    name: 'skhwsdh7@illinois.edu', watchTime: 2390,
  },
  {
    name: 'afdgb6@illinois.edu', watchTime: 3490,
  },
];

export default class BarGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.logsToDisplay = this.props.logsToDisplay;
    this.logsKeyword = this.props.logsKeyword;
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={1000}
        height={500}
        data={this.logsToDisplay.splice(0, 10)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.logsKeyword.itemName} />
        <YAxis unit=' mins' />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#248586" />
      </BarChart>
    );
  }
}
