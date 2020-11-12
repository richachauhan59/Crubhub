import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    addItemDiv:{
        border:"1px solid black",
        padding:"5px",
        margin:"5px",
        width:"10%",
        borderRadius:"30px",
    },
    input: {
        border:"none",
        width:"34%",
        textAlign:"center"
    },
    qtnBtn: {
        border: '0',
        width:"30%",
        background: "transparent",
        cursor: 'pointer',
    }
   
  }));
  
  

export default function MenuItem(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(5)
    const [totalCost, setTotalCost] = useState(cost)
    
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const name = 'Mint Chip Ice Cream';
    const description =
        'We infuse mint essence into a smooth, creamy base and add rich chocolaty chips for the perfect finish to this refreshingly cool treat. 14 oz.';
    
    
    const increaseQuantity = () =>{
        setQuantity(quantity+1)
        setTotalCost(totalCost + cost)
    }
    const decreaseQuantity = () =>{
        setQuantity(quantity-1)
        setTotalCost(totalCost - cost)
    }

    return (
        <React.Fragment>
        <div
            style={{
                boxShadow: `0 0 0 1px rgba(67, 41, 163, 0.08),
                0 1px 5px 0 rgba(67, 41, 163, 0.08)`,
                borderRadius: '4px',
                padding: '15px',
                marginTop: '5px',
                display: 'flex',
                position: 'relative'
            }}
            onClick={handleOpen}
        >
            <div style={{ width: '70%' }}>
                <h4 style={{ fontFamily: 'esti', textAlign: 'left' }}>
                    {name}
                </h4>
                <div
                    style={{
                        textAlign: 'left',
                        color: '#6b6b83',
                        marginTop: '20px',
                        fontSize: '17px'
                    }}
                >
                    {description}
                </div>
            </div>
            <div style={{ width: 'auto' }}>
                <img
                    style={{ height: '100px' }}
                    src="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,h_130,f_auto,g_auto,q_auto,dpr_auto,c_fill/jlcxnwrzwvkorgtaovmx"
                    alt="item logo"
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    opacity: '0.75',
                    padding: '3px',
                    borderRadius: '3px',
                    top: '20px',
                    right: '30px',
                    fontFamily: 'esti'
                }}
            >
                {cost}
            </div>
        </div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
    >
        <Fade in={open}>
        <div className={classes.paper}>
            <h2 id="transition-modal-title">{name}</h2>
            <p id="transition-modal-description">{description}</p>
            <p>Cost: {cost}</p>
            <hr/>
            <div className={classes.addItemDiv} >
                <span><button className={classes.qtnBtn} onClick={decreaseQuantity} >-</button></span>
                <input className={classes.input} value={quantity}></input>
                <span><button className={classes.qtnBtn} onClick={increaseQuantity} >+</button></span>
            </div>
            <div style={{float:"right", background:"#D4D4DB",padding:"20px", borderRadius:"5px", fontFamily:"esti"}}>
                add to bag <span>cost: ${totalCost}</span>
            </div>
        </div>
        </Fade>
    </Modal>
    </React.Fragment>
    );
}







