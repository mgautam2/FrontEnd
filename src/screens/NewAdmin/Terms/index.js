import React, { useState, useEffect }from 'react';
import { CTFragment, CTHeading, CTAutoComplete, CTFormHelp, CTText } from 'layout';
import { api } from 'utils';
import _ from 'lodash';
import { Typography, TextField, Grid } from "@material-ui/core";
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
  };

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
  },[currUniversity.id]);

  const universitiesOptions = universities.map((university) => 
  { return { value: university.id, text:university.name} });

  const renderDate = (value) => {
    return (
      <Typography variant="body1">
        {(value || '').substring(0, 10)}
      </Typography>
    );
  };

  const handleChangeDate = (e, props, isStart) => {
    return (
      isStart 
      ? props.onRowDataChange({
          ...props.rowData,
          startDate: (e.target.value !== '' ? new Date(e.target.value).toISOString() : undefined)
      })
      : props.onRowDataChange({
          ...props.rowData,
          endDate: (e.target.value !== '' ? new Date(e.target.value).toISOString() : undefined)
      })
    );
  };

  const editDate = (props, isStart) => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <TextField
          required
          id={isStart ? "admin-terms-startDate-input" : "admin-terms-endDate-input"}
          label={isStart ? "Start Date" : "End Date"}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={isStart
            ? { max: (props.rowData.endDate || '').substring(0, 10) } 
            : { min: (props.rowData.startDate || '').substring(0, 10) }}
          onChange={e => handleChangeDate(e, props, isStart)}
          value={isStart
          ? (props.rowData.startDate || '').substring(0, 10)
          : (props.rowData.endDate || '').substring(0, 10)}
        />
      </Grid>
    );
  };

  const termColumns = [
    { title: 'Name',
      field: 'name',
      validate: rowData => (rowData.name !== undefined && rowData.name !== '')
    },
    { title: 'Start Date',
      field: 'startDate',
      validate: rowData => rowData.startDate !== undefined,
      render: rowData => {
        return renderDate(rowData.startDate);
      },
      editComponent: props => {
        return editDate(props, true);
      }
    },
    { title: 'End Date',
      field: 'endDate',
      validate: rowData => rowData.endDate !== undefined,
      render: rowData => {
        return renderDate(rowData.endDate);
      },
      editComponent: props => {
        return editDate(props, false);
      }
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
    <CTFragment className='terms-container'>
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