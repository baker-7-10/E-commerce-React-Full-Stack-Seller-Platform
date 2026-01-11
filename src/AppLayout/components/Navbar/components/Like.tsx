import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UseRedux, UseUser } from '@/hooks';
import usefetchFavorites from '@/hooks/usefetchFavorites';

function Like() {
  const { user } = UseUser();
 const {data} =  usefetchFavorites(user?.id);
  

  return (
    <div  data-testid="like-container">
      <Link to="/LikePage" className=" relative ">
        {data?.length > 0 && (
          <motion.p
            animate={{ y: [0, -10, 0] }}
            transition={{ delay: 0, type: 'tween', duration: 0.2 }}
            className="  w-2 h-2  p-2   top-[0px]  right-1  flex justify-center items-center text-xs  rounded-full  absolute  text-white"
          >
         {data?.length}
          </motion.p>
        )}
        <FontAwesomeIcon icon={faHeart} className=" w-6 h-6 cursor-pointer" />
      </Link>
    </div>
  );
}

export default Like;
