import { useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthProvider/useAuth";
import axios from "axios";
import './Profile.scss'

interface Subject {
    id: number;
    subjectName: string;
    numberSessions: number;
    totalAttendance: number; // Thêm thuộc tính totalAttendance vào Subject
}

const Profile = () => {
    const { user } = useAuth();
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.Id) {
                    // Gọi API lấy danh sách môn học và số buổi đã điểm danh
                    const response = await axios.get<{ id: number, subjectId: number, countAttendance: number }[]>(`https://localhost:7034/api/Attendances/studentid=${user.Id}`);
                    const data = response.data;
                    
                    // Tạo mảng các promises để gọi API lấy thông tin môn học
                    const subjectPromises = data.map(item => 
                        axios.get<Subject>(`https://localhost:7034/api/Subject/${item.subjectId}`)
                        .then(res => ({
                            ...res.data,
                            totalAttendance: item.countAttendance // Gán số buổi đã điểm danh vào môn học
                        }))
                    );

                    // Đợi tất cả các promises hoàn thành
                    const subjectsData = await Promise.all(subjectPromises);
                    setSubjects(subjectsData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user?.Id]);

    return  (
        <div className='profile'>
            <div>Xin chào {user?.FirstName} {user?.LastName} <br /> Mã sinh viên: {user?.Id}</div>
            <div>
                <h2>Các môn học của bạn:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Tên môn học</th>
                            <th>Số buổi học</th>
                            <th>Số buổi đã đi học</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.id}>
                                <td>{subject.subjectName}</td>
                                <td>{subject.numberSessions}</td>
                                <td>{subject.totalAttendance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
