import { GridColDef } from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import './Class.scss'
import Add from "../../components/Add/Add";
const columns: GridColDef[] = [
    {   field: 'id', headerName: 'ID', width: 90 },
    {
        field:'className',
        type: "string",
        headerName:"Lớp học",
        width:100,
        editable: true,
    },
    {
        field:'description',
        type: "string",
        headerName:"Chi tiết",
        width:100,
        editable : true,
      },
      
  ];
const Class = () => {
    const [rows, setRows] = useState([]);
    const [open,setOpen] = useState(false);
    useEffect(() => {
      // Fetch data from your API using Axios
      axios.get('https://localhost:7034/api/Class')
        .then(response => {
          // Set the fetched data as the rows state
          setRows(response.data);
          
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          
        });
    }, []);
  return (
    <div className="lophoc">
            <div className="infor">
                <h1>Lớp học</h1>
                <button onClick={() => { setOpen(true); { console.log(setOpen) } }}>thêm mới lớp học</button>
            </div>
            <DataTable colums={columns} rows={rows} slug={"lop-hoc"}/>
            {open &&<Add setOpen={setOpen} slug="lớp học" columns={columns} url="https://localhost:7034/api/Class"/>}
        </div>
  )
}

export default Class
