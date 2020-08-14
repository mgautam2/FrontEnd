import React, { useState, useEffect }from 'react';
import { CTFragment, CTHeading, CTAutoComplete, CTFormHelp, CTText } from 'layout';
import { api } from 'utils';
import _ from 'lodash';
import { Typography, TextField, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GeneralTable from '../Components/GeneralTable';
import { connectWithRedux } from '../controllers';
import './index.scss';

function TermsWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Terms',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  const [universities, setUniversities] = useState([]);
  const [currUniversity, setCurrUniversity] = useState([]);
  const [terms, setTerms] = useState([]);

  const getUniversities = async() => {
    api.getUniversities().then(({ data }) => {
      setUniversities(data);
      /**
       * Hide the loading page
       */
      api.contentLoaded();
    });
  }

  const getTermsByUniId = (uniId) => {
    api.getTermsByUniId(uniId).then((response_) => {
      setTerms(response_.data);
    });
  };

  useEffect(() => {
    getUniversities();
  },[]);

  useEffect(() => {
    getTermsByUniId(currUniversity.id);
  },[currUniversity.id])

  const universitiesOptions = universities.map((university) => 
  { return { value: university.id, text:university.name} });

  const termColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Start Date', field: 'startDate' },
    { title: 'Start Date',
      field: 'startDate',
      render: rowData => {
        return (
          <>
            <Typography variant="body1">
              {rowData.startDate}
            </Typography>
          </>
        );
      },
      editComponent: props => {
        return (
          <>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e =>
                  props.onRowDataChange({
                    ...props.rowData,
                    startDate: e.target.value
                  })}
                value={props.rowData.startDate}
              />
            </Grid>
          </>
        );
      }
    },
    { title: 'End Date', field: 'endDate' },
    { title: 'End Date',
      field: 'endDate',
      render: rowData => {
        return (
          <>
            <Typography variant="body1">
              {rowData.endDate}
            </Typography>
          </>
        );
      },
      editComponent: props => {
        return (
          <>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e =>
                  props.onRowDataChange({
                    ...props.rowData,
                    endDate: e.target.value
                  })}
                value={props.rowData.endDate}
              />
            </Grid>
          </>
        );
      }
    },
    { title: 'University', 
      field: 'id',
      render: rowData => {
        return (
          <>
            <Typography variant="body1">
              {currUniversity.name}
            </Typography>
          </>
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
    <CTFragment className='terms-container'>
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
          <CTFragment className='term-list'>
            <CTFormHelp title="PLEASE SELECT A UNIVERSITY">
              <CTFragment>
                You can create or view contents after selecting an university.
              </CTFragment>
            </CTFormHelp>
          </CTFragment>
          ) : (
            <CTFragment className='term-list'>
              <GeneralTable 
                value={terms}
                setValue={setTerms}
                columnNames={termColumns}
              />
            </CTFragment>
          )}
      </CTFragment>
    </CTFragment>
  );
}

export const Terms = connectWithRedux(
    TermsWithRedux,
    []
);