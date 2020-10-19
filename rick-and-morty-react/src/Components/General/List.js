import React, { } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'

const List = (props) => {
    return <Link to={props.path} >
        <Card className="char-card" >
            <CardContent>
                <h2 className="character-item__title" >{props.name}</h2>
                <p>{props.property}</p>
            </CardContent></Card> </Link>

}

export default List