import "./TopBox.scss"
import { topDealUsers } from '../../data'
const Topbox = () => {
  return (
    <div className='topBox'>
        <h1>Top student</h1>
        <div className='listStudent'>
            {topDealUsers.map((student)=>(
                <div className="listItem" key={student.id}>
                    <div className="student">
                        <img src={student.img} alt={student.username} />
                        <div className="userTexts">
                            <span className="userName">{student.username}</span>
                            <span className="email">{student.email}</span>
                        </div>
                        
                    </div>
                    <span className="amount">{student.amount}</span>
                </div>
            
            ))}
        </div>
    </div>
     
  );
}

export default Topbox
