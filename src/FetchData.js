import { useEffect, useState } from "react";

import React from 'react'

import Cards from "./Cards";

function FetchData() {
    const [data,setData] = useState([]);
    useEffect(() => {
            fetch("https://api.restful-api.dev/objects")        //Fetching the API using fetch()
            .then((res) => res.json())
            .then((data) => {
                console.log('DATA', data); setData(data)        //Printing the data of the API in console and Storing the data
            })
            .catch((error) => console.log(error));              //Error,if API fails
    }, [])
    return (
        <div>
            <h1>API FETCH</h1>
            {/* <ol> */}
            <div className="cardsContainer">                    
                {data?.map((datas) => {                         //Looping through data
                        return <Cards key = {datas.id} {...datas} />    //Paasing it to Card Component
                        {/* // <li key = {datas.id}>
                        //     <p>Name : {datas.name} </p>
                        //     <p>Id : {datas.id}</p>
                        //     <p>Datas : {JSON.stringify(datas.data)}</p>
                        // </li> */}

                })} 
            </div>
        
            {/* </ol> */}
        </div>
    )
}

export default FetchData
