import React, { } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'
import LocationOnIcon from '@material-ui/icons/LocationOn';


const List = (props) => {
    return <Link to={props.path} >
        <Card className="char-card" >
            <CardContent style={{ display: "flex" }}>
                <div className="location-icon">
                    {props.page === 'location' ? <LocationOnIcon /> : ""}
                </div>
                <div><h2 className="character-item__title" ><span></span>{props.name}</h2>
                    <p>{props.property}</p>
                </div>

            </CardContent></Card> </Link>

}

export default List