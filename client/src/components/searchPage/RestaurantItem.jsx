import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function RestaurantItem({ details }) {
    return (
        <div>
            <div
                style={{
                    margin: '10px 20px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
            >
                <img
                    style={{ height: '100px', width: '120px' }}
                    src={details.searchImage}
                    alt="resitem"
                ></img>
                <div style={{ marginLeft: '20px', width: '45%' }}>
                    <h3 style={{ fontFamily: 'esti', textAlign: 'left' }}>
                        {details.name}
                    </h3>
                    <div
                        style={{
                            textAlign: 'left',
                            color: '#6f6f86',
                            marginTop: '20px'
                        }}
                    >
                        {details.is_new ? 'New' : ''}
                    </div>
                </div>
                <div style={{ marginLeft: '20px', width: 'max-content' }}>
                    <Rating
                        name="read-only"
                        readOnly
                        value={details.rating.value}
                        precision={0.1}
                    />
                    <div
                        style={{
                            color: '#6b6b83',
                            fontFamily: 'sans serif',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}
                    >
                        {details.rating.count} ratings
                    </div>
                </div>
                <div style={{ marginLeft: '200px' }}>
                    <h3 style={{ fontFamily: 'esti' }}>
                        {details.avgDeliveryTime} -{' '}
                        {details.avgDeliveryTime + 10}
                    </h3>
                    <div
                        style={{
                            color: '#6b6b83',
                            marginTop: '10px',
                            fontFamily: 'Raleway',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}
                    >
                        mins
                    </div>
                </div>
            </div>
            <div style={{ border: '0.5px solid #d9d4ed', height: '1px' }}></div>
        </div>
    );
}
