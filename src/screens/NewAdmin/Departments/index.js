import React, { useState, useEffect } from 'react';
import { CTFragment, CTHeading, CTAutoComplete, CTFormHelp, CTText } from 'layout';
import { api } from 'utils';
import _ from 'lodash';
import { Typography } from "@material-ui/core";
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
  const [currUniversity, setCurrUniversity] = useState([]);
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
    getDepartsByUniId(currUniversity.id);
  },[currUniversity.id])

  const universitiesOptions = universities.map((university) => 
  { return { value: university.id, text:university.name} });

  const departmentColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Acronym', field: 'acronym' },
    { title: 'University', 
      field: 'id',
      render: () => {
        return (
          <Typography variant="body1">
            {currUniversity.name}
          </Typography>
        );
      },
      editable: false
    },
  ];

  const handleChange = (value) => {
    const temp = _.find(universities, ['id', value]);
    setCurrUniversity(temp);
  };

  return (
    <CTFragment className='departments-container'>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        <CTAutoComplete 
          id="select-university"
          label="Select University"
          options={universitiesOptions}
          value={currUniversity.id}
          onChange={handleChange}
        />

        {currUniversity.length === 0 ? (
          <CTFragment className='department-list'>
            <CTFormHelp title="PLEASE SELECT A UNIVERSITY">
              <CTFragment>
                You can create or view contents after selecting an university.
              </CTFragment>
            </CTFormHelp>
          </CTFragment>
          ) : (
            <CTFragment className='department-list'>
              <GeneralTable 
                value={departments}
                setValue={setDepartments}
                columnNames={departmentColumns}
              />
            </CTFragment>
          )}
      </CTFragment>
    </CTFragment>
  );
}

export const Departments = connectWithRedux(
    DepartmentsWithRedux,
    []
);