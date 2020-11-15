import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/auth/actions';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #000',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '40%',
        position: 'relative'
    },
    addItemDiv: {
        border: '1px solid black',
        padding: '5px 5px',
        width: '100px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        border: 'none',
        flex: '1',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'normal',
        fontFamily: 'sans-serif'
    },
    qtnBtn: {
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        flex: '1',
        textAlign: 'center'
    }
}));

export default function MenuItem({ item }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(item.price.amount / 100);
    const [totalCost, setTotalCost] = useState(cost);
    const restaurant_id = useSelector(
        (state) => state.search.restaurantDetails._id
    );

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        setTotalCost(totalCost + cost);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalCost(totalCost - cost);
        }
    };

    const addItem = () => {
        setOpen(false);
        dispatch(
            addToCart([restaurant_id, { name: item.name, quantity, totalCost }])
        );
    };

    return (
        <React.Fragment>
            <div
                style={{
                    boxShadow: `0 0 0 1px rgba(67, 41, 163, 0.08),
                0 1px 5px 0 rgba(67, 41, 163, 0.08)`,
                    borderRadius: '4px',
                    padding: '15px',
                    margin: '5px',
                    display: 'flex',
                    position: 'relative',
                    background: 'white',
                    height: '100%',
                    transition: '0.5s box-shadow ease',
                    cursor: 'pointer'
                }}
                onClick={handleOpen}
            >
                <div style={{ width: '70%' }}>
                    <h4 style={{ fontFamily: 'esti', textAlign: 'left' }}>
                        {item.name}
                    </h4>
                    <div
                        style={{
                            textAlign: 'left',
                            color: '#6b6b83',
                            marginTop: '20px',
                            fontSize: '15px',
                            fontFamily: 'Raleway'
                        }}
                    >
                        {item.description}
                    </div>
                </div>
                <div style={{ width: 'auto' }}></div>
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
                    ${(item.price.amount / 100).toFixed(2)}
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
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <IconButton
                            style={{
                                position: 'absolute',
                                right: '0',
                                top: '0'
                            }}
                            color="primary"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        <h1 style={{ fontFamily: 'esti', fontSize: '26.3px' }}>
                            {item.name}
                        </h1>
                        <h2
                            style={{
                                fontFamily: 'esti',
                                fontSize: '20.3px',
                                margin: '5px 0 10px 0'
                            }}
                        >
                            ${cost}
                        </h2>
                        <p
                            style={{
                                fontFamily: 'Raleway',
                                marginBottom: '20px',
                                width: '95%'
                            }}
                        >
                            {item.description}
                        </p>
                        <hr />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '40px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center'
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: 'esti',
                                        marginRight: '15px'
                                    }}
                                >
                                    Quantity
                                </h3>
                                <div className={classes.addItemDiv}>
                                    <div
                                        className={classes.qtnBtn}
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </div>
                                    <div className={classes.input}>
                                        {quantity}
                                    </div>

                                    <div
                                        className={classes.qtnBtn}
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                            <button
                                style={{
                                    background: 'rgb(0, 112, 235)',
                                    padding: '7px 16px',
                                    height: '40px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    width: '200px',
                                    fontFamily: 'esti',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onClick={addItem}
                            >
                                <div>Add to bag</div>
                                <div
                                    style={{
                                        fontFamily: 'sans-serif',
                                        fontSize: 'large'
                                    }}
                                >
                                    ${totalCost.toFixed(2)}
                                </div>
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}
