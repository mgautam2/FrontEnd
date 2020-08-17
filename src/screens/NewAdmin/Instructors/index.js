import React, { useState, useEffect } from 'react';
import { CTFragment, CTHeading, CTAutoComplete, CTFormHelp } from 'layout';
import { api } from 'utils';
import _ from 'lodash';
import { Typography, TextField, Grid } from "@material-ui/core";
import GeneralTable from '../components/GeneralTable';
import { connectWithRedux } from '../controllers';
import './index.scss';

function InstructorsWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Instructors',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  const [universities, setUniversities] = useState([]);
  const [currUniversity, setCurrUniversity] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const getUniversities = async() => {
    api.getUniversities().then(({ data }) => {
      setUniversities(data);
      /**
       * Hide the loading page
       */
      api.contentLoaded();
    });
  }

  const getRolesByUniId = (uniId) => {
    api.getRolesByUniId(uniId).then((response_) => {
      setInstructors(response_.data);
    });
  };

  useEffect(() => {
    getUniversities();
  },[]);

  useEffect(() => {
    getRolesByUniId(currUniversity.id);
  },[currUniversity.id])

  const universitiesOptions = universities.map((university) => 
  { return { value: university.id, text:university.name} });

  const handleChangeName = (e, props, isFirstName) => {
    return (
      isFirstName 
      ? props.onRowDataChange({
        ...props.rowData,
        firstName: e.target.value
      })
      : props.onRowDataChange({
        ...props.rowData,
        lastName: e.target.value
      })
    );
  };

  const editName = (props, isFirstName) => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <TextField
          id={isFirstName ? "admin-instructors-firstName-input" : "admin-instructors-lastName-input"}
          placeholder={isFirstName ? "First Name" : "Last Name"}
          onChange={e => handleChangeName(e, props, isFirstName)}
          value={isFirstName ? props.rowData.firstName : props.rowData && props.rowData.lastName}
        />
      </Grid>
    );
  };

  const instructorColumns = [
    { title: 'Name',
      field: 'id',
      validate: rowData => (rowData.firstName !== undefined && rowData.firstName !== null && rowData.firstName !== '' 
      && rowData.lastName !== undefined && rowData.lastName !== null && rowData.lastName !== ''),
      render: rowData => {
        return (
          <Typography variant="body1">
            {rowData.firstName} {rowData.lastName}
          </Typography>
        );
      },
      editComponent: props => {
        return (
          <>
            {editName(props, true)}
            {editName(props, false)}
          </>
        );
      }
    },
    { title: 'Email',
      field: 'email',
      validate: rowData => (rowData.email !== undefined && rowData.email !== '')
    },
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

  const handleChangeUniversity = (value) => {
    const temp = _.find(universities, ['id', value]);
    setCurrUniversity(temp);
  };

  return (
    <CTFragment className='instructors-container'>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        <CTAutoComplete 
          id="select-university"
          label="Select University"
          options={universitiesOptions}
          value={currUniversity.id}
          onChange={handleChangeUniversity}
        />

        {currUniversity.length === 0 ? (
          <CTFragment className='instructor-list'>
            <CTFormHelp title="PLEASE SELECT A UNIVERSITY">
              <CTFragment>
                You can create or view contents after selecting an university.
              </CTFragment>
            </CTFormHelp>
          </CTFragment>
          ) : (
            <CTFragment className='instructor-list'>
              <GeneralTable 
                value={instructors}
                setValue={setInstructors}
                columnNames={instructorColumns}
              />
            </CTFragment>
          )}
      </CTFragment>
    </CTFragment>
  );
}

export const Instructors = connectWithRedux(
  InstructorsWithRedux,
  []
);