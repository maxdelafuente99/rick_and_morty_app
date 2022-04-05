import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Cards from "./components/Cards/Cards";
import Filters from "./components/Filters/Filters";
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';

function App() {

  let [pageNumber, setPageNumber] = useState(1);
  let [search, setSearch] = useState("");
  let [status, setStatus] = useState("");
  let [gender, setGender] = useState("");
  let [species, setSpecies] = useState("");

  let[fetchedData, updateFetchedData] = useState([]);
  let {info, results} = fetchedData; //destructuring data from api
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;
  
  //useEffect hook
  useEffect(()=>{
    (async function(){
      let data = await fetch(api).then(res=>res.json()); //fetch data from api 
      updateFetchedData(data); 
    })()//iife js
  },[api]);

  return (
    <div className="App">
      <h1 className="text-center fuente my-3">
        Rick & Morty <span className="text-primary">Finder</span>
      </h1>
      
      <Search setPageNumber = {setPageNumber} setSearch = {setSearch}/>
      
      <div className="container">
        <div className="row">
          
            <Filters
              setSpecies= {setSpecies}  
              setGender = {setGender} 
              setStatus = {setStatus} 
              setPageNumber = {setPageNumber}
            />
          <div className="col-8">
            <div className="row">
              <Cards results = {results}/>
            </div>
          </div>
        </div>
      </div>

      <Pagination 
      info={info} 
      pageNumber={pageNumber} 
      setPageNumber={setPageNumber}
      />
      <p className="text-center">Maded with bootstrap</p>
    </div>
  );
}

export default App;
