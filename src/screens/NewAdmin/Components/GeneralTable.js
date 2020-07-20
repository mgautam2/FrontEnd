import React from 'react';
import MaterialTable from 'material-table';

function GeneralTable(props) {
  const {value, setValue, columnNames} = props;

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
        title=""
        columns={columnNames}
        data={value.reverse()}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setValue([...value, newData]);
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...value];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setValue([...dataUpdate]);
                resolve();
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...value];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setValue([...dataDelete]);
                resolve();
              }, 600);
            }),
        }}
      />
    </div>
  );
}

export default GeneralTable;