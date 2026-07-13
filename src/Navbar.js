import { Link } from "react-router-dom";

 

function Navbar() {
 
  return (

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
   
        <Link className="navbar-brand fw-bold text-danger fs-4" to="/">
          CampusNest
        </Link>
        <button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
>
  <span className="navbar-toggler-icon"></span>
</button>
        <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav ms-auto ">
          <li> <Link className="nav-link active ms-auto" aria-current="page" to="/">Home</Link></li>
          <li>  <Link className="nav-link" to="/pgs/addListing">AddPG Listing</Link></li>
          <li>   <Link className="nav-link" to="#">Pricing</Link></li>
          <li> <Link className="nav-link disabled" aria-disabled="true">Disabled</Link></li>
        </ul>
        </div>
       
      </div>
  
</nav>
  )
}
export default Navbar;
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
//       <div className="container">

//         <Link className="navbar-brand" to="/">
//           CampusNest
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">

//           <ul className="navbar-nav ms-auto">

//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Home
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/pricing">
//                 Pricing
//               </Link>
//             </li>

//           </ul>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;