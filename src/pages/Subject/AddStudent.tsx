import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './AddStudent.scss';
import DataTable from '../../components/DataTable/DataTable';
import { GridColDef } from '@mui/x-data-grid';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface StudentInClass {
  id: string;
  studentId: string;
  countAttendance: number;
  subjectId: number;
  status: boolean;
  date: string;
  user: {
    firstName: string;
    lastName: string;
    id: string;
  };
}
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field:'classId',
    headerName:"ID Lớp học",
    width:100,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    renderCell: (params)=>{
      return <p>{params.row.user.firstName} {params.row.user.lastName} </p>
  }
  },

    
];
const AddStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentIdInput, setStudentIdInput] = useState('');
  const [addedStudents, setAddedStudents] = useState<StudentInClass[]>([]); // State to hold added students
  const location = useLocation();
  const subjectId = new URLSearchParams(location.search).get('subjectid');
 
  useEffect(() => {
    // Fetch students with the role 'USER'

    axios.get('https://localhost:7034/api/Auth/users-by-role/USER')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch added students for the current subjectId
    fetchAddedStudents();
  }, []); // Run whenever subjectId changes

  const fetchAddedStudents = () => {
    if (subjectId) {
      axios.get(`https://localhost:7034/api/Attendances/${subjectId}`)
        .then(response => {
          setAddedStudents(response.data);
          console.log(addedStudents);
        })
        .catch(error => {
          console.error('Error fetching added students:', error);
        });
    }
  };

  const handleAddStudent = (studentId: string) => {
    axios.post('https://localhost:7034/api/Attendance', { userId: studentId, subjectId })
      .then(() => {
        // After successfully adding, fetch updated list of students in the class
        fetchAddedStudents();
        alert('Student added successfully!');
      })
      .catch(error => {
        console.error('Error adding student:', error);
        alert('Failed to add student.');
      });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(e.target.value);
  };

  const handleManualAdd = () => {
    if (studentIdInput.trim() === '') {
      alert('Please enter a valid student ID.');
      return;
    }
    handleAddStudent(studentIdInput);
    setStudentIdInput('');

  };

  return (
    <div className='add-student-container'>
      <h1>Add Student to Class</h1>
      <select value={selectedStudent} onChange={handleSelectChange}>
        <option value="">Select a student</option>
        {students.map(student => (
          <option key={student.id} value={student.id}>
            {student.firstName} {student.lastName}
          </option>
        ))}
      </select>
      <button onClick={() => handleAddStudent(selectedStudent)}>Add Selected Student</button>
      
      <h2>Or Add by ID</h2>
      <div>
        <input
          type="text"
          placeholder="Enter student ID"
          value={studentIdInput}
          onChange={(e) => setStudentIdInput(e.target.value)}
        />
        <button onClick={handleManualAdd}>Add by ID</button>
      </div>

      {/* Display added students */}
      <h2 >Students in Class</h2>
      <DataTable rows={addedStudents} colums={columns} slug='Lop 1' />
    </div>
  );
};

export default AddStudent;
