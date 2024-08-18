import { useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthProvider/useAuth";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/DataTable/DataTable";
import { Button } from "@mui/material";

interface User {
  id: number;
  subjectId: number;
  countAttendance: number;
  studentId: string;
  totalPriced?: number;
  minusPriced?: number;
  user: {
    firstName: string;
    lastName: string;
  };
  subjects: {
    id: number;
    subjectName: string;
    numberSessions: string;
    price: number;
  };
  diemDanh: {
    id: number;
    isAttendance: boolean;
    attendanceDate: string;
    dayOfWeek: number;
    studentAttendanceId: number;
  };
}

const columns: GridColDef[] = [
  {
    field: 'ten',
    headerName: 'Tên con',
    width: 100,
    renderCell: (params) => {
      return <p>{params.row.user.firstName} {params.row.user.lastName}</p>;
    }
  },
  {
    field: 'subjectName',
    headerName: 'Môn học',
    width: 150,
    renderCell: (params) => {
      return <p>{params.row.subjects.subjectName}</p>;
    }
  },
  {
    field: 'sessions',
    headerName: 'Số buổi học',
    width: 100,
    renderCell: (params) => {
      return <p>{params.row.subjects.numberSessions}</p>;
    }
  },
  {
    field: 'tienhoc',
    headerName: 'Số Tiền học',
    width: 150,
    renderCell: (params) => {
      return <p>{params.row.subjects.price} VNĐ</p>;
    }
  }
];

const TienHoc = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch StudentParent data
        const studentParentResponse = await axios.get(`https://localhost:7034/api/StudentParent/${user?.Id}`);
        const studentIds = studentParentResponse.data.map((sp: { studentId: string }) => sp.studentId);

        // Fetch attendance data
        const attendanceRequests = studentIds.map((id: string) => axios.get(`https://localhost:7034/api/Attendances/studentid=${id}`));
        const attendanceResponses = await Promise.all(attendanceRequests);
        const allStudentData = attendanceResponses.flatMap(response => response.data);

        // Update state with combined data
        setRows(allStudentData);
        console.log(allStudentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.Id) {
      fetchData();
    }
  }, [user?.Id]);

  const handlePayment = async () => {
    try {
      // Fetch total price data using parentId
      const response = await axios.post(`https://localhost:7034/api/Payment/create-payment?id=2`);
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div>
      <Button onClick={handlePayment} variant="contained" color="primary">Đóng tổng tiền học</Button>
      <DataTable rows={rows} colums={columns} slug="các con" />
      
    </div>
  );
};

export default TienHoc;
