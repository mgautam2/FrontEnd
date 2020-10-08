import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles, useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import _ from 'lodash';
import { VideoTimeDataParser, prettierToNormalKeywordsMapped } from '../../../VideoTimeDataParser/index';

const useStyles = makeStyles((theme) => ({
  TablePaginationActions : {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  root: {
      width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

/*
  This component is the Enhanced Table Head for the table
*/
function EnhancedTableHead(props) {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState('Total');
  const [order, setOrder] = useState('desc');
  const { headCells } = props;
  const createSortHandler = (property) => (event) => {
    // eslint-disable-next-line no-console
    if (property === orderBy) {
      if (order === 'asc') {
        setOrder('desc');
      } else {
        setOrder('asc');
      }
    } else {
      setOrder('asc');
    }
    props.logsSortHandler(prettierToNormalKeywordsMapped[property], (order === 'desc'));
    setOrderBy(property);
  };


  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => {
          return (
            <TableCell
              align={index >= 1 ? 'right' : 'left'}
            >
              <TableSortLabel
                active={orderBy === headCell}
                direction={orderBy === headCell ? order : 'asc'}
                onClick={createSortHandler(headCell)}
              >
                {headCell}
                {orderBy === headCell ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        }
        )}
      </TableRow>
    </TableHead>
  );
}




/*
  This Component enables the table to have the option of showing a specific number of rows per page
  This component was inspired from https://material-ui.com/components/tables/ examples
  This components is basically the footer of the table

*/

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.TablePaginationActions}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function TimeTable({logsToDisplay, logsKeyword}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [logs, setLogs] = useState(_.cloneDeep(logsToDisplay));

    const logsSortHandler = ( keyword, descending ) => {
      const newLogs = VideoTimeDataParser.sortLogs(logs, keyword, descending);
      setLogs(newLogs);
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    let headCells = [];

    Object.entries(logsKeyword).forEach((entry) => {
      if (!(entry[0] === 'nameIdentifier' || entry[0] === 'itemName')) {
        headCells.push(entry[1]);
      }
    });


    const emptyRows = rowsPerPage -
     Math.min(rowsPerPage, logsToDisplay.length - page * rowsPerPage);


    return (
      <TableContainer component={Paper}>
        <Table aria-label={`${logs.nameIdentifier} Time Table`}>
          <EnhancedTableHead 
            headCells={headCells}
            logsSortHandler={logsSortHandler}
          />
          <TableBody>
            {logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row[logsKeyword.itemName]}
                </TableCell>
                <TableCell align="right">{row.last1Hr}</TableCell>
                <TableCell align="right">{row.last3Days}</TableCell>
                <TableCell align="right">{row.lastWeek}</TableCell>
                <TableCell align="right">{row.lastMonth}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
                ))}
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={logs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      );
}

export default TimeTable
