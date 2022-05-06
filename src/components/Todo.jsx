import React, { useState, useEffect } from 'react';
import '../components/Todo.css'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2'

const getTodos = () => {

    let list = JSON.parse(localStorage.getItem("list"));
    
    if(list){
        return list;
    } else {
        return [];
    }

}

const Todo = () => {

    const [input, setInput] = useState('');
    // const [addtodo, setAddtodo] = useState([]);
    const [addtodo, setAddtodo] = useState(getTodos());


    const inputtodo = () => {
        if (!input) {
            alert('You can not add empty todo please type something!!!');
        } else {
            setAddtodo([...addtodo, input]);
            // localStorage.setItem("todolist", JSON.stringify([input, ...addtodo]));
            setInput('');
        }
    }

    const handleDelete = (index) => {
        const updatedList = addtodo.filter((item, ind) => {
            return ind !== index;
        });
        setAddtodo(updatedList);
        // localStorage.setItem("todolist", JSON.stringify(updatedList));
    }

    const handleEdit = async (index) => {
        const { value: text } = await Swal.fire({
            title: 'Enter updated todo',
            input: 'text',
            inputLabel: 'Your Todo is',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (text) {
            addtodo[index] = text;
            setAddtodo([...addtodo]);
            // localStorage.setItem("todolist", JSON.stringify(todolist));
            Swal.fire(`Your updated todo is ${text}`);
        }
    }

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(addtodo));
    }, [addtodo]);


    return (
        <>
            <div className='body'>
                <div className='mainbox'>
                    <h1>Todo List</h1>
                    <input className='todoinput' type="text" placeholder='Enter Something...' value={input} onChange={(e) => setInput(e.target.value)} />
                    <h2 onClick={inputtodo} >&#x2b;</h2>
                    <div className='todolist'>
                        {

                            addtodo.map((data, index) => {
                                return (
                                    <div className='list-items' key={index}>
                                        <p className='tododata'>{data}</p>
                                        <i className='editicon' onClick={() => handleEdit(index)} ><FiEdit /></i>
                                        <i className='deleteicon' onClick={() => handleDelete(index)}  ><MdDelete /></i>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>

    )
};

export default Todo;
