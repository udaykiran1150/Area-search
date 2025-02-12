import React, { useState,useEffect } from 'react'
import './Search.css'
import {FaSearch} from 'react-icons/fa'
import axios from 'axios'
const Search = () => {
    let [input,setInput]=useState("");
    let [results,setResults]=useState([]);
    let [postalArray,setPostalArray]=useState([])
    let [city,setCity]=useState();
    let [District,setDistrict]=useState();
    let [selected,setSelected]=useState(false);
     let [found,setFound]=useState(true);
    
let postalPincodefetch=(value)=>
    {   
        
     
        if(value.length!=0)
        {
            axios.get(`https://api.postalpincode.in/pincode/${value}`)
            .then(res => {
                
              if(value.length==6)
              {
                if( res.data[0].PostOffice!==null)
                  { 
                     setFound(true)
                      console.log(res.data[0].PostOffice);
                      setPostalArray(res.data[0].PostOffice)
                      console.log("postal")
                      console.log(postalArray)
                    
                      
                  }
                  else{
                    setFound(false)
                    setPostalArray(null)
                    setCity('');
                    setDistrict('')
                    setSelected(false)
                  }
              }
                
                
                 }
                
                )  
            .catch(err => console.error("Axios error:", err)); 
    
             
        }

        
    }
let setArea=(e)=>
{      
       setSelected(true)
       setCity(e.Name);
       setDistrict(e.District);
}

    
    let HandleChange=(value)=>
    {
         setInput(value)
         postalPincodefetch(value);
         
    }
   
  return (
    
    <div>

         {!found?<h1 className='not-found'>*not found</h1>:""}
    
    <div className='search-container'>
       
     <div className="search-top">
        
            <FaSearch id='search-icon'/>
            <input type="text" placeholder='enter to search'  onChange={(e)=>{HandleChange(e.target.value)}} />
      
     </div>
    
     <div className="search-bottom">

        <ul>

          
         {postalArray!=null? postalArray.map((e,i)=>
             
             
             <div   onClick={()=>setArea(e)}  className='postal-element' key={i} > <div   >{e.Name}</div>,<div>{e.District}</div>
             
             
             </div>
            
            ): ""
             
         }
         </ul>
       
     
     </div>

     <div className="bottom">
       { selected ?
       
       <div className='selected-element'> <label >Area:</label> {city} ,&nbsp;<label >District:</label>{District}</div> :" "

      

      } 
      
       
     </div>
     
    

    </div>
    </div>
  )
}

export default Search