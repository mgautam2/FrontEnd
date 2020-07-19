import React from 'react';
import { CTFragment } from 'layout';
import { Tab } from 'semantic-ui-react';
import UniversityItem from './UniversityListItem';

function UniversityList(props) {
    const {universities} = props;

    return (
      <CTFragment>
        {(universities || [])
            .slice()
            .reverse()
            .map((university) => (
              <Tab.Pane attached={false}>
                <UniversityItem
                  name={university.name}
                  id={university.id} 
                  domain={university.domain}
                />
              </Tab.Pane>
            ))}
      </CTFragment>
    );
}

export default UniversityList;