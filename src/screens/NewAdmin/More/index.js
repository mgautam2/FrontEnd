import React, { useState } from 'react';
import { CTFragment, CTHeading, CTForm } from 'layout';
import { DateRangePicker } from 'react-dates';
import Moment from 'moment';
import { api } from 'utils';
import { connectWithRedux } from '../controllers';
import './index.scss';

const fileDownload = require('js-file-download');

function momentToISOString(moment) {
  if (typeof moment === 'string') return moment;
  const date = moment.toDate();
  date.setUTCHours(0, 0, 0);
  return date.toISOString();
}

function MoreWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'More',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, setStartDate] = useState(new Moment());
  const [endDate, setEndDate] = useState(null);

  const onFocusChange = (focusedInput_) => {
    setFocusedInput(focusedInput_);
  };

  const onChange = (value, key) => {
    if (key === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const onDownload = async () => {
    const from = momentToISOString(startDate);
    const to = momentToISOString(endDate);
    const { data } = await api.adminGetLogs(from, to);
    let filename = `logs (${from.slice(0, 10)} to ${to.slice(0, 10)}).csv`;
    fileDownload(data, filename);
    setEndDate(null);
    setStartDate(new Moment());
  };

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 50]}>
        <CTForm
          id="download-logs" 
          padding={[0, 30]}
          heading="Download Logs"
          details="Select Date Range"
          onSave={onDownload}
          onSaveButtonText='Download'
          className="more-container"
        >     
          <CTFragment>
            <DateRangePicker
              noBorder
              isOutsideRange={() => false}
              startDate={startDate} // momentPropTypes.momentObj or null,
              startDateId="logs-startDate" // PropTypes.string.isRequired,
              endDate={endDate} // momentPropTypes.momentObj or null,
              endDateId="logs-endDate" // PropTypes.string.isRequired,
              onDatesChange={(data) => {
              onChange(data.startDate, 'startDate');
              onChange(data.endDate, 'endDate');
            }} // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={onFocusChange}
            />
          </CTFragment>
        </CTForm>
      </CTFragment>
    </CTFragment>
  );
}

export const More = connectWithRedux(
    MoreWithRedux,
    []
);