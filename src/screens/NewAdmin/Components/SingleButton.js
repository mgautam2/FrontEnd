import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const useStyles = makeStyles({
  button: {
    fontWeight: 'bold',
    background: 'teal',
    color: 'white',
    '&:hover': {
      background: 'white',
      color: 'teal'
    }
  }
});

function SingleButton(props) {
    const {text, icon} = props;

    const classes = useStyles();

    return (
      <Button
        variant="contained"
        className={cx(classes.button, 'mb-2')}
        startIcon={icon}
      >
        {text}
      </Button>
    );
}

export default SingleButton;