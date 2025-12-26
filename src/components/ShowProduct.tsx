import React from 'react';
interface ShowProductProps {
  title?: string;
  viewBecause?: string;
  noButton?: boolean;
  buttonText?: string;
  children?: React.ReactNode;
  noTextAbout?: boolean;
}


function ShowProduct({
  title,
  viewBecause,
  noButton = true,
  buttonText,
  children,
  noTextAbout = true,
}: ShowProductProps) {
  return (
    <div className={`pb-8 w-full `}>
      {noTextAbout && (
        <div className=" ">
          {viewBecause && (
            <p className=" text-red-600 space-x-2 ">
              <span className="  p-2  rounded-sm   bg-red-600 ">|</span>
              <span>{viewBecause}</span>
            </p>
          )}

          <div className=" mt-9 font-extrabold text-xl  space-x-16 mb-6  ">
            <span>{title}</span>
          </div>
        </div>
      )}
      <div className=" relative flex justify-center items-center bg-slate-70 ">
        {children}
      </div>
      {/* <div className="flex justify-center items-center  m-8">
        {noButton || (
          <button className="  bg-red-600 p-2 text-white ">{buttonText}</button>
        )}
      </div> */}
    </div>
  );
}

export default ShowProduct;
