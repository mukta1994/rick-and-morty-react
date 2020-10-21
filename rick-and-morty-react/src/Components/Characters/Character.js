import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'


export class Character extends Component {
    render() {
        const { id, name, image, species, status } = this.props.data;
        return (
            <Link to={{ pathname: `/character/${id}` }}>  <Card className="char-card" style={{height:"100%"}}>
                <CardContent> <div >
                    <figure className="item-thumb-wrap">
                        <img
                            src={image}
                            alt={name}
                            className="item-thumb-image"
                        />
                    </figure>
                </div>
                    <div className="character-desc">
                        <h2 className="character-item__title">{name}</h2>
                        <span className={`${status === "Alive" ? "alive" : `${status === "Dead" ? "dead" : ""}`}`}>●</span>{" " + status}

                        <p>{species}</p>
                    </div>
                </CardContent></Card></Link>
        );
    }
}

export default Character;
