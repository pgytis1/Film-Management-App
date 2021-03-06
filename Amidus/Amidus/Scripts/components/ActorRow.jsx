import React from 'react';

class ActorRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            fullName: ''

        };

        this.editActor = this.editActor.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.removeActor = this.removeActor.bind(this);
    }

    componentDidMount(){
        this.setState({
            fullName: this.props.actor.fullName
        });
    }

    editActor(){
        this.setState({
            isEditMode: !this.state.isEditMode
        });
        if(this.state.isEditMode){
            this.props.actor.fullName = this.state.fullName;
            this.props.updateActor(this.props.actor.id, this.state.fullName);
        }
        
    }

    handleFullNameChange(event){
        this.setState({
            fullName: event.target.value
        });
    }

    removeActor(){
        console.log(this.props.film.id);
        this.props.removeActor(this.props.film.id, this.props.actor.id)
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td>
                        {this.state.isEditMode? null : this.props.actor.fullName}
                        <input className={this.state.isEditMode? "form-control": ""} hidden={this.state.isEditMode? false: true} type="text" value={this.state.fullName} onChange={this.handleFullNameChange}/>
                    </td>
                    <td>
                        <button className="btn btn-default" onClick={this.editActor}>{this.state.isEditMode? "Save":"Edit"}</button>
                    </td>
                    <td>
                        <button className="btn btn-danger"  onClick={this.removeActor}>{this.state.isEditMode? "Remove":"Remove"}</button>
                    </td>
                </tr>
            </tbody>  
        )
    }
}

export default ActorRow;