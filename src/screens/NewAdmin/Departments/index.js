import React, { useState, useEffect } from 'react';
import { CTFragment, CTHeading } from 'layout';
import { api } from 'utils';
import { Divider , Dropdown } from 'semantic-ui-react';

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
  const [currUni, setCurrUni] = useState("none");
  const [currUniId, setCurrUniId] = useState("none");
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
    getDepartsByUniId(currUniId);
  },[])

  const universitiesOptions = universities.map((university) => 
  { return {key: university.id, value: university.name, text:university.name} });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        <Divider />
        <CTFragment>
          Select from Universities
        </CTFragment>
        <CTFragment>
          Current University: {currUni}
        </CTFragment>
        <Dropdown
          placeholder='Select University'
          fluid
          search
          selection
          options={universitiesOptions}
          onChange={(e, data) => {
            const { value } = data;
            setCurrUni(value);
            const { key } = data.options.find(o => o.value === value);
            setCurrUniId(key);
          }}
        />
        <CTFragment>
          Current University ID: {currUniId}
        </CTFragment>
      </CTFragment>
    </CTFragment>
  );
}

export const Departments = connectWithRedux(
    DepartmentsWithRedux,
    []
);