import { GridColDef } from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState, useCallback, useMemo } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";

type Attendance = {
  id: number;
  studentId: string;
  countAttendance: number;
  subjectId: number;
  status: boolean;
  date: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

const AttendancesClass = () => {
  const [studentAttendance, setStudentAttendance] = useState<Attendance[]>([]);

  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://localhost:7034/api/Attendances/${id}`);
          setStudentAttendance(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAttendances = useCallback(async (studentId: string, subjectId: number, attendanceId: number) => {
    try {
      await axios.put(`https://localhost:7034/api/Attendances?id=${studentId}&subjectid=${subjectId}`);
      const today = new Date();
      const dayOfWeek = today.getDay(); // Lấy thứ của ngày hôm nay

      const diemdanhData = {
        id: 0,
        isAttendance: true,
        studentAttendanceId: attendanceId,
        attendanceDate: today,
        dayOfWeek: dayOfWeek
      };
      
      await axios.post(`https://localhost:7034/api/Diemdanh`, diemdanhData);
      
      // Cập nhật lại trạng thái studentAttendance
      setStudentAttendance(prevState => 
        prevState.map(attendance => 
          attendance.id === attendanceId 
          ? { ...attendance, countAttendance: attendance.countAttendance + 1, status: true }
          : attendance
        )
      );
      
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Có lỗi xảy ra khi cập nhật điểm danh');
    }
  }, []);

  const columns: GridColDef[] = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'subjectId', headerName: 'ID môn học', width: 150 },
    { field: 'studentId', headerName: 'ID học sinh', width: 100 },
    { field: 'countAttendance', headerName: 'Đã điểm danh', width: 120,
      renderCell: (params) => (
        <p>{params.value}</p>
      )
    },
    { field: 'user', headerName: 'Tên học sinh', width: 150,
      renderCell: (params) => (
        <p>{params.value.firstName} {params.value.lastName}</p>
      )
    },
    { field: 'attendances', headerName: 'Điểm danh', width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleAttendances(params.row.studentId, params.row.subjectId, params.row.id)}>
          Điểm danh
        </Button>
      )
    }
  ], [handleAttendances]);

  return (
    <div>
      {studentAttendance.length > 0 ? (
        <div>
          <h2>Danh sách điểm danh</h2>
          <DataTable colums={columns} rows={studentAttendance} slug="diem-danh"/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default AttendancesClass;
