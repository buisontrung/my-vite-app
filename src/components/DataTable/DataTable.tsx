import { Link } from "react-router-dom";
import "./DataTable.scss";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
// const columns: GridColDef<(typeof rows)[number]>[] = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//         field:'avatar',
//         headerName:"Avatar",width:100,
//         renderCell: (params)=>{
//             return <img src={params.row.img || "/noavatar.png"} />
//         }
//     },
//     {
//       field: 'firstName',
//       headerName: 'First name',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'lastName',
//       headerName: 'Last name',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 110,
//       editable: true,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
//     {
//       field:'actions',
//       headerName:"Actions",width:100,
//       renderCell: (params)=>{
//           return <div className="action">
//               <div className="view">
              
//               </div>
//               <div className="delete">

//               </div>
//           </div>
//       }
//   },
//   ];
  
//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];
type Props = {
  colums : GridColDef[],
  rows: object[],
  slug: string
}
const DataTable = (props:Props) => {
  const handleDeleteUser = (id: number) => {
    alert(`User with ID ${id} will be deleted.`);
    // Thực hiện các hành động xóa người dùng ở đây
  }
    
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
            
          </Link>
          <Link to=""className="delete" onClick={() => handleDeleteUser(params.row.id)}>
            <img src="/delete.svg" alt="Delete" />
          </Link>
        </div>
      );
    },
  };
  const columnsWithActions = [...props.colums, actionColumn];
  return (
    <div className="dataTable">
       <DataGrid className="dataGrid"
        rows={props.rows}
        columns={columnsWithActions}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter:true,
                quickFilterProps:{debounceMs:500}
            }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default DataTable
