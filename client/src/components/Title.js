import React from 'react';
import './component_styles/Title.css';

export default function Title({ title, icon }){
  return (
    <div className='heading'>{icon}<span className='dashboard-title'>{title}</span></div>
  )
}