import React from "react";

function FilterModule({ searchedPerson, handlePersonSearch }) {
  return (
    <div>
        filter shown with: <input onChange={handlePersonSearch} value={searchedPerson}/>
    </div> 
  )
}
export default FilterModule;