import React, { useState, useEffect } from 'react';
import { CTFragment, CTHeading } from 'layout';
import { api } from 'utils';
import { connectWithRedux } from '../controllers';
import GeneralTable from '../components/GeneralTable';

function UniversitiesWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Universities',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });
  
  const [universities, setUniversities] = useState([]);

  const getUniversities = async() => {
    api.getUniversities().then(({ data }) => {
      setUniversities(data);
      /**
       * Hide the loading page
       */
      api.contentLoaded();
    });
  };

  useEffect(() => {
    getUniversities();
  },[]);

  const univColumns = [
    { title: 'Name',
      field: 'name',
      validate: rowData => (rowData.name !== undefined && rowData.name !== '')
    },
    { title: 'Domain',
      field: 'domain',
      validate: rowData => (rowData.domain !== undefined && rowData.domain !== '')
    },
  ];

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        <GeneralTable value={universities} setValue={setUniversities} columnNames={univColumns} />
      </CTFragment>
    </CTFragment>
  );
}

export const Universities = connectWithRedux(
  UniversitiesWithRedux,
  []
);