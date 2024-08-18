import { GridColDef } from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field:'subjectId',
      headerName:"Mã Môn học",
      width:100,
    },
    {
      field: 'topicName',
      headerName: 'Chủ đề ',
      width: 150,
      editable: true,
    },
    
    {
      field: 'description',
      headerName: 'Chi tiết',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
        field:'createDate',
        headerName:"Ngày tạo",
        width:100,
        editable: true,
      },
      {
        field:'creatorId',
        headerName:"Mã người tạo",
        width:100,
        editable: true,
      },
    
  ];
const Topic = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
      // Fetch data from your API using Axios
      axios.get('https://localhost:7034/api/Topic')
        .then(response => {
          // Set the fetched data as the rows state
          setRows(response.data);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  return (
    <div className="monhoc">
            <div className="infor">
                <h1>Chủ đề môn học</h1>
                <button>thêm mới chủ đề</button>
            </div>
            <DataTable colums={columns} rows={rows} slug={"chu-de"}/>
        </div>
  )
  
}

export default Topic
