import { createFileRoute, Link } from "@tanstack/react-router";
import Home from "../Home/Home";
// import CharacterDetails from "../CharcterComponents/CharacterDetails";


export const Route = createFileRoute('/home')({
    component: CharacterDetails,
  })

  function CharacterDetails(){
return(<>
<div className="characters_home">
    <h1>Rick & Morty Universe</h1>
            <p>Explore your favorite characters from the multiverse!</p>
            <Link to={"/characters"}><h1>Please Click on This for vire chacters</h1></Link>
            </div>
    </>)
  }