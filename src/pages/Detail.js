import {useEffect, useState} from "react";
import fetcher from "../lib/api";

import {
  useParams,
  Link
} from "react-router-dom";

function Detail(){
  const {id} = useParams();
  const [breed, setBreed] = useState({message: []});

  useEffect(() => {
    if(id){
      fetcher("breed/"+id+"/images").then(result => setBreed(result))
    }
  }, [id])

  return <div>
    <h1>Bread Detail</h1>
    <Link to="/">Back</Link>

    <div>
      {breed.message.slice(0, 4).map((imageUrl, index) => <img key={"image" + index} src={imageUrl} alt="" />)}
    </div>
  </div>
}

export default Detail;
