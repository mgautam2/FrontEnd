import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TimeTable from './components/TimeTable';
import BarGraph from './components/BarGraph';
import { useStyles } from './style.js';

export const AnalyticsTypes = {
  viewerStats : 'viewerStats',
  videoStats : 'videoStats',
  statsSum : 'statsSum',
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`VideoTimeTable-tabpanel-${index}`}
        aria-labelledby={`VideoTimeTable-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };  

  function tabProps(index) {
    return {
      id: `VideoTimeTable-tab-${index}`,
      'aria-controls': `VideoTimeTable-tabpanel-${index}`,
    };
  }
  


function VideoTimeTable({logsToDisplay, logsKeyword, offeringId, tabName}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
  });


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs style={{backgroundColor: '#248586'}} value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.tabStyle} label={tabName} {...tabProps(0)} />
          <Tab className={classes.tabStyle} label="Bar Graph" {...tabProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TimeTable 
          logsToDisplay={logsToDisplay}
          logsKeyword={logsKeyword}
        /> 
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BarGraph
          logsToDisplay={logsToDisplay}
          logsKeyword={logsKeyword}
        />
      </TabPanel>
    </div>
  );
}

export default VideoTimeTable
