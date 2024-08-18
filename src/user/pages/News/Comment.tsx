import { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.scss';
import { useAuth } from '../../../components/AuthProvider/useAuth';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Comment {
  id: number;
  content: string;
  userId: string;
  postId: number;
  createdAt: string;
  user?: User;
  parentId: number | null;
}

type CommentProps = {
  postId: number;
};

const Comment = ({ postId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<{ [key: number]: Comment[] }>({});
  const [newComment, setNewComment] = useState<string>('');
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const { user } = useAuth();


  // Token truy cập và ID người dùng cần chặn
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(`https://localhost:7034/api/Comment/post/${postId}`);
        setComments(response.data.filter(comment => comment.parentId === null));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() && user?.Id) {
      try {
  
        const response = await axios.post<Comment>('https://localhost:7034/api/Comment/abc', {
          content: newComment,
          postId: postId,
          userId: user.Id,
          parentId: null,
        });
        console.log(response.data.id)
        setComments([...comments, response.data]);
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  const handleReplyChange = (commentId: number, e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewReply({ ...newReply, [commentId]: e.target.value });
  };

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>, commentId: number) => {
    e.preventDefault();
    const replyContent = newReply[commentId];
    if (replyContent.trim() && user?.Id) {
      try {
        const response = await axios.post<Comment>('https://localhost:7034/api/Comment/abc', {
          content: replyContent,
          postId: postId,
          userId: user.Id,
          parentId: commentId,
        });

        setReplies({
          ...replies,
          [commentId]: [...(replies[commentId] || []), response.data],
        });
        setNewReply({ ...newReply, [commentId]: '' });
      } catch (error) {
        console.error('Error posting reply:', error);
      }
    }
  };

  const handleShowReply = async (commentId: number) => {
    if (!showReplies[commentId]) {
      try {
        const response = await axios.get<Comment[]>(`https://localhost:7034/api/Comment/parent/${commentId}`);
        setReplies({ ...replies, [commentId]: response.data });
        setShowReplies({ ...showReplies, [commentId]: true });
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    } else {
      setShowReplies({ ...showReplies, [commentId]: false });
    }
  };

  return (
    <div className="container bootdey">
      <div className="col-md-12 bootstrap snippets">
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="form-control"
                rows={2}
                placeholder="What are you thinking?"
                value={newComment}
                onChange={handleCommentChange}
              ></textarea>
              <div className="mar-top clearfix">
                <button className="btn btn-sm btn-primary pull-right" type="submit">
                  <i className="fa fa-pencil fa-fw"></i> Share
                </button>
                <a className="btn btn-trans btn-icon fa fa-video-camera add-tooltip" href="#"></a>
                <a className="btn btn-trans btn-icon fa fa-camera add-tooltip" href="#"></a>
                <a className="btn btn-trans btn-icon fa fa-file add-tooltip" href="#"></a>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            {comments.map((comment) => (
              <div className="media-block" key={comment.id}>
                <a className="media-left" href="#">
                  <img
                    className="img-circle img-sm"
                    alt="Profile Picture"
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  />
                </a>
                <div className="media-body">
                  <div className="mar-btm">
                    <a href="#" className="btn-link text-semibold media-heading box-inline">
                      {comment.user?.firstName} {comment.user?.lastName}
                    </a>
                    <p className="text-muted text-sm">
                      <i className="fa fa-mobile fa-lg"></i> - From Mobile - {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p>{comment.content}</p>
                  <div className="pad-ver">
                    <div className="btn-group">
                      <a className="btn btn-sm btn-default btn-hover-success" href="#">
                        <i className="fa fa-thumbs-up"></i>
                      </a>
                      <a className="btn btn-sm btn-default btn-hover-danger" href="#">
                        <i className="fa fa-thumbs-down"></i>
                      </a>
                    </div>
                    <a
                      className="btn btn-sm btn-default btn-hover-primary"
                      href="#"
                      onClick={() => handleShowReply(comment.id)}
                    >
                      Reply
                    </a>
                  </div>
                  {showReplies[comment.id] && (
                    <>
                      <div className="replies">
                        {replies[comment.id]?.map((reply) => (
                          <div className="media-block" key={reply.id}>
                            <a className="media-left" href="#">
                              <img
                                className="img-circle img-sm"
                                alt="Profile Picture"
                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                              />
                            </a>
                            <div className="media-body">
                              <div className="mar-btm">
                                <a href="#" className="btn-link text-semibold media-heading box-inline">
                                  {reply.user?.firstName} {reply.user?.lastName}
                                </a>
                                <p className="text-muted text-sm">
                                  <i className="fa fa-mobile fa-lg"></i> - From Mobile - {new Date(reply.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <p>{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="reply-form">
                        <textarea
                          className="form-control"
                          rows={2}
                          placeholder="Write a reply..."
                          value={newReply[comment.id] || ''}
                          onChange={(e) => handleReplyChange(comment.id, e)}
                        ></textarea>
                        <button className="btn btn-sm btn-primary" type="submit">
                          <i className="fa fa-pencil fa-fw"></i> Reply
                        </button>
                      </form>
                    </>
                  )}
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
