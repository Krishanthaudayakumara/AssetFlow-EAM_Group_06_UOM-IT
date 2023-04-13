import React, { useState, useEffect } from 'react'
import axios from 'axios'
interface IPROPS {
  name: String
  count: Number
}
const CardDashboard: React.FC<IPROPS> = ({ name, count }) => {
  
  return (
    <div className="col-xl-4 col-sm- py-3">
      <div className="card   h-100 " style={{ borderRadius: '10px' }}>
        <div
          className="card-body "
          style={{   backgroundColor: '#482890',borderRadius: '10px' }}
        >
         <h6 className="text-uppercase" style={{color: "white"}}>{name}</h6>
         <h2 className="display-12" style={{color: "white"}}>
         <>{count}</> 
         </h2>
        </div>
      </div>
    </div>
  )
}

export default CardDashboard