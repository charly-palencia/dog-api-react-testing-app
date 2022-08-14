import {useEffect, useState} from "react";

import fetcher from "../lib/api";
import {
  Link
} from "react-router-dom";

function Index(){
  const [breeds, setBreeds] = useState({message: []});
  useEffect(() => {
    fetcher("breeds/list/all").then(result => setBreeds(result))
  }, [])

  return <div>
    <h1>Breeds index</h1>

    <table>
      <thead>
        <tr>
          <td>Breed Name</td>
        </tr>
      </thead>
      <tbody>
        {Object.keys(breeds.message).map((name, key) => (
          <tr key={key}>
            <td test-id="link-td"><Link to={"/breeds/" + name}>{name}</Link></td>
          </tr>)
        )}
      </tbody>
    </table>
  </div>
}

export default Index;
