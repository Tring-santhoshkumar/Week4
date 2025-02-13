import React, { use, useState } from 'react'


const Crud = () => {

    const [inputData, setInputData] = useState({
        name : '', age : '', skills : '', designation : '', address : ''
    })

    const [tableData, setTableData] = useState([
        {name : 'Santhosh', age : '21', skills : 'C++', designation : 'Developer', address : 'Salem'},
        {name : 'Ronaldo', age : '39', skills : 'Python', designation : 'Developer', address : 'Portugal'},
        {name : 'Curry', age : '35', skills : 'C', designation : 'Developer', address : 'London'}
    ])

    const [showAddFunction,setShowAddFunction] = useState(false);

    const [editData, setEditData] = useState(false);

    const [editIndex, setEditIndex] = useState(null);

    const addingChanges = (e) => {
        setInputData({...inputData,[e.target.name]:e.target.value});

    }

    const addInput = () => {
        if(inputData.name && inputData.age && inputData.skills && inputData.designation && inputData.address){
            if(editData){
                const updateTableData = [...tableData];
                updateTableData[editIndex] = inputData;
                setTableData(updateTableData);
                setEditData(false);
                setEditIndex(null);
            }
            else{
                setTableData([...tableData, inputData]);
            }
            setInputData({name : '', age : '', skills : '', designation : '', address : ''});
            setShowAddFunction(false);
        }
        else{
            alert("Data's to be filled.");
        }
    }

    const editChanges = (index) => {
        setInputData(tableData[index]);
        setEditData(true);
        setEditIndex(index);
        setShowAddFunction(true);
    }

    const deleteChanges = (index) => {
        const updateTableInput = [...tableData];
        updateTableInput.splice(index,1);                                       
        setTableData(updateTableInput);
    }

    return (
        <div>
            <div className='addContainer'>
                <button id='addButton' onClick={() => setShowAddFunction(true)}>ADD</button>
                {showAddFunction && (
                <div>
                    <input type='text' placeholder='Enter name' name='name' value={inputData.name}  onChange={addingChanges} required pattern='[a-zA-z]{3-}' title='Ex : Santhosh'/>
                    <input type='number' placeholder='Enter age' name='age' value={inputData.age} onChange={addingChanges} required pattern='[0-9]' min={1} title='Ex : 21'/>
                    <input type='text' placeholder='Enter skills' name='skills' value={inputData.skills} onChange={addingChanges} required pattern='[a-zA-z]{3-}' title='Ex : C++'/>
                    <input type='text' placeholder='Enter designation' name='designation' value={inputData.designation} onChange={addingChanges} required pattern='[a-zA-z]{3-}' title='Ex : Developer'/>
                    <input type='text' placeholder='Enter address' name='address' value={inputData.address} onChange={addingChanges} required pattern='[a-zA-z]{3-}' title='Ex : Salem'/>
                    <button id='add' onClick={addInput}>Save</button>
                    <button id='cancel' onClick={() => setShowAddFunction(false)}>Cancel</button>
                </div>
            )}
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Skills</th>
                            <th>Designation</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data,index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.age}</td>
                                <td>{data.skills}</td>
                                <td>{data.designation}</td>
                                <td>{data.address}</td>
                                <td>
                                    <button onClick={() => editChanges(index)}>EDIT</button>
                                    <button onClick={() => deleteChanges(index)}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Crud