import React from 'react';
import { Button} from 'react-bootstrap';


const Facbutton: React.FC = () => {
    return(
        <div>
     
            <Button variant="outline-primary">Import Facilities</Button>
            <Button variant="outline-primary">export to excel</Button>
            <Button variant="primary">+ New Building</Button>
            <Button variant="danger">+new Floor</Button>
        </div>
    )
}
export default Facbutton;