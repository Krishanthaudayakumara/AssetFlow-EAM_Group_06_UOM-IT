
import React from "react";

interface IPROPS{
    
    name :String;
    quantity:Number;
 
    
}

const CardDashboard: React.FC <IPROPS>= ({name,quantity,}) => {
  return (
    
    
    <div className="col-xl-4 col-sm- py-2">
        <div className="card  text-white h-100 "style={{borderRadius:"10px"}}>
        <div className="card-body " style={{backgroundColor:"#482890",borderRadius:"10px"}}>
                <h6 className="text-uppercase">{name}</h6>
                <h1 className="display-4"><>{quantity}</></h1>
            </div>
            
        </div>
    </div>);
};

export default CardDashboard;