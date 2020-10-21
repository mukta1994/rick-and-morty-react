import React, { } from 'react';
import "./General.scss";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'


const CharacterCard = (props) => {
    const { id, name, image, status } = props.data;
    return (
        <Link to={{ pathname: `/character/${id}` }}>  <Card className="char-card">
            <CardContent><div className="character-card"> <div >
                <figure className="item-thumb-wrap">
                    <img
                        src={image}
                        alt={name}
                        className="item-thumb-image"
                    />
                </figure>
            </div>
                <div className="character-name">
                    <h2 className="character-item__title">{name}</h2>
                    <span className={`${status === "Alive" ? "alive" : `${status === "Dead" ? "dead" : ""}`}`}>●</span>{status}
                </div></div>
            </CardContent></Card></Link>
    );
}

export default CharacterCard;