import { useEffect, useState } from 'react';
import './News.scss';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  authorId:string;
  user:{
    id:string,
    email:string,
    firstName:string,
    lastName:string,
  };
  comments:[];
    
  
  createdAt:string;// Thêm trường imageUrl nếu có
};

const News = () => {
  const [rows, setRows] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>('https://localhost:7034/api/post')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="news">
      <div className="container">
        <div className="row">

          <div className="col-lg-8">
            <div className="news_posts">
              {rows.map(post => (
                <div className="news_post" key={post.id}>
                  <div className="news_post_image">
                    <img src={"https://localhost:7034/Images/"+post.imageUrl || 'default-image.jpg'} alt={post.title} />
                  </div>
                  <div className="news_post_top d-flex flex-column flex-sm-row">
                    <div className="news_post_date_container">
                      {/* Thay đổi cách hiển thị ngày nếu có dữ liệu ngày */}
                      <div className="news_post_date d-flex flex-column align-items-center justify-content-center">
							<div>{new Date(post.createdAt).getDate()}</div>
							<div>{new Date(post.createdAt).toLocaleString('default', { month: 'short' })}</div>
                      </div>
                    </div>
                    <div className="news_post_title_container">
                      <div className="news_post_title">
                        <a href={`tin-tuc/${post.id}`}>{post.title}</a>
                      </div>
                      <div className="news_post_meta">
                        <span className="news_post_author"><a href="#">{post.user !=null?post.user.firstName+" "+post.user.lastName: "1"}</a></span>
                        <span>|</span>
                        <span className="news_post_comments"><a href="#">{post.comments !=null?post.comments.length+" Comments": "0 Comments"}</a></span>
                      </div>
                    </div>
                  </div>
                  <div className="news_post_text">
                    <p>{post.content}</p>
                  </div>
                  <div className="news_post_button text-center trans_200">
                    <a href={`news_post.html?id=${post.id}`}>Read More</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="news_page_nav">
              <ul>
                <li className="active text-center trans_200"><a href="#">01</a></li>
                <li className="text-center trans_200"><a href="#">02</a></li>
                <li className="text-center trans_200"><a href="#">03</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar">

              <div className="sidebar_section">
                <div className="sidebar_section_title">
                  <h3>Archives</h3>
                </div>
                <ul className="sidebar_list">
                  <li className="sidebar_list_item"><a href="#">Design Courses</a></li>
                  <li className="sidebar_list_item"><a href="#">All you need to know</a></li>
                  <li className="sidebar_list_item"><a href="#">Uncategorized</a></li>
                  <li className="sidebar_list_item"><a href="#">About Our Departments</a></li>
                  <li className="sidebar_list_item"><a href="#">Choose the right course</a></li>
                </ul>
              </div>

              <div className="sidebar_section">
                <div className="sidebar_section_title">
                  <h3>Latest posts</h3>
                </div>
                <div className="latest_posts">
                  {rows.slice(0, 3).map(post => (
                    <div className="latest_post" key={post.id}>
                      <div className="latest_post_image">
                        <img src={"https://localhost:7034/Images/"+post.imageUrl || 'default-image.jpg'} alt={post.title} />
                      </div>
                      <div className="latest_post_title"><a href={`news_post.html?id=${post.id}`}>{post.title}</a></div>
                      <div className="latest_post_meta">
                        <span className="latest_post_author"><a href="#">By Author</a></span>
                        <span>|</span>
                        <span className="latest_post_comments"><a href="#">3 Comments</a></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar_section">
                <div className="sidebar_section_title">
                  <h3>Tags</h3>
                </div>
                <div className="tags d-flex flex-row flex-wrap">
                  <div className="tag"><a href="#">Course</a></div>
                  <div className="tag"><a href="#">Design</a></div>
                  <div className="tag"><a href="#">FAQ</a></div>
                  <div className="tag"><a href="#">Teachers</a></div>
                  <div className="tag"><a href="#">School</a></div>
                  <div className="tag"><a href="#">Graduate</a></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
