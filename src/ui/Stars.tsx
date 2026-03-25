import Image from '@/assets/Vector.png';
import Image2 from '@/assets/Vector (1).png';


function Stars({ numStare = 5 }) {
  const starsArray = Array.from({ length: 5 }, (e, i) => (
    <img key={i} className="w-5 h-5" src={`${i < numStare ? Image : Image2}`} />
  ));

  return <div className=" flex  gap-1 ">{starsArray}</div>;
}

export default Stars;
