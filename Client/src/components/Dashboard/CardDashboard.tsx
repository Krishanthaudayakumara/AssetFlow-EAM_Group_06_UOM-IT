import React from "react";
import { Row, Col } from "react-bootstrap";

interface CardProps{

  title1:String;
  name1 :String;
  quantity1:Number;
  name2:String;
  quantity2: Number;
  
}
const CardDashboard: React.FC <CardProps>= ({title1,name1,quantity1,name2,quantity2}) => {
  return (
    
      <div className="col-xl-6 col-sm- py-3">
        <div className=" text-white ">
        <div className="card-body " style={{backgroundColor:"#482890",borderRadius:"10px",width:"300px",height: "100px",marginLeft:"65px",padding:"0 0 0 10px"}}>
        <Row> 
        <h6 className="text-center">{title1}</h6>
         <Col md={6}>
              <h6 className="text-center" >{name1}</h6>
              <h6 className="text-center"><>{quantity1}</></h6>
        <div className="inCard"  style={{height:"50px",borderWidth:" 0px 2px opx 0px",borderColor:"black"}}></div>
        </Col>
        <Col md={6}>
      
             <h6 className="text-center">{name2}</h6>
            <h6 className="text-center"><>{quantity2}</></h6>
        </Col>  
        </Row>
        </div>
        </div> 


     
    </div>
    
  );
};

export default CardDashboard;