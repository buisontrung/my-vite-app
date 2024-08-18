import { GridColDef } from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";

import Add from "../../components/Add/Add";

const columns: GridColDef[] = [
    {   field: 'id', headerName: 'ID', width: 90 },
    {
        field:'title',
        type: "string",
        headerName:"Tiêu đề bài đăng",
        width:200,
        editable: true,
    },
    {
        field:'authorId',
        type: "string",
        headerName:"Tên tác giả",
        width:200,
        editable: true,
    },
    {
        field:'content',
        type: "string",
        headerName:"chi tiết",
        width:100,
        editable : true,
      },
      {
        field:'imageUrl',
        type: "string",
        headerName:"Hình ảnh bài đăng",
        width:150,
        renderCell: (params) => {
          return (
           
              <img src={"https://localhost:7034/Images/"+ params.row.imageUrl} alt="" />
            
          );
        }
      },
      {
        field:'imageFile',
       
        
        
      }
      
  ];
const Post = () => {
    const [rows, setRows] = useState([]);
    const [open,setOpen] = useState(false);
    useEffect(() => {
      // Fetch data from your API using Axios
      axios.get('https://localhost:7034/api/post')
        .then(response => {
          // Set the fetched data as the rows state
          setRows(response.data);
          
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert("aAA");
        });
    }, []);
  return (
    <div className="lophoc">
            <div className="infor"> 
                <h1>Bài Đăng</h1>
                <button onClick={()=>{setOpen(true)}}>thêm mới Tin tức</button>
            </div>
            <DataTable colums={columns} rows={rows} slug={"tin-tuc"}/>
            {open &&<Add setOpen={setOpen} slug="Tin tức" columns={columns} url="https://localhost:7034/api/post"/>}
        </div>
  )
}

export default Post
