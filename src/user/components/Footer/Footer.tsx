
import './Footer.scss';

const Footer = () => {
  
  return (
    <footer className="footer footer_user">
      <iframe className='message'
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/6a29b496-002c-464c-a81e-80eec5cdc825">
      </iframe>
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>Chúng tôi đề xuất</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className=" p-0 text-body-secondary">Về TA EDU</a></li>
              <li className="nav-item mb-2"><a href="#" className=" p-0 text-body-secondary">Dành cho HS & PHHS</a></li>
              <li className="nav-item mb-2"><a href="#" className=" p-0 text-body-secondary">Dành cho GV và Nhà trường</a></li>
              <li className="nav-item mb-2"><a href="#" className=" p-0 text-body-secondary">APP Phụ huynh</a></li>
              <li className="nav-item mb-2"><a href="#" className=" p-0 text-body-secondary">About</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Tài nguyên</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Trung tâm trợ giúp</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Hướng dẫn sử dụng</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Phản hồi với OLM</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">KH nói về OLM</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Liên hệ</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="p-0 text-body-secondary">About</a></li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© 2024 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
            <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
            <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
          </ul>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
