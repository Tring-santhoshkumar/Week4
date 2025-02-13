import React, { useState } from 'react'

function InputField(){
    const [input,setInput] = useState([{name:"",age:"",college:""}]);       //Initializing 
    const [submit,setSubmit] = useState([]);                             //For Submit Process

    const submitChanges = (e) =>{
        e.preventDefault();
        if(input.length == 0){
            alert('No data to display,Please add.');
            return;                                                         //Setting the onClick submit
        }
       setSubmit(input);
    }

    const addingChanges = (index, name, target) => {
        const value = target.value;                                         //Adding the New Input Field with the Existing Array
        const updatedInput = [...input];
        updatedInput[index][name] = value;
        setInput(updatedInput);
    }
    
    const addNewRow = () => {
        setInput([...input,{name : '', age : '', college : ''}]);           //Adding New Row
    }

    const removeRow = (index) => {
        const updatedInput = [...input];
        updatedInput.splice(index,1);                                       //Removing a Row
        setInput(updatedInput);
    }

    const validateAge = () => {

    }

    return(
        <div>
             <form action='' onSubmit={submitChanges}>                      {/* submit changes */}
                {input.map((inputs, index) => (
                    <div className='container' key = {index}>               {/* Input Fields */}
                        <input className='inputFields' type='text' placeholder='Enter name' value={inputs.name}  onChange={(e) => addingChanges(index,'name',e.target)} required pattern='[a-zA-z]{3-}' title='Ex : Santhosh'/>
                        <input className='inputFields' type='number' placeholder='Enter age' value={inputs.age}  onChange={(e) => addingChanges(index,'age',e.target)} required min={1} pattern='[0-9]' title='EX : 21'/>
                        <input className='inputFields' type='text' placeholder='Enter college' value={inputs.college}  onChange={(e) => addingChanges(index,'college',e.target)} required pattern='[a-zA-z]{3-}' title='Ex : Nec'/>
                        <button className='buttonFields' type='button' onClick={addNewRow}>+</button>
                        {index > 0 && <button className='buttonFields' type='button' onClick={() => removeRow(index)}>-</button>}
                    </div>
                ))}
                
                <div className='container'>
                    <button id='submitButton' type='submit'>Submit</button>
                </div>
                
            </form>
            {submit.length > 0 && (                                                    /* Displaying the data */
                (submit.map((data) => (
                    <div className='submittedData'><span>{data.name} - {data.age} - {data.college}</span></div>
                )))
            )}
        </div>
    )
};

export default InputField