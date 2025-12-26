import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Container from '@/components/Container';
import OnlineUser from '@/page/cahtUser/components/OnlineUser';
import { useOnlineUser } from '@/hooks';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const {onlineUsers} = useOnlineUser()

  return (
    <div>
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className=" z-50  text-[20px] absolute top-[73px]  left-2   cursor-pointer  "
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </button>
        <OnlineUser userNum={onlineUsers.length}/>
    
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default AppLayout;
