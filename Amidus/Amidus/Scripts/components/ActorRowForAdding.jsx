import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ActorRowForAdding extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <label><Checkbox value={this.props.actor.id}/> {this.props.actor.fullName}</label>
            </div>  
        )
    }
}

export default ActorRowForAdding;