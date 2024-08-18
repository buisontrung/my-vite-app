import { GridColDef } from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { useAuth } from "../../components/AuthProvider/useAuth";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field:'classId',
      headerName:"ID Lớp học",
      width:100,
    },
    {
      field: 'subjectName',
      headerName: 'Môn học',
      width: 150,
      editable: true,
    },
    
    {
      field: 'numberSessions',
      headerName: 'Số buổi dạy',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
        field:'avatar',
        headerName:"Ảnh mô tả",
        width:100,
        renderCell: (params)=>{
              return <img src={params.row.img || "https://th.bing.com/th/id/OIP.OBFQJmDpiDrSZ-r_g6uM6wHaDC?rs=1&pid=ImgDetMain"} />
          }
      },
      {
        field:'addstudent',
        headerName:"thêm mới học sinh",
        width:150,
        renderCell: (params) => {
          return (
            <Button><Link to={`/admin/addstudent?subjectid=${params.id}`} style={{ color: 'black', textDecoration: 'none' }}>
            add Student
          </Link></Button>
              
            
          );
        }
      },
  ];
const Subject = () => {
    const [rows, setRows] = useState([]);
    const {user} = useAuth();
    useEffect(() => {
      // Fetch data from your API using Axios
      if(user&&user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]==="ADMIN"){
        axios.get('https://localhost:7034/api/Subject')
        .then(response => {
          // Set the fetched data as the rows state
          setRows(response.data);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }else if(user&&user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]==="TEACHER"){
        axios.get(`https://localhost:7034/api/Subject/getByTeacherId/${user.Id}`)
        .then(response => {
          // Set the fetched data as the rows state
          setRows(response.data);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }
      
    }, [user]);
  return (
    <div className="monhoc">
            <div className="infor">
                <h1>Lớp học</h1>
                <button>thêm mới môn học</button>
            </div>
            <DataTable colums={columns} rows={rows} slug={"mon-hoc"}/>
        </div>
  )
  
}

export default Subject
