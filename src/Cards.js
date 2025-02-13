import React from 'react'
import img from './Assets/shopping.webp'
function Cards(props){
  const temp = props.data;     //Data Object
  return (
    <div className="cardsItems"> 
      <p>{props.id}</p>        {/*Id of the Object */}
      <p>{props.name}</p>      {/*Name of the Object */}
      <img src={img} alt="Mobiles"/>
      {/* <p>{temp && ((temp.color ? <span>Color : {temp.color}</span> : '') || (temp.price ? <span>Price : {temp.price}</span> : '' ) || (temp.capacity ? <span>Storage : {temp.capacity}</span> : ''))}</p> */}
      {temp!=null && Object.entries(temp).map(([key,value])=>(
        <p>{key} : {value}</p>
      ))}
    </div>
  )
}

export default Cards