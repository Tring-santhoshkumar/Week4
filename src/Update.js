import React, { useContext, useEffect, useState } from "react";
import defaultImage from './assets/defaultImage.png'
import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import TiptapEditor from "./TiptapEditor";

const Update = () => {

    const navigate = useNavigate();                                     //Navigation

    const url = useParams();                                            //setting edit or creating new

    const editStatus = (url.status == "create" ? false : true);

    const [editImage, setEditImage] = useState(false);                  //Popup Enabling State

    const [tempImage, setTempImage] = useState(null);                   //Storing image in a temporary state

    const [image, setImage] = useState(null);                           //Storing image

    const [deleteInput, setDeleteInput] = useState(false);              //Delete popup

    const [validation, setValidation] = useState({});                   //Validation

    const [editorArea, setEditorArea] = useState(null);                 //RichTextEditor

    const {personas, addPersona, editPersonaKey, deletePersona} = useContext(UserProfile);      //UseContext

    const [personaData, setPersonaData] = useState({
        name : "", quote : "", description : "", attitude : "", challenges : "", jobs : "", activities : "" , image : image || defaultImage
    })

    const handleChange = (e) => {
        setPersonaData({...personaData, [e.target.name] : e.target.value});
    }

    const handleEditorChange = (name, value) => {
        setPersonaData({...personaData, [name] : value});
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

    // console.log(personaData);

    const setEditImageFunction = () => {                                //Enabling the popup
        setEditImage(true);
    }

    const insertImage = (e) => {                                        //Saving the image in the state by URL.createObjectURL
        const imageFile = e.target.files[0];
        const imageValidation = validateImage(imageFile);
        if(imageValidation && typeof URL.createObjectURL === "function"){
            setTempImage(URL.createObjectURL(imageFile));
        }
        else if(imageValidation){
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
        }
    };

    const validateImage = (imageFile) => {                            //Validating only image file
        const fileName = imageFile.name;
        // console.log(fileName);
        var lastOccurenceOfDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(lastOccurenceOfDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            return true;
        }
        alert("Only image files are accepted.");
        return false;
    }

    const saveImage = () => {                                           //Storing image from the temporary state
        if(tempImage){
            setPersonaData((prev) => ({...prev, image : tempImage}));
            setImage(tempImage);
        }
        else{
            setTempImage(null);
            setImage(null);
        }
        setEditImage(false);
    }


    const removeHtmlFunction = (value) => {
        const content = new DOMParser().parseFromString(value, 'text/html');
        return content.body.textContent;
    }

    const editImageFunction = () => {                                   //Popup for image insertion
        return(
            <div className='editImagePopup'>
                <button className="closeButton" onClick={()=>setEditImage(false)}>X</button>
                <label className="popupContent">Update Image</label>
                <input type="file" id="imageFileInput" className="selectedImageFile" onChange={insertImage} accept="image/*" style={{display:'none'}}/>
                <div className="imagePreview">
                    <img src={tempImage || defaultImage} alt="Image preview" className="preview" onClick={() => document.getElementById('imageFileInput').click()}/>
                </div>
                <div className="imageButtons">
                    {tempImage && <button className="imageDeleteButton" onClick={deleteImage}>Delete</button>}
                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <button className="imageSaveButton" onClick={saveImage}>Save</button>
                        <button className="imageCancelButton" onClick={cancelImage}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    const cancelImage = () => {
        if(tempImage == image) {}
        else{
            setTempImage(image);
        }
        setEditImage(false);
    }

    const deleteImage = () => {
        setTempImage(null);
        setImage(null);
        setEditImage(false);
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
        
        if((!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(personaData.name)) && (personaData.name.trim().length < 3 || personaData.name.trim().length > 30)){
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

        if(personaData.attitude == undefined || personaData.attitude.trim() == ""){
            errors.attitude = "Attitude / Motivations is empty.";
        }

        if(personaData.jobs == undefined || personaData.jobs.trim() == ""){
            errors.jobs = "Jobs / Needs is empty.";
        }

        if(personaData.activities == undefined || personaData.activities.trim() == ""){
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
                <p className='title'>Persona Name<span style={{color:'red',background:'none'}}>*</span></p>
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
                {console.log(validation.description)}
                {validation.description && <span>{validation.description}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="attitude">Attitudes / Motivations</label>
                <textarea id="attitude" name="attitude" onChange={handleChange} placeholder="What drives and incentives the persona to reach desired goals?What mindset does the persona have?" defaultValue={personaData.attitude}/>
                {validation.attitude && <span>{validation.attitude}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="challenges">Pain Points</label>
                {editorArea == 'challenges' ? ( <ReactQuill id="challenges" onClick={() => setEditorArea(null)} name="challenges" onChange={(value) => handleEditorChange('challenges',value)} placeholder="What are the challenges that the persona faces in the job?" value={personaData.challenges}/>) : (<textarea id="challenges" name="challenges" onClick={() => setEditorArea('challenges')} onChange={handleChange} placeholder="What are the challenges that the persona faces in the job?" value={removeHtmlFunction(personaData.challenges)}/>)}
                {validation.challenges && <span>{validation.challenges}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="jobs">Jobs / Needs</label>
                {editorArea == 'jobs' ? ( <ReactQuill id="jobs" name="jobs" onClick={() => setEditorArea(null)} onChange={(value) => handleEditorChange('jobs',value)} placeholder="What are the persona's functional, social, and emotional needs to be successful in the job." value={personaData.jobs}/>) : ( <textarea id="jobs" name="jobs" onClick={() => setEditorArea('jobs')} onChange={handleChange} placeholder="What are the persona's functional, social, and emotional needs to be successful in the job." value={removeHtmlFunction(personaData.jobs)}/>)}
                {validation.jobs && <span>{validation.jobs}</span>}
            </div>
            <div className="textArea">
                <label htmlFor="activities">Activities</label>
                {editorArea == 'activities' ? ( <ReactQuill id="activities" name="activities" onClick={() => setEditorArea(null)} onChange={(value) => handleEditorChange('activities',value)} placeholder="What does the persona do in their free time?" value={personaData.activities}/>) : ( <textarea id="activities" name="activities" onClick={() => setEditorArea('activities')} onChange={handleChange} placeholder="What does the persona do in their free time?" value={removeHtmlFunction(personaData.activities)}/>)}
                {validation.activities && <span>{validation.activities}</span>}
            </div>
        </div>
        <footer>
            <div className="footerLeft">                    {/*Fixed Footer with edit buttons*/}
                <button className="deleteFooter" onClick={() => setDeleteInput(true)}>Delete</button>
                {deleteInput && deleteCardFunction()}       {/*Delete popup*/}
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