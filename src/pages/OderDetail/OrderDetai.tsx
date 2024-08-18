import  { useState, useEffect } from 'react';
import axios from 'axios';
import {  GridColDef } from '@mui/x-data-grid';

import DataTable from '../../components/DataTable/DataTable';
interface rows{
    id:number,
    parentId:string,
    totalPriced:number,
    minusPriced:number,
    studentId:string,
    field:string,
    isPayment: boolean,
    parent:{
        firstName:string,
        lastName:string,
    },
    student:{
        firstName:string,
        lastName:string,
    }
}
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'parentName', headerName: 'Tên phụ huynh', width: 130, renderCell: (params)=>{
    return <p>{params.row.parent.firstName} {params.row.parent.lastName}</p>
}},
{ field: 'studentName', headerName: 'Tên Học sinh', width: 130, renderCell: (params)=>{
    return <p>{params.row.student.firstName} {params.row.student.lastName}</p>
}},
  { field: 'totalPriced', headerName: 'Total Priced', width: 130 },
  { field: 'minusPriced', headerName: 'Minus Priced', width: 130 },
  { field: 'studentId', headerName: 'Student ID', width: 130 },
  { field: 'typePayment', headerName: 'Type Payment', width: 130 },
  { field: 'isPayment', headerName: 'Is Payment', width: 130,renderCell: (params)=>{
    return <p>{params.row.isPayment?"đã thanh toán":"chưa thanh toán"}</p>
} },
  // Add more columns as needed
];

const OrderDetail = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('https://localhost:7034/api/OrderDetails')
      .then(response => {
        // Set the fetched data as the rows state
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
        alert("Error fetching order details. Please try again later.");
      });
  }, []);

  return (
    <div className="order-detail">
      <h1>Order Details</h1>
      <DataTable colums={columns} rows={rows} slug={"order"}/>
    </div>
  );
}

export default OrderDetail;
