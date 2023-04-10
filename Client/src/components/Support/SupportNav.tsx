import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Support/SupportNav.css";
function SupportNav(){
    return(
         <div>
            <nav className="navbar navbar-expand-lg navbar-light " style={{margin: "0 0 0 400px"}}>
  
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
             <a className="nav-link">Tickets(0)</a>
                </li>
             <li className="nav-item">
             <a className="nav-link">Agents(0)</a>
                </li>
            <li className="nav-item">
             <a className="nav-link">Teams(0)</a>
            </li> 
            <li className="nav-item">
             <a className="nav-link">Issues(0)</a>
            </li>         
    </ul>
  </div>
</nav>
         </div>
    )
}
export default SupportNav