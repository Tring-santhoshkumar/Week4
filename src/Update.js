import React, { useContext, useEffect, useState } from "react";
import defaultImage from './assets/defaultImage.png'
import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";
// import TiptapEditor from "./TiptapEditor";

const Update = () => {

    const navigate = useNavigate();                                     //Navigation

    const url = useParams();

    const editStatus = (url.status == "create" ? false : true);

    const [editImage, setEditImage] = useState(false);                  //Popup Enabling State

    const [tempImage, setTempImage] = useState(null);                   //Storing image in a temporary state

    const [image, setImage] = useState(null);                           //Storing image

    const [deleteInput, setDeleteInput] = useState(false);

    const [validation, setValidation] = useState({});

    const {personas, addPersona, editPersonaKey, deletePersona} = useContext(UserProfile);

    const [personaData, setPersonaData] = useState({
        name : "", quote : "", description : "", attitude : "", challenges : "", jobs : "", activities : "" , image : image || defaultImage
    })

    const handleChange = (e) => {
        setPersonaData({...personaData, [e.target.name] : e.target.value});
    }

    useEffect(() => {
        if(editStatus){
            const previousPersona = personas[editPersonaKey];
            setPersonaData({ ...previousPersona });
            if(previousPersona.image != null){
                setImage(previousPersona.image);
            }
        }
    }, [editStatus, personas, editPersonaKey]);

    const setEditImageFunction = () => {                                //Enabling the popup
        setEditImage(true);
    }

    const insertImage = (e) => {                                        //Saving the image in the state by URL.createObjectURL
        const imageFile = e.target.files[0];
        if(!imageFile){
            alert("No file selected.");
            return;
        }
        if(typeof URL.createObjectURL === "function"){
            setTempImage(URL.createObjectURL(imageFile));
        }
        else{
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
        }
    };

    const saveImage = () => {                                           //Storing image from the temporary state
        if(tempImage){
            setPersonaData((prev) => ({...prev, image : tempImage}));
            setImage(tempImage);
            setTempImage(null);
        }
        setEditImage(false);
    }

    const editImageFunction = () => {                                   //Popup for image insertion
        return(
            <div className='editImagePopup'>
                <label className="popupContent">Upload Image:</label>
                <input type="file" onChange={insertImage} accept="image/*"/>
                <div className="imageButtons">
                    <button className="imageSaveButton" onClick={saveImage}>Save</button>
                    <button className="imageCancelButton" onClick={()=>setEditImage(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    const updatePersona = () => {
        const validate = validationPersonData();
        if(validate && editStatus){
            personas[editPersonaKey].name = personaData.name;
            personas[editPersonaKey].image = image;
            personas[editPersonaKey].quote = personaData.quote;
            personas[editPersonaKey].description = personaData.description;
            personas[editPersonaKey].attitude = personaData.attitude;
            personas[editPersonaKey].challenges = personaData.challenges;
            personas[editPersonaKey].jobs = personaData.jobs;
            personas[editPersonaKey].activities = personaData.activities;
            userHomeNavigation();
         }
        else if(validate){
            addPersona(personaData);
            userHomeNavigation();
        }

        // userHomeNavigation();
    };

    const deleteCardFunction = () => {
        return(
            <div className='editImagePopup'>
                <label className="popupContent">Are you sure you want to delete?</label>
                <div className="imageButtons">
                    <button className="imageSaveButton" onClick={deleteCard}>Delete</button>
                    <button className="imageCancelButton" onClick={()=>setDeleteInput(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    const deleteCard = () => {
        deletePersona(editPersonaKey);
        userHomeNavigation();
    };

    const validationPersonData = () => {

        const errors = {};
        
        if(!/^[A-Za-z]{3,30}$/.test(personaData.name)){
            errors.name = "Name must be atleast 3 letters and only letters.";
        }

        if(personaData.quote.trim() == ""){
            errors.quote = "Quotes is empty.";
        }
        
        if(personaData.description.trim() == ""){
            errors.description = "Description is empty.";
        }

        if(personaData.challenges.trim() == ""){
            errors.challenges = "Challenges is empty.";
        }

        if(personaData.attitude.trim() == ""){
            errors.attitude = "Attitude / Motivations is empty.";
        }

        if(personaData.jobs.trim() == ""){
            errors.jobs = "Jobs / Needs is empty.";
        }

        if(personaData.activities.trim() == ""){
            errors.activities = "Activities is empty.";
        }

        setValidation(errors);
        return Object.keys(errors).length == 0;
    }


    const userHomeNavigation = () => {                                  //Navigates to userHome Page
        navigate("/userHome");
    }

  return (
    <div>
         <div className="updateContainer" style={{backgroundImage: `url(${image ? image : defaultImage})`}}>  {/*Setting the image insertion in background*/}
            <div className='Content'>
                <p className='title'>Persona</p>
                { editStatus ? <input type="text" name='name' className="personaName" onChange={handleChange} value={personaData.name} defaultValue={personaData.name}/>: 
                                <input type="text"  name='name' className="personaName" placeholder="Sample" onChange={handleChange}/>}<br/>
                {validation.name && <span>{validation.name}</span>}
            </div>
            <button onClick={() => setEditImageFunction(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>
                Edit Image
            </button>
            {editImage && editImageFunction()}              {/*Popup only when edit*/}
        </div>
        <div className="updateMain">
            <div className="textArea">                  {/*Textarea fields */}
                <label htmlFor="quote">Notable Quote</label>
                <textarea id="quote" name="quote" onChange={handleChange} placeholder="Enter a quote that identifies the persona." defaultValue={personaData.quote}/>
                {validation.quote && <span>{validation.quote}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={handleChange} placeholder="Enter a general description/bio about the persona." defaultValue={personaData.description}/>
                {validation.description && <span>{validation.description}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="attitude">Attitudes / Motivations</label>
                <textarea id="attitude" name="attitude" onChange={handleChange} placeholder="What drives and incentives the persona to reach desired goals?What mindset does the persona have?" defaultValue={personaData.attitude}/>
                {validation.attitude && <span>{validation.attitude}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="challenges">Pain Points</label>
                <textarea id="challenges" name="challenges" onChange={handleChange} placeholder="What are the challenges that the persona faces in the job?" defaultValue={personaData.challenges}/>
                {validation.challenges && <span>{validation.challenges}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="jobs">Jobs / Needs</label>
                <textarea id="jobs" name="jobs" onChange={handleChange} placeholder="What are the persona's functional, social, and emotional needs to be successful in the job." defaultValue={personaData.jobs}/>
                {validation.jobs && <span>{validation.jobs}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="activities">Activities</label>
                <textarea id="activities" name="activities" onChange={handleChange} placeholder="What does the persona do in their free time?" defaultValue={personaData.activities}/>
                {validation.activities && <span>{validation.activities}</span>}
            </div>
        </div>
        <footer>
            <div className="footerLeft">                    {/*Fixed Footer with edit buttons*/}
                <button className="deleteFooter" onClick={() => setDeleteInput(true)}>Delete</button>
                {deleteInput && deleteCardFunction()}
            </div>
            <div className="footerRight">
                <button className="cancelFooter" onClick={userHomeNavigation}>Cancel</button>
                <button className="saveFooter" onClick={updatePersona}>Update Persona</button>
            </div>
        </footer>
    </div>
  );
};

export default Update;