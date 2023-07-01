import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Preloader from './PreLoader';
import { axiosInstance } from '../config';

const AdminToDo = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get('api/task/getTask');
        console.log(response)
        setItems(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const addItem = async (inputText) => {
    if (inputText.length < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You have to write something!',
      });
      return
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post("api/task/addTask", { desc: inputText })
      const newItem = res.data;
      setItems((prevItems) => [...prevItems, newItem]);
      Swal.fire({
        title: 'Task',
        text: `${res.data.msg} !`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {

    try {
      setLoading(true);
      const res = await axiosInstance.delete(`api/task/${id}`)
      setItems(prevItems => {
        const index = prevItems.findIndex(item => item.id === id);
        const newItems = [...prevItems];
        if (index !== -1) {
          newItems.splice(index, 1);
        }
        return newItems;
      });
      Swal.fire({
        text: `${res.data} !`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }

  }
  return (

    <>
      {loading && <Preloader />}
      <div className="input-group container my-2 py-3 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <input className="form-control input-field" placeholder="Enter task..." onChange={handleChange} type="text" value={inputText} required />
        <button className="button-primary" onClick={() => { addItem(inputText); setInputText(""); }}><i className="fa-solid fa-plus"></i></button>
      </div>

      <div className="container my-2 py-4 px-4 rounded" style={{ backgroundColor: "#e3f2fd" }}>
        <h4>To-Do List</h4>
        <div className='table-responsive'>
          <table className="table  table-borderless">
            <thead >
              <tr className="header-row">
                <th scope="col">Task</th>
                <th scope="col">Completed ?</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className='align-middle'>
                    {item.desc}
                  </td>
                  <td className='align-middle'><i className="fa-solid fa-check p-2 bg-light rounded" onClick={() => deleteItem(item.id)} style={{ cursor: "pointer" }}></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminToDo