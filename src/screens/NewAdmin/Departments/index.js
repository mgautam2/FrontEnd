import React, { useState, useEffect } from 'react';
import { CTFragment, CTHeading, CTAutoComplete } from 'layout';
import { api } from 'utils';
import GeneralTable from '../Components/GeneralTable';

import { connectWithRedux } from '../controllers';
import './index.scss';

function DepartmentsWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Departments',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  const [universities, setUniversities] = useState([]);
  const [currUniversity, setCurrUniversity] = useState("none");
  const [departments, setDepartments] = useState([]);

  const getUniversities = async() => {
    api.getUniversities().then(({ data }) => {
      setUniversities(data);
      /**
       * Hide the loading page
       */
      api.contentLoaded();
    });
  }

  const getDepartsByUniId = (uniId) => {
    api.getDepartsByUniId(uniId).then((response_) => {
      setDepartments(response_.data);
    });
  };

  useEffect(() => {
    getUniversities();
  },[]);

  useEffect(() => {
    getDepartsByUniId(currUniversity);
  },[currUniversity])

  const universitiesOptions = universities.map((university) => 
  { return { value: university.id, text:university.name} });

  const depColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Acronym', field: 'acronym' },
  ];

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        <CTAutoComplete 
          id="select-university"
          label="Select University"
          options={universitiesOptions}
          value={currUniversity}
          onChange={(value) => {
            setCurrUniversity(value);
          }}
        />
        {/* <CTFragment>
          Current University ID: {currUniversity}
        </CTFragment> */}
        
        <GeneralTable value={departments} setValue={setDepartments} columnNames={depColumns} />
      </CTFragment>
    </CTFragment>
  );
}

export const Departments = connectWithRedux(
    DepartmentsWithRedux,
    []
);