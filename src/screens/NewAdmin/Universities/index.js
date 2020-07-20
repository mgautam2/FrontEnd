import React, { useState, useEffect } from 'react';
import { CTLayout, CTFragment, CTHeading } from 'layout';
import { Divider } from 'semantic-ui-react';
import { api } from 'utils';
import { connectWithRedux } from '../controllers';
import GeneralTable from '../Components/GeneralTable';
import './index.scss';

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
  }

  useEffect(() => {
    getUniversities();
  },[]);

  const univColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Domain', field: 'domain' },
  ];

  return (
    <CTFragment className='universities-container'>
      <CTHeading {...headingProps} />

      <CTFragment padding={[0, 30]}>

        {/* <Divider />

        <div className='create-new-button'>
          <SingleButton text='Create New University' />
        </div>
        
        <Divider horizontal>All Universities</Divider> */}

        <GeneralTable value={universities} setValue={setUniversities} columnNames={univColumns} />

      </CTFragment>
    </CTFragment>
  );
}

export const Universities = connectWithRedux(
    UniversitiesWithRedux,
    []
);