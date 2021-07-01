import React, { useEffect, useRef } from 'react';
import styles from './component_styles/SlideModal.css'

export default function SlideModal({ modalStyle, children, show }){
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
           <div ref={modalRef} className='modal_backdrop'>
            <div className='modal'>
              {children}
            </div>
           </div>
        </React.Fragment>
    );
};