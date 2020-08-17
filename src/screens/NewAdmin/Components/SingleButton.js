import React from 'screens/NewAdmin/components/node_modules/react';
import cx from 'screens/NewAdmin/components/node_modules/classnames';
import { makeStyles } from 'screens/NewAdmin/components/node_modules/@material-ui/core/styles';
import Button from 'screens/NewAdmin/components/node_modules/@material-ui/core/Button';

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