import React from "react";


const Card: React.FC = () => {
  return (
    <>
    <div className="row mb-3">
    <div className="col-xl-3 col-sm-6 py-2">
        <div className="card  text-white h-100">
            <div className="card-body " style={{backgroundColor:"#482890"}}>
                
                <h6 className="text-uppercase">Available Users</h6>
                <h1 className="display-4">134</h1>
            </div>
        </div>
    </div>
    <div className="col-xl-3 col-sm-6 py-2">
        <div className="card text-white  h-100">
            <div className="card-body " style={{backgroundColor:"#482890"}}>
                
                <h6 className="text-uppercase">Total Inventory</h6>
                <h1 className="display-4">87</h1>
            </div>
        </div>
    </div>
    <div className="col-xl-3 col-sm-6 py-2">
        <div className="card text-white  h-100">
            <div className="card-body "style={{backgroundColor:"#482890"}}>
                
                <h6 className="text-uppercase">Assigned Assets</h6>
                <h1 className="display-4">125</h1>
            </div>
        </div>
    </div>
    <div className="col-xl-3 col-sm-6 py-2">
        <div className="card text-white  h-100">
            <div className="card-body"style={{backgroundColor:"#482890"}}>
                
                <h6 className="text-uppercase">Support Tickets</h6>
                <h1 className="display-4">36</h1>
            </div>
        </div>
    </div>
</div>

</>
  );
};

export default Card;