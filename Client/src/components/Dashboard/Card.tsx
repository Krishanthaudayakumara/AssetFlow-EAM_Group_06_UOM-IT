import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
interface IPROPS {
  name: String
  quantity: Number
  icon: any
}
const Card: React.FC<IPROPS> = ({ name, quantity, icon }) => {
  return (
    <div className="col-xl-3 col-sm- py-2">
      <div className="card  text-white h-100 " style={{ borderRadius: '10px' }}>
        <div
          className="card-body "
          style={{ backgroundColor: '#482890', borderRadius: '10px' }}
        >
          <div className="rotate">
            <FontAwesomeIcon icon={icon} />
          </div>

          <h6 className="text-uppercase">{name}</h6>
          <h1 className="display-4">
            <>{quantity}</>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Card
