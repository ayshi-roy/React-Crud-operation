import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "../../../node_modules/react-hook-form";
import { DataContext } from '../../App';
import Swal from 'sweetalert2';
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withReactContent from '../../../node_modules/sweetalert2-react-content';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '35%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-80%',
    transform             : 'translate(-50%, -50%)',
    width: '550px',
    borderRadius : '35px',
    boxShadow : '5px 5px 10px rgba(0, 0, 0, 0.6)',
    padding : '50px 50px'
  }
};

Modal.setAppElement('#root')

  const UpdateCardValue = ({modalIsOpen,closeModal}) => {

  const { register, handleSubmit, errors } = useForm();

  const [singleData, setSingleData] = useContext(DataContext);

  const MySwal = withReactContent(Swal);
  
  const {_id} = singleData; 
  
  const [file, setFile] = useState(null);

  function refreshPage() {
    window.location.reload(false);
  }

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  }
  // const onSubmit = (data) => { 
  //   const formData = new FormData()
  //     formData.append('file', file);
  //     formData.append('title', data.title);
  //     formData.append('name', data.name);
  //     formData.append('tags', data.tags)
       
  //   fetch('http://localhost:5000/update/'+_id,{
  //         method: 'PATCH',
  //         headers: {'Content-type' : 'application/json'},
  //         body: formData
  //       })
  //       .then(res => res.json())
  //       .then(success => {
  //         console.log(success);                
  //     })
  //     MySwal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Your work has been saved',
  //       showConfirmButton: false,
  //       timer: 1500,
  //       // title: <p>Hello World</p>,
  //       footer: 'Copyright 2018',
  //       didOpen: () => {                
  //         MySwal.clickConfirm()
  //       }
  //     }).then(() => {
  //       return MySwal.fire(<p>Your Information Updated Successfully </p>)
  //     })
  //     closeModal();
  //     refreshPage();
  // }

  const onSubmit = (data) => { 

    fetch('http://localhost:5000/update/'+_id,{
          method: 'PATCH',
          headers: {'Content-type' : 'application/json'},
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(success => {
          console.log(success);                
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
        return MySwal.fire(<p>Your Information Updated Successfully </p>)
      })
      closeModal();
      refreshPage();
  }
    return (
        <div>            
          <Modal
              isOpen={modalIsOpen}            
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              >

              <h2 className="text-primary">Update The Blog</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">                    
                        <input type="text" className="form-control" defaultValue={singleData.title} name="title" ref={register({ required: true})}  />
                        {errors.title && <small className="text-danger">This field is required</small>}
                    </div>
                    <div className="form-group">                    
                        <input type="text" className="form-control" defaultValue={singleData.name} name="name" ref={register({ required: true})}  />
                        {errors.name && <small className="text-danger">This field is required</small>}
                    </div>
                    <div className="form-group">                    
                        <textarea rows="3" cols="40" defaultValue={singleData.tags} type="text" className="form-control" name="tags" ref={register({ required: true})} />
                        {errors.tags && <small className="text-danger">This field is required</small>}
                    </div>
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
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>                    
                </form>
          </Modal>
        </div>
    );
};

export default UpdateCardValue;