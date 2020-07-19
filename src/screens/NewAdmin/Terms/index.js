import React, { useState, useEffect }from 'react';
import { CTFragment, CTHeading } from 'layout';
import { Tab, Divider, Message, Form, Select } from 'semantic-ui-react';
import { api } from 'utils';
import { connectWithRedux } from '../controllers';
import SingleButton from '../Components/SingleButton';
import './index.scss';

function TermsWithRedux(props) {
  const [terms, setTerms] = useState([])
  const getTerms = async() => {
    api.getUniversities().then(({ data }) => {
      setTerms(data);
      /**
       * Hide the loading page
       */
      api.contentLoaded();
    });
  }
  useEffect(() => {
    getTerms();
  },[]);

  const headingProps = CTHeading.createProps({
    heading: 'Terms',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment className='terms-container'>
      <CTHeading {...headingProps} />
      <Message.Header>Select from Universities</Message.Header>
      <Form>
        <Form.Field
          control={Select}
            // options={uniOptions}
          defaultValue={localStorage.getItem('termCurrUni')}
          onChange={(event, data) => props.setCurrent('termCurrUni', data)}
        />
      </Form>
      <CTFragment padding={[0, 30]}>
        <Divider />
        <div className='create-new-button'>
          <SingleButton text='Create New Terms' />
        </div>
        <Divider horizontal>All Terms</Divider>
      </CTFragment>
    </CTFragment>
  );
}

export const Terms = connectWithRedux(
    TermsWithRedux,
    []
);