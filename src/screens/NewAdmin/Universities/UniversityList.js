import React, { useState } from 'react';
import { CTFragment } from 'layout';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import MaterialTable from 'material-table';
import UniversityItem from './UniversityListItem';

// const useStyles1 = makeStyles((theme) => ({
//     root: {
//       flexShrink: 0,
//       marginLeft: theme.spacing(2.5),
//     },
//   }));
  
// function TablePaginationActions(props) {
//     const classes = useStyles1();
//     const theme = useTheme();
//     const { count, page, rowsPerPage, onChangePage } = props;
  
//     const handleFirstPageButtonClick = (event) => {
//       onChangePage(event, 0);
//     };
  
//     const handleBackButtonClick = (event) => {
//       onChangePage(event, page - 1);
//     };
  
//     const handleNextButtonClick = (event) => {
//       onChangePage(event, page + 1);
//     };
  
//     const handleLastPageButtonClick = (event) => {
//       onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//     };
  
//     return (
//       <div className={classes.root}>
//         <IconButton
//           onClick={handleFirstPageButtonClick}
//           disabled={page === 0}
//           aria-label="first page"
//         >
//           {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//         </IconButton>
//         <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//           {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//         </IconButton>
//         <IconButton
//           onClick={handleNextButtonClick}
//           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//           aria-label="next page"
//         >
//           {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//         </IconButton>
//         <IconButton
//           onClick={handleLastPageButtonClick}
//           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//           aria-label="last page"
//         >
//           {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//         </IconButton>
//       </div>
//     );
// }
  
// TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     onChangePage: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
// };
  
// const useStyles2 = makeStyles({
//     table: {
//       minWidth: 500,
//     },
// });
  
// function UniversityList(props) {
//     const {universities, setUniversities} = props;

//     const classes = useStyles2();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
//     const emptyRows = rowsPerPage - Math.min(rowsPerPage, universities.length - page * rowsPerPage);
  
//     const handleChangePage = (event, newPage) => {
//       setPage(newPage);
//     };
  
//     const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(parseInt(event.target.value, 10));
//       setPage(0);
//     };
  
//     return (
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="pagination table">
//           <TableBody>
//             {(rowsPerPage > 0
//               ? universities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : universities
//             ).map((university) => (
//               <TableRow key={university.name}>
//                 <TableCell component="th" scope="row">
//                   {university.name}
//                 </TableCell>
//                 <TableCell style={{ width: 160 }} align="right">
//                   {university.domain}
//                 </TableCell>
//               </TableRow>
//             ))}
  
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={6} />
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                 colSpan={3}
//                 count={universities.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 SelectProps={{
//                   inputProps: { 'aria-label': 'rows per page' },
//                   native: true,
//                 }}
//                 onChangePage={handleChangePage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     );
// }






function UniversityList(props) {
    const {universities, setUniversities} = props;

    const univColumns = [
        { title: 'Name', field: 'name' },
        { title: 'Domain', field: 'domain' },
    ];
  
    return (
      <div>
        <MaterialTable
          options={{
            paging: true, 
            pageSize: 5, 
            pageSizeOptions: [5, 10, 50],
            sorting: true,
            exportButton: true,
            actionsColumnIndex: -1
        }}
        // localization={{
        //     pagination: {
        //       labelDisplayedRows: 'string here',
        //       labelRowsPerPage: 'another string here'
        //     }
        // }}
        // components={{
        //     Pagination: props => (
        //         <TablePagination
        //             {...props}
        
        //             // ******* These don't work anymore, because overwritten ********
        //             labelRowsPerPage={<div style={{fontSize: 14}}>{props.labelRowsPerPage}</div>}
        //             labelDisplayedRows={row => <div style={{fontSize: 14}}>{props.labelDisplayedRows(row)}</div>}
        //             // ******* 
        //         />
        //     )
        //   }}
          title=""
          columns={univColumns}
          data={universities}
          editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setUniversities([...universities, newData]);
                            resolve();
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...universities];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setUniversities([...dataUpdate]);
                            resolve();
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...universities];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setUniversities([...dataDelete]);
                            resolve();
                        }, 600);
                    }),
            }}
        />
      </div>
    );
  }

export default UniversityList;