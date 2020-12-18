import React, { useState } from 'react';
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Form.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useForm } from "react-hook-form";  

const Form = () => { 

    const { register, errors, handleSubmit } = useForm();

    const MySwal = withReactContent(Swal);    
        
    const [file, setFile] = useState(null);

    
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    function refreshPage() {
      window.location.reload(false);
    }

    const onSubmit = (data,e) => {

      const formData = new FormData()
      formData.append('file', file);
      formData.append('title', data.title);
      formData.append('name', data.name);
      formData.append('tags', data.tags)
    
      fetch('http://localhost:5000/addInformation', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(success => {
        console.log(success);    
      })
      .catch(error => {
        console.error(error)
      })
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        // title: <p>Hello World</p>,
        footer: 'Copyright 2018',
        didOpen: () => {                
          MySwal.clickConfirm()
        }
      }).then(() => {
        return MySwal.fire(<p>Your Information Submitted Successfully </p>)
      })
      e.target.reset();
      refreshPage();
       
    }

    return (
        <div className="content sticky-top mt-4">
            <div className="form sticky-top">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="title" className="name" placeholder="Title"  ref={register({ required: true })} />
                    {errors.title && <small className="text-danger">This field is required</small>}
                    <input name="name" className="name" placeholder="Author Name" ref={register({ required: true })} />
                    {errors.name && <small className="text-danger">This field is required</small>}
                    <textarea rows="3" cols="40" name="tags" placeholder="Tags" type="text"  className="name" ref={register({ required: true })} />
                    {errors.tags && <small className="text-danger">This field is required</small>}
                    <div className="form-group">                      
                      <label className="upload-btn">
                        <input type="file" name="image" onChange={handleFileChange} name="file" className="form-control-file"/>                        
                        <FontAwesomeIcon
                          icon={faCloudUploadAlt}
                          className="mr-2"
                        />
                        Upload Image
                      </label>                     
                    </div>
                    <input id="btn" value="Create a Blog" className="login" type="submit" />
                </form>                
            </div>
        </div>
    );
};

export default Form;