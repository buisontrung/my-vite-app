import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Subject from '../../../pages/Subject/Subject';
import './DetailCourse.scss'
interface Subject {
    subjectName: string,
    description: string,
    numberSessions: string,
    classId: number,
}

const DetailCourse = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [subject, setSubject] = useState<Subject>();
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        axios.get(`https://localhost:7034/api/Subject/${id}`)
            .then(response => {
                // Xử lý dữ liệu trả về từ API
                setSubject(response.data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Error fetching data:', error);
            });
    }, [id]);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Sử dụng `id` ở đây


    return (
        <>
            <div className="home-container">
                <div className="container">
                    <div className="row">
                        <div className='d-flex text-light flex-column justify-content-start'>
                            <h1 className="fw-bolder">{subject?.subjectName}</h1>
                            <div className='mb-4 text-capitalize fw-bold'>{subject?.description}</div>
                            <div className='d-flex align-items-center mb-2'>
                                <span style={{ color: "#ffc107", fontSize: "16px", marginRight: "0.15rem" }} className='mr-1 '>5</span>
                                <img src="/star.png" alt="" className='' style={{ width: "13px", height: "13px", marginRight: "0.15rem" }} />
                                <img src="/star.png" alt="" className='ml-1' style={{ width: "13px", height: "13px", marginRight: "0.15rem" }} />
                                <img src="/star.png" alt="" className='ml-1' style={{ width: "13px", height: "13px", marginRight: "0.15rem" }} />
                                <img src="/star.png" alt="" className='ml-1' style={{ width: "13px", height: "13px", marginRight: "0.15rem" }} />
                                <img src="/star.png" alt="" className='ml-1' style={{ width: "13px", height: "13px", marginRight: "0.15rem" }} />
                                <a href="" className='m-1 '><u>(40 xếp hạng)</u></a>
                                <span className='m-1'>355 học viên</span>
                            </div>
                            <div className='d-flex align-items-center'>
                                <span>Được tạo bởi </span>
                                <a href="" className='m-1 '><u>Trung</u></a>
                            </div>
                            <div>Lần cập nhật gần đây nhất 8/2024 | Vietnamese</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`sidebar-container--content--V-bFw ${scrollPosition > 100 ? "sidebar-container--fixed--1Gxn0" : ""}`}>
                <div className='sidebar-container--content-group---4Fh5'>
                    <div className='sidebar-container--introduction-asset--CD5Yt'>
                        <div className="intro-asset--wrapper">
                            <div className="intro-asset--asset--uXC50">
                                <button>
                                    <span>
                                        <img src="https://img-c.udemycdn.com/course/240x135/5246952_37c4.jpg" srcSet="https://img-c.udemycdn.com/course/240x135/5246952_37c4.jpg 240w, https://img-c.udemycdn.com/course/480x270/5246952_37c4.jpg 480w, https://img-c.udemycdn.com/course/750x422/5246952_37c4.jpg 750w" alt=""
                                            loading="eager" style={{}} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`sidebar-container--purchase-section--XWCM- container `}>
                        <div className="row">
                            <div>
                                <div className='d-flex price-45'>
                                    <div className='talented-price'>
                                        <span>₫ 299.000</span>
                                    </div>
                                    <div>
                                        <span>₫ 1.699.000</span>
                                    </div>
                                </div>
                                <div><span>Giảm 80%</span></div>
                                <div className='buy-box--buy-box-item--wT5bJ buy-box--add-to-cart-button-wrapper--focmP'>

                                    <button className='ud-btn-large'>
                                        Thêm vào giỏ hàng
                                    </button>

                                </div>
                                <div className='buy-button buy-box--buy-box-item--wT5bJ buy-box--buy-button--m373K'>
                                    <button className='ud-btn-large'>
                                        Mua ngay
                                    </button>
                                </div>

                            </div>
                            <div className='dark-bg-text money-back-guarantee--money-back-guarantee--cDdpL'><span className='money-back'>Đảm bảo hoàn tiền trong 30 ngày</span></div>
                            <div className='generic-purchase-section--local-incentive--4i-xF'>
                                <h2 className='ud-heading-md incentives--header--yVAQy'>
                                    Khóa học này bao gồm:
                                </h2>
                                <ul className="ud-unstyled-list ud-block-list incentive-list">
                                    <li>
                                        <div className='d-flex ud-block-list-item'>

                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/iconvideo.png" alt="" style={{ width: "14px", }} />
                                            </div>

                                            <div>
                                                <span>8,5 giờ video theo yêu cầu</span>
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                <span>1 bài tập coding</span>
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                <span>Bài tập</span>
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                35 bài viết
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                7 tài nguyên có thể tải xuống
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                Truy cập trên thiết bị di động và TV
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                Quyền truy cập đầy đủ suốt đời
                                            </div>
                                        </div>

                                    </li>
                                    <li>
                                        <div className='d-flex ud-block-list-item'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img src="/codeicon.png" alt="" style={{ width: "14px", }} />
                                            </div>
                                            <div>
                                                Giấy chứng nhận hoàn thành
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' style={{ marginTop: "50px" }}>
                <div className="row">
                    <div className=''>
                        <h2 style={{ color: "#1A1A1A" }}>Khám phá các chủ đề liên quan</h2>
                        <div className='d-flex topics'>
                            <div className="topic m-2 p-2">Lớp 1</div>
                            <div className="topic m-2 p-2">Tiếng Anh</div>
                        </div>
                        <div className='detailcourse'>

                            <div className='course-content'>
                                <h2 style={{ color: "#1A1A1A" }}>Nội dung bài học</h2>
                                <ul className='d-flex what-you-will-learn--objectives-list-two-column-layout--ED4as'>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item'><img src="/check.png" alt="" /><span>Tìm hiểu về Tiếng Anh lớp 1</span></div>
                                    </li>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item'><img src="/check.png" alt="" /><span>Nắm rõ thì hiện tại đơn</span></div>
                                    </li>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item'><img src="/check.png" alt="" /><span>Nắm rõ thì hiện tại hoàn thành</span></div>
                                    </li>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item'><img src="/check.png" alt="" /><span>Nắm rõ từ vựng lớp 1</span></div>
                                    </li>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item'><img src="/check.png" alt="" /><span>Nắm rõ thì tương lai đơn</span></div>
                                    </li>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item'><img src="/check.png" alt="" /><span>Tìm hiểu về Tiếng Anh lớp 1</span></div>
                                    </li>
                                    <li>
                                        <div className='ud-block-list ud-block-list-item d-flex'><img src="/check.png" alt="" /><span>Tìm hiểu về Tiếng Anh lớp 1</span></div>
                                    </li>
                                </ul>
                                <button className='d-flex ud-btn-ghost'>
                                    <span>Hiện thêm</span>
                                    <div>
                                        <img src="/down.png" alt="" />
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div className='detailcourse' >
                            <div className="curriculum--curriculum-sub-header--QqY6d"><div className="" data-purpose="curriculum-stats"><span className="curriculum--content-length--V3vIz">19 phần • 121 bài giảng • <span><span>8&nbsp;giờ&nbsp;42&nbsp;phút</span> tổng thời lượng</span></span></div><button type="button" data-purpose="expand-toggle" aria-expanded="false" className="ud-btn ud-btn-medium ud-btn-ghost ud-heading-sm"><span className="ud-btn-label">Mở rộng tất cả các phần</span></button></div>
                            <h2 style={{ color: "#1A1A1A" }}>Nội dung khóa học</h2>
                            <div className='' style={{ borderBottom: "1px solid #d1cece" }}>
                                <div className='section--panel--qYPjj ud-accordion-panel-toggler'>
                                    <button className='d-flex'>
                                        <img src="/down.png" alt="" />
                                        <span className='ud-accordion-panel-title'>
                                            <span className='section--section-title--svpHP'> Tìm hiểu về tiếng anh lớp 1</span>
                                            <span className="ud-text-sm section--hidden-on-mobile---ITMr section--section-content--2mUJ7" data-purpose="section-content">5 bài giảng • <span>10 phút</span></span>
                                        </span>
                                    </button>
                                </div>
                                <div className='section--panel--qYPjj ud-accordion-panel-toggler'>
                                    <button className='d-flex'>
                                        <img src="/down.png" alt="" />
                                        <span className='ud-accordion-panel-title'>
                                            <span className='section--section-title--svpHP'> Nắm rõ thì hiện tại hoàn thành</span>
                                            <span className="ud-text-sm section--hidden-on-mobile---ITMr section--section-content--2mUJ7" data-purpose="section-content">15 bài giảng • <span>29 phút</span></span>
                                        </span>
                                    </button>
                                </div>
                                <div className='section--panel--qYPjj ud-accordion-panel-toggler'>
                                    <button className='d-flex'>
                                        <img src="/down.png" alt="" />
                                        <span className='ud-accordion-panel-title'>
                                            <span className='section--section-title--svpHP'> Nắm rõ thì hiện tại đơn</span>
                                            <span className="ud-text-sm section--hidden-on-mobile---ITMr section--section-content--2mUJ7" data-purpose="section-content">5 bài giảng • <span>119 phút</span></span>
                                        </span>
                                    </button>
                                </div>
                                <div className='section--panel--qYPjj ud-accordion-panel-toggler'>
                                    <button className='d-flex'>
                                        <img src="/down.png" alt="" />
                                        <span className='ud-accordion-panel-title'>
                                            <span className='section--section-title--svpHP'> Tìm hiểu về tiếng anh lớp 1</span>
                                            <span className="ud-text-sm section--hidden-on-mobile---ITMr section--section-content--2mUJ7" data-purpose="section-content">5 bài giảng • <span>10 phút</span></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <button className='ud-btn-medium ud-btn-secondary ud-heading-sm curriculum--curriculum-show-more--hf'> 9 phần nữa</button>
                        </div>
                        <div className='detailcourse'>
                            <h2 style={{ color: "#1A1A1A" }}>Yêu cầu</h2>
                            <ul className="ud-unstyled-list ud-block-list">
                                <li>
                                    <div className=" ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ">
                                        <div className="ud-block-list-item-content d-flex">
                                            <div>
                                            <img src="/black-circle.png" style={{width:"6px", margin:"5px", border:"none",padding:"none"}} alt="" /></div>
                                            Biết 1 số từ vựng cơ bản
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ">

                                        <div className="ud-block-list-item-content d-flex">
                                            <div><img src="/black-circle.png" style={{width:"6px",  margin:"5px", border:"none",padding:"none"}} alt="" /></div>Có máy tính nối mạng Internet để thực hành các bài tập</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
export default DetailCourse