import React, { useState, useEffect } from 'react';
import { CTLayout, CTFragment, CTHeading } from 'layout';
import { Divider } from 'semantic-ui-react';
import { api } from 'utils';
import { connectWithRedux } from '../controllers';
import SingleButton from '../Components/SingleButton';
import UniversityList from './UniversityList';
import './index.scss';

function UniversitiesWithRedux() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    api.getUniversities().then(({ data }) => {
      setUniversities(data);
      /**
       * Hide the loading page
       */
      api.contentLoaded();
    });
  })

  const headingProps = CTHeading.createProps({
    heading: 'Universities',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment className='universities-container'>
      <CTHeading {...headingProps} />

      <CTFragment padding={[0, 30]}>

        <Divider />

        <div className='create-new-button'>
          <SingleButton text='Create New University' />
        </div>
        
        <Divider horizontal>All Universities</Divider>
        
        <UniversityList universities={universities} />

      </CTFragment>
    </CTFragment>
  );
}

export const Universities = connectWithRedux(
    UniversitiesWithRedux,
    []
);