import React, { useEffect, useRef } from 'react';
import './component_styles/SlideModal.css'

export default function SlideModal({ modalStyle = 'modal', modalBackdrop = 'modal_backdrop', children, show }){
  const modalRef = useRef(null);

  useEffect(() => {
    if(show){
      modalRef.current.classList.add('visible');
      console.log(modalRef.current.classList)
    }else{
      modalRef.current.classList.remove('visible');
    }
  }, [show]);

   return (
        <React.Fragment>
           <div ref={modalRef} className={modalBackdrop}>
            <div className={modalStyle}>
              {children}
            </div>
           </div>
        </React.Fragment>
    );
};