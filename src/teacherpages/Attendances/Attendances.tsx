import { GridColDef } from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { Link } from "react-router-dom";

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
    headerName: 'Số buổi học',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field:'avatar',
    headerName:"Ảnh mô tả",
    width:100,
    renderCell: (params)=>{
      return <img src={params.row.img || "https://th.bing.com/th/id/OIP.OBFQJmDpiDrSZ-r_g6uM6wHaDC?rs=1&pid=ImgDetMain"} alt="Avatar" />
    }
  },
  {
    field:'attendances',
    headerName:"Điểm danh",
    width:150,
    renderCell: (params) => {
      const subjectName = params.row.subjectName; // Lấy tên môn học từ params.value
      return (
        <Link to={`/teacher/diem-danh-lop?monhoc=${subjectName}&id=${params.row.id}`}>
          Điểm danh
        </Link>
      );
    },
  }
];

interface Props {
  TeacherId: string;
}

const Attendances = (props: Props) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get(`https://localhost:7034/api/Subject/getByTeacherId/${props.TeacherId}`)
      .then(response => {
        // Set the fetched data as the rows state
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);

      });
  }, [props.TeacherId]);



  return (
    <div className="monhoc">
      <div className="infor">
        <h1>Lớp học</h1>
        <button >Thêm mới môn học</button>
      </div>
      <DataTable colums={columns} rows={rows} slug={"mon-hoc"} />
    </div>
  );
}

export default Attendances;
