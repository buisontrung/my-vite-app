import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { userRows } from "../../data";
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field:'avatar',
      headerName:"Avatar",
      width:100,
      renderCell: (params)=>{
            return <img src={params.row.img || "/noavatar.png"} />
        }
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    
  ];
const User = ()=>{
    return(
        <div className="user">
            <div className="infor">
                <h1>User</h1>
                <button>Add new Admin,Teacher</button>
            </div>
            <DataTable colums={columns} rows={userRows} slug={"user"}/>
        </div>
    )
}
export default User;