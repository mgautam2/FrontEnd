import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'theme.palette.background.paper',
    },
    tabStyle : {
        fontSize: '16px',
        textTransform: 'capitalize',
        paddingLeft : '50px',
        paddingRight : '50px'
    }
}));
  