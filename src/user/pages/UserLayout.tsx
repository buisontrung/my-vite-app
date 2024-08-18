import { Route, Routes } from "react-router-dom"
import Class from "../components/Class/Class"

import Navbar from "../components/Navbar/Navbar"
import HocBai from "./HocBai/HocBai"
import Footer from "../components/Footer/Footer"
import KhoaHoc from "./HocBai/KhoaHoc"

import PopularCourse from "../components/PopularCourse/PopularCourse"
// Import CSS file
import Service from "../components/Service/Service"
import News from "./News/News"
import DetailCourse from "./HocBai/DetailCourse"

const UserLayout = () => {
  return (
    <div className="main1">
      <Navbar />
      <div className="content ">

      </div>
      


        <Routes>
          <Route path="hoc-bai" element={<HocBai />} />
          <Route path="/" element={<Class />} />
          <Route path="/khoa-hoc/:id" element={<DetailCourse />} />
        </Routes>


      <Routes>
        <Route path="/" element={<PopularCourse />} />
        <Route path="khoa-hoc" element={<KhoaHoc />} />
        <Route path="/tin-tuc" element={<News />} />

      </Routes>


      <Service />
      <Footer />
    </div>
  )
}

export default UserLayout
