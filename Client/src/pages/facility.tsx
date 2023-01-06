import React from 'react';
import { Button} from 'react-bootstrap';


const Facility: React.FC = () => {
    return(
        <div>
     
            <Button variant="outlined">Import Facilities</Button>
            <Button variant="outlined">export to excel</Button>
            <Button variant="contained">+ New Building</Button>
            <Button variant="contained">+new Floor</Button>
        </div>
    )
}
export default Facility;