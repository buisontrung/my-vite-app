import { useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthProvider/useAuth";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/DataTable/DataTable";


interface User {
  id:number,
  subjectId:number,
  countAttendance:number,
  studentId: string,
  user:{
    firstName: string,
    lastName: string,
  }
  subjects:{
    id:number,
    subjectName:string,
    numberSessions:string,
  },
  diemDanh:{
    id:number,
    isAttendance:boolean,
    attendanceDate:string,
    dayOfWeek:number,
    studentAttendanceId: number;
  }
}
interface DiemDanhDTO {
  id: number;
  isAttendance: boolean;
  studentAttendanceId: number;
  attendanceDate: Date;
  dayOfWeek: string;
}
const columns: GridColDef[] = [
    
    {
      field: 'ten',
      headerName: 'Ten con',
      width:100,
        renderCell: (params)=>{
              return <p>{params.row.user.firstName} {params.row.user.lastName}</p>
          }
    },

    {
        field:'subjectName',
        headerName:"Môn học",
        width:100,
        renderCell: (params)=>{
              return <p>{params.row.subjects.subjectName}</p>
          }
      },
      {
        field:'sessions',
        headerName:"Số buổi học",
        width:100,
        renderCell: (params)=>{
              return <p>{params.row.subjects.numberSessions}</p>
          }
      },
      
      {
        field:'sobuoi da di hoc',
        headerName:"Số buổi đã đi",
        width:100,
        renderCell: (params)=>{
          const attendedCount = params.row.diemDanh.filter((a:DiemDanhDTO) => a.isAttendance).length;
          return <p>{attendedCount}</p>;
          }
      },
      {
        field:'vanghoc',
        headerName:"Số buổi vắng học",
        width:100,
        renderCell: (params)=>{
          const attendedCount = params.row.diemDanh.filter((a:DiemDanhDTO) => a.isAttendance ===false).length;
          return <p>{attendedCount}</p>;
          }
      },
    
  ];
const Student = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch StudentParent data
        const studentParentResponse = await axios.get(`https://localhost:7034/api/StudentParent/${user?.Id}`);
        const studentIds = studentParentResponse.data.map((sp: { studentId: string }) => sp.studentId);
        const attendanceRequests = studentIds.map((id: string) => axios.get(`https://localhost:7034/api/Attendances/studentid=${id}`));
        const responses = await Promise.all(attendanceRequests);

        // Combine all responses into one array
        const allStudentData = responses.flatMap(response => response.data);

        // Update state with student data
        setRows(allStudentData);
        console.log(allStudentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.Id]);

  return (  
    <div>
      
          <DataTable rows={rows} colums={columns} slug="các con" />
        
    </div>
  );
};

export default Student;
