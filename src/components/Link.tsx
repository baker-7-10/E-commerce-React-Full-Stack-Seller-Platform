import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import './Link.css';
import { useNavigate } from 'react-router-dom';
export default function Link() {
const [isHovered, setIsHovered] = useState(false);
const [ripples, setRipples] = useState([]);
const navigate = useNavigate();


const handleClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  
  const newRipple = { x, y, id: Date.now() };
  setRipples([...ripples, newRipple ]);
  setTimeout(() => {
    setRipples(prev => prev.filter(r => r.id !== newRipple.id));
  }, 600);

  navigate('/AddNewProduct');

};


  return (

<button
  onClick={handleClick}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  className="fixed bottom-8 right-8 group cursor-pointer z-[10000000]"
>
  {/* Pulsing background glow */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 blur-xl opacity-60 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
  
  {/* Rotating gradient ring */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-pink-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{ animationDuration: '3s' }} />
  
  {/* Main button */}
  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-500/50 group-active:scale-95 overflow-hidden">
    {/* Ripple effects */}
    {ripples.map(ripple => (
      <span
        key={ripple.id}
        className="absolute rounded-full bg-white"
        style={{
          left: ripple.x,
          top: ripple.y,
          width: '4px',
          height: '4px',
          animation: 'ripple 0.6s ease-out'
        }}
      />
    ))}
    
    {/* Sparkle effect on hover */}
    {isHovered && (
      <IoSparkles 
        className="absolute text-yellow-300 animate-ping" 
        size={12}
        style={{ 
          top: '8px', 
          right: '8px',
          animationDuration: '1s'
        }}
      />
    )}
    
    {/* Icon with rotation animation */}
    <FaPlus 
      className="text-white transition-transform duration-300 group-hover:rotate-90" 
      size={32}
      strokeWidth={2.5}
    />
    
    {/* Shine effect */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </div>

  {/* Label that appears on hover */}
  <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
    <div className="bg-white text-red-600 px-4 py-2 rounded-lg shadow-xl font-semibold whitespace-nowrap">
      Add Product
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-white" />
    </div>
  </div>
</button>  )
}


