
import { useEffect, useState } from 'react';
import './PopularCourse.scss';
import axios from 'axios';
interface subject {
    id: 0,
    classId: 0,
    numberSessions: 0,
    teacherId: "string",
    subjectName: "string",
    description: "string",
    imageUrl: "string",
    price: 0
}
const PopularCourse = () => {
    const [rows, setRows] = useState<subject[]>([]);
    useEffect(() => {
        axios.get('https://localhost:7034/api/Subject/getClassId/1')
            .then(response => {
                // Set the fetched data as the rows state
                setRows(response.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[])
    return (
        <div className="popular page_section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section_title text-center">
                            <h1>Popular Courses</h1>
                        </div>
                    </div>
                </div>

                <div className="row course_boxes">

                    {rows.map((row, index) => (
                        <div className="col-lg-4 course_box" key={index}>
                            <div className="card">
                                <img className="card-img-top" src="../../../class.png" alt="https://unsplash.com/@kellybrito" />
                                <div className="card-body text-center">
                                    <div className="card-title"><a href="courses.html">{row.subjectName}</a></div>
                                    <div className="card-text">{row.description}</div>
                                </div>
                                <div className="price_box d-flex flex-row align-items-center">
                                    <div className="course_author_image">
                                        <img src="images/author.jpg" alt="" />
                                    </div>
                                    <div className="course_author_name">Michael Smith, <span>Author</span></div>
                                    <div className="course_price d-flex flex-column align-items-center justify-content-center"><span>${row.price}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}





                </div>
            </div>
        </div>
    )
}

export default PopularCourse
