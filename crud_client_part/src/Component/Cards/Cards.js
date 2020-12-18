import React,{useState,useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DataContext } from '../../App';
import Spinner from 'react-spinner-material';
import './Cards.css';
import UpdateCardValue from '../UpdateCardValue/UpdateCardValue';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const Cards = () => { 

  const [getData, setGetInformation] = useState([]);

  //for metarial ui extention
  const MySwal = withReactContent(Swal);
  const classes = useStyles();  

  //Context api
  const [singleData, setSingleData] = useContext(DataContext);


  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal(){
    setIsOpen(false);
  }


 //for all data loading  
 const handleInformation = () =>{
    fetch('http://localhost:5000/allInformation')
    .then(res =>  
       res.json())
    .then(data => {      
      setGetInformation(data)
    })
  }

  useEffect(() => {       
    handleInformation();
 },[])

 //delete each blog
 const deleteCart = (id) => {
    fetch('http://localhost:5000/delete/'+id,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);      
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
      return MySwal.fire(<p>Your Information deleted Successfully </p>)
    })
    
    handleInformation();
  }

//loading a single blog data  
const loadingCart = (id) => {
  openModal();  
  fetch('http://localhost:5000/singleInformation/'+id)
  .then(res => res.json())
  .then(data => { 
     setSingleData(data); 
     
  })
}
    
  return (
    <div className="row">
        {
           getData.length === 0 &&  
           <div className="spinner"><Spinner size={150} spinnercolor={"#333"} spinnerwidth={4} visible={true} /></div>
        }
           
        {    getData.map(eachData => 
              <div className="col-md-4 mt-2" key={eachData._id}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                        }                    
                        title={eachData.title}
                        subheader={eachData.name}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`data:image/png;base64,${eachData.image.img}`}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <h3 className="text-dark">Description</h3>   
                          {eachData.tags}
                        </Typography>
                    </CardContent>
                    
                    <button type="button" onClick={() => deleteCart(eachData._id)} className="btn btn-danger ml-4 mb-3">Delete</button>
                    <button type="button" onClick={() => loadingCart(eachData._id)} className="btn btn-info ml-5 mb-3">Edit</button>
                    <UpdateCardValue modalIsOpen={modalIsOpen} closeModal={closeModal}></UpdateCardValue>
                 </Card>            
              </div>
            )          
          
        }      
        
    </div>
  );
};

export default Cards;