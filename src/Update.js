import React, { useState } from "react";
import defaultImage from './assets/defaultImage.png'
import { useNavigate } from "react-router-dom";

const Update = () => {

    const navigate = useNavigate();                                     //Navigation

    const [editImage, setEditImage] = useState(false);                  //Popup Enabling State

    const [tempImage, setTempImage] = useState(null);                   //Storing image in a temporary state

    const [image, setImage] = useState(null);                           //Storing image

    const setEditImageFunction = () => {                                //Enabling the popup
        setEditImage(true);
    }

    const insertImage = (e) => {                                        //Saving the image in the state by URL.createObjectURL
        const imageFile = e.target.files[0];
        setTempImage(URL.createObjectURL(imageFile));
    };

    const saveImage = () => {                                           //Storing image from the temporary state
        if(tempImage){
            setImage(tempImage);
            setTempImage(null);
        }
        setEditImage(false);
    }

    const editImageFunction = () => {                                   //Popup for image insertion
        return(
            <div className='editImagePopup'>
                <label className="popupContent">Upload Image:</label>
                <input type="file" onChange={insertImage} />
                <div className="imageButtons">
                    <button className="imageSaveButton" onClick={saveImage}>Save</button>
                    <button className="imageCancelButton" onClick={()=>setEditImage(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    const userHomeNavigation = () => {                                  //Navigates to userHome Page
        navigate('/UserHome');
    }

  return (
    <div>
         <div className="updateContainer" style={{backgroundImage: `url(${image ? image : defaultImage})`}}>  {/*Setting the image insertion in background*/}
            <div className='Content'>
                <p className='title'>Persona Name</p>
                <p className='personaName'>Sample</p>
            </div>
            <button onClick={() => setEditImageFunction(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>
                Edit Image
            </button>
            {editImage && editImageFunction()}              {/*Popup only when edit*/}
        </div>
        <div className="updateMain">
            <div className="textArea">                      {/*Textarea fields */}
                <label htmlFor="textAreaInput1">Notable Quote</label>
                <textarea id="textAreaInput1" placeholder="Enter a quote that identifies the persona."/>
            </div>
            <div className="textArea">
                <label htmlFor="textAreaInput2">Description</label>
                <textarea id="textAreaInput2" placeholder="Enter a general description/bio about the persona."/>
            </div>
            <div className="textArea">
                <label htmlFor="textAreaInput3">Attitudes / Motivations</label>
                <textarea id="textAreaInput3" placeholder="What drives and incentives the persona to reach desired goals?What mindset does the persona have?"/>
            </div>
            <div className="textArea">
                <label htmlFor="textAreaInput4">Notable Quote</label>
                <textarea id="textAreaInput4" placeholder="Enter a quote that identifies the persona."/>
            </div>
            <div className="textArea">
                <label htmlFor="textAreaInput5">Notable Quote</label>
                <textarea id="textAreaInput5" placeholder="Enter a quote that identifies the persona."/>
            </div>
            <div className="textArea">
                <label htmlFor="textAreaInput6">Notable Quote</label>
                <textarea id="textAreaInput6" placeholder="Enter a quote that identifies the persona."/>
            </div>
        </div>
        <footer>
            <div className="footerLeft">                    {/*Fixed Footer with edit buttons*/}
                <button className="deleteFooter">Delete</button>
            </div>
            <div className="footerRight">
                <button className="cancelFooter" onClick={userHomeNavigation}>Cancel</button>
                <button className="saveFooter" onClick={userHomeNavigation}>Update Persona</button>
            </div>
        </footer>
    </div>
  );
};

export default Update;