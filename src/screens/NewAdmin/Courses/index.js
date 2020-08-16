import React, { useState, useEffect } from 'react';
import { CTFragment, CTHeading, CTAutoComplete, CTFormHelp, CTText } from 'layout';
import { api } from 'utils';
import _ from 'lodash';
import { Typography, TextField, Grid, InputAdornment } from "@material-ui/core";
import GeneralTable from '../Components/GeneralTable';
import { connectWithRedux } from '../controllers';
import './index.scss';

function CoursesWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Course Templates',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  const [universities, setUniversities] = useState([]);
  const [currUniversity, setCurrUniversity] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currDepartment, setCurrDepartment] = useState([]);
  const [courses, setCourses] = useState([]);

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

  const getCoursesByDepartId = (departId) => {
    api.getCoursesByDepartId(departId).then((response_) => {
      setCourses(response_.data);
    });
  };

  useEffect(() => {
    getUniversities();
  },[]);

  useEffect(() => {
    getDepartsByUniId(currUniversity.id);
  },[currUniversity.id])

  useEffect(() => {
    getCoursesByDepartId(currDepartment.id);
  },[currDepartment.id])

  const universitiesOptions = universities.map((university) => 
  { return { value: university.id, text:university.name} });

  const handleChangeUniversity = (value) => {
    const temp = _.find(universities, ['id', value]);
    setCurrUniversity(temp);
  };

  const DepartmentsOptions = departments.map((department) => 
  { return { value: department.id, text:department.name} });

  const handleChangeDepartment = (value) => {
    const temp = _.find(departments, ['id', value]);
    setCurrDepartment(temp);
  };

  const courseColumns = [
    { title: 'Course Number',
      field: 'courseNumber',
      render: rowData => {
        return (
          <Typography variant="body1">
            {currDepartment.acronym}{rowData.courseNumber}
          </Typography>
        );
      },
      editComponent: props => {
        return (
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TextField
              id="admin-courses-courseNumber-input"
              placeholder="Course Number"
              InputProps={{
                // 'aria-label': 'courseNumber-input',
                startAdornment: <InputAdornment position="start">{currDepartment.acronym}</InputAdornment>,
              }}
              onChange={e =>
                props.onRowDataChange({
                  ...props.rowData,
                  courseNumber: e.target.value
                })}
              value={props.rowData.courseNumber}
            />
          </Grid>
        );
      }
    },
    { title: 'Department', 
      field: 'id',
      render: () => {
        return (
          <Typography variant="body1">
            {currDepartment.name}
          </Typography>
        );
      },
      editable: false
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

  return (
    <CTFragment className='courses-container'>
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
          <CTFragment className='course-department-select'>
            <CTFormHelp title="PLEASE SELECT A UNIVERSITY">
              <CTFragment>
                You can create or view contents after selecting an university.
              </CTFragment>
            </CTFormHelp>
          </CTFragment>
          ) : (
            <CTFragment className='course-department-select'>
              <CTAutoComplete 
                id="select-department"
                label="Select Department"
                options={DepartmentsOptions}
                value={currDepartment.id}
                onChange={handleChangeDepartment}
              />
              {currDepartment.length === 0 ? (
                <CTFragment className='course-list'>
                  <CTFormHelp title="PLEASE SELECT A DEPARTMENT">
                    <CTFragment>
                      You can create or view contents after selecting a department.
                    </CTFragment>
                  </CTFormHelp>
                </CTFragment>
                ) : (
                  <CTFragment className='course-list'>
                    <GeneralTable 
                      value={courses}
                      setValue={setCourses}
                      columnNames={courseColumns}
                    />
                  </CTFragment>
                )}
            </CTFragment>
          )}
      </CTFragment>
    </CTFragment>
  );
}

export const Courses = connectWithRedux(
    CoursesWithRedux,
    []
);