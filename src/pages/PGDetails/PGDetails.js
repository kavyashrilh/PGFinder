import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Map from "../map";


function PGDetails() {
  const { id } = useParams();
    const navigate = useNavigate();
  const [pg, setPg] = useState(null);
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/pgs/${id}`);
    alert("Listing deleted!");
  
      navigate("/");
   
  } catch (err) {
    console.log(err);
  }
};



useEffect(() => {
  axios.get(`http://localhost:8000/pgs/${id}`)
    .then(res => {
      console.log("API RESPONSE:", res.data);
      setPg(res.data);
    })
    .catch(err => console.log("ERROR:", err));
}, [id]);
console.log("ID:", id);
  if (!pg) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{pg.title}</h2>
      <img src={pg.image} alt={pg.title} className="img-fluid w-50"  />
      <p>{pg.location}</p>
      <p>₹{pg.price}</p>
      <p>{pg.description}</p>
  {pg.geometry?.coordinates && (
  <Map coordinates={pg.geometry.coordinates} />
)}
      <div>
  <b>Facilities:</b>
  <div className="d-flex gap-4 flex-wrap">
    {pg.facilities?.map((item,index)=>(
        <span key={item} >{item}</span>
    ))}
  </div>
  <button onClick={() => handleDelete(pg._id)} >Delete</button>
 
</div>
    </div>
  );
  // <script src="map.js"></script>
}

export default PGDetails;
