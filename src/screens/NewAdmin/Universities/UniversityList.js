import React from 'react';
import MaterialTable from 'material-table';

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
          title=""
          columns={univColumns}
          data={universities.reverse()}
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