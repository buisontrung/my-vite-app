import { useEffect, useState } from 'react';
import './NewsDetail.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    authorId: string;
    user: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
    };
    comments: Comment1[];
    createdAt: string;
  };
  
  type Comment1 = {
    id: number;
    content: string;
    authorId: string;
    postId: number;
    createdAt: string;
    user:{
        fistName:string;
        lastName:string;
        email:string;
    }
  };
const NewsDetail = () => {
    
    const { id } = useParams<{ id: string }>();

    const [post, setPost] = useState<Post | null>(null);
    
    useEffect(() => {
      if (id) {
        axios.get<Post>(`https://localhost:7034/api/Post/id=$${id}`)
          .then(response => {
            setPost(response.data);
            console.log(response.data); // Sửa để in dữ liệu trả về
          })
          .catch(error => {
            console.error('Error fetching post data:', error);
          });
      }
    }, [id]); // Thêm dependency array
  
    if (!post) {
      return <div>Loading...</div>;
    }
  
    

    

    return (
        <div className='container-fluid p-0'>
            <div className="row">
                <div className="news-container col-12 col-md-9">
                    <div className='row'>
                        <div className="col-12 col-md-2">1</div>
                        <div className="col-12 col-md-8">
                            <div className="news-img">
                                <img src={`https://localhost:7034/Images/${post.imageUrl || 'default-image.jpg'}`} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-12 col-md-2">Cột 3</div>
                    </div>
                </div>
                <div className='col-12 col-md-3 information-post'>
                    <div>
                        <div className='row'>
                            <div className='col-12 col-md-9 p-0'>
                                <div className="row p-0 b-0 m-0">
                                    <div className="user col-12 col-md-3">
                                        <img src="https://th.bing.com/th/id/R.c4fa64a0dd72b2cb5788580fb4c73b3f?rik=RFD3kr8vkVSyyw&riu=http%3a%2f%2fimg3.wikia.nocookie.net%2f__cb20131117065341%2fvsbattles%2fimages%2f3%2f35%2fDoraemon.jpg&ehk=751zte20TO3m5bJnCMxHKSBWMyMM%2fYD5XLOHn5rcsNM%3d&risl=&pid=ImgRaw&r=0" alt="User" className="img-fluid" />
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <h5 className='text-nowrap'>{post.user?.firstName +" "+post.user?.lastName}</h5>
                                        <h6 className='text-nowrap'>{post.createdAt}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-3'>
                                ...
                            </div>
                        </div>
                        <div className='title-news'>
                            <div className='container'>
                                <p>
                                {post.title}
                                </p>

                            </div>
                        </div>
                    </div>
                    <Comment postId={post.id} />  {/* Thêm component Comment */}
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;
