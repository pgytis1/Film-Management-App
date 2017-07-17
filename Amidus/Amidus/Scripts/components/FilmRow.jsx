import React from 'react';
import ActorRow from './ActorRow';
import ActorRowForAdding from './ActorRowForAdding';
import Modal from 'react-modal';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { connect } from 'react-redux';
import { getAllActors } from '../actions';


class FilmRow extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
      modalIsOpen: false,
      modalIsOpen2: false,
      editMode: false,
      title: '',
      date: '',
      ids: [],
      selectedGenre: 'None',
      actorSearchQuery: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.editFilm = this.editFilm.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.deleteFilm = this.deleteFilm.bind(this);
    this.handleIdsCheck = this.handleIdsCheck.bind(this);
    this.checkIfActorIsAlreadyAdded = this.checkIfActorIsAlreadyAdded.bind(this);
    this.addMoreActors = this.addMoreActors.bind(this);
    this.handleSelectGenre = this.handleSelectGenre.bind(this);
    this.handleActorSearchQuery = this.handleActorSearchQuery.bind(this);
    }

    componentDidMount(){
        this.setState({
            selectedGenre: this.props.film.genre,
            title: this.props.film.title,
            date: this.props.film.publishDate.slice(0, 10)
        });
    }

    openModal() {
        this.props.dispatch(getAllActors());
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openModal2() {
        this.checkIfActorIsAlreadyAdded();
        this.setState({modalIsOpen2: true});
    }

    closeModal2() {
        this.setState({modalIsOpen2: false});
    }

    editFilm(){
        this.setState({
            editMode: !this.state.editMode
        });
        if(this.state.editMode){
            this.props.film.title = this.state.title;
            this.props.film.genre = this.state.selectedGenre;
            this.props.film.publishDate = this.state.date;
            this.props.updateFilm(this.props.film);
        }
        
    }

    handleTitleChange(event){
        this.setState({
            title: event.target.value
        });
    }

    handleDateChange(event){
        this.setState({
            date: event.target.value
        });
    }

    deleteFilm(){
        this.props.deleteFilm(this.props.film.id);
    }

    handleIdsCheck(newIds) {
        this.setState({
             ids: newIds
        });
    }

    checkIfActorIsAlreadyAdded(){

        var actorsForAdd = [];
        for (var i = 0; i < this.props.actors.length; i++) {
            var isFound = false;
            for(var j = 0; j < this.props.film.actors.length; j++){
                if(this.props.actors[i].id == this.props.film.actors[j].id){
                    isFound = true;
                }
            }
            if(!isFound){
               actorsForAdd.push(this.props.actors[i]);
            }
        }

        return actorsForAdd;
    }

    addMoreActors(){
        this.setState({
            ids : []
        })
        this.props.addMoreActors(this.props.film.id, this.state.ids);
    }

    handleSelectGenre(event){
         this.setState({ 
            selectedGenre: event.target.value
         });
        
    }
    
    handleActorSearchQuery(event){
        this.setState({
            actorSearchQuery: event.target.value
        });
        this.props.dispatch(getAllActors(event.target.value));
    }

    render() {
        return (
                <tr >
                    <td>
                        {this.state.editMode? null : this.props.film.title}
                        <input className={this.state.editMode? "form-control": ""} hidden={this.state.editMode? false: true}
                               type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                    </td>
                    <td>
                        {this.state.editMode? null : this.props.film.publishDate.slice(0, 10)}
                        <input className={this.state.editMode? "form-control": ""} hidden={this.state.editMode? false: true}
                               type="date" value={this.state.date} onChange={this.handleDateChange}/>
                    </td>
                    <td>
                        {this.state.editMode? null : this.props.film.genre}
                        <select className={this.state.editMode? "form-control": ""} hidden={this.state.editMode? false: true}
                                name="sort" onChange={this.handleSelectGenre} value={this.state.selectedGenre}>
                                <option value="None" >Choose Genre</option>
                                {this.props.genres.map((genre, i) => 
                                    <option key={i} value={genre} >{genre}</option>
                                )}
                        </select>
                    </td>
                    <td>
                        <button onClick={this.openModal}>Show Actors</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Actors"
                        >
                        <table>
                            {this.props.film.actors.map((actor, i) =>
                                <ActorRow
                                        actor={actor}
                                        film={this.props.film}
                                        key={actor.id}
                                        removeActor={this.props.removeActor}
                                        updateActor={this.props.updateActor}
                                /> )}
                        </table>

                            <div>
                            <button onClick={this.openModal2}>Add More Actors</button>
                            </div>
                            <Modal
                            isOpen={this.state.modalIsOpen2}
                            onRequestClose={this.closeModal2}
                            style={customStyles}
                            contentLabel="Choose Actors"
                            >
                             
                             <input className="form-control"
                                       type="text"
                                       value={this.state.actorSearchQuery}
                                       onChange={this.handleActorSearchQuery}
                                       required
                                       placeholder="Enter Actor's Name"
                              />

                             <CheckboxGroup
                                name="ids"
                                value={this.state.ids}
                                onChange={this.handleIdsCheck}>

                                {
                                    this.checkIfActorIsAlreadyAdded().map((actor, i) =>
                                    <ActorRowForAdding
                                            actor={actor}
                                            key={actor.id}
                                    /> )}
                             </CheckboxGroup>
                            

                            <button className="btn btn-default" onClick={this.closeModal2}>Finish</button>

                            </Modal>
                    
                    <button className="btn btn-default" onClick={this.addMoreActors}>Save</button>
                    <button className="btn btn-default" onClick={this.closeModal}>Close</button>

                    </Modal>
                    </td>
                    <td>
                        <button className="btn btn-default" onClick={this.editFilm}>{this.state.editMode? "Save":"Edit"}</button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.deleteFilm}>Delete</button>
                    </td>
                </tr>  

        )
    }
}

function mapStateToProps(state) {
    return {
        actors: state.actors,
        genres: state.genres
    };
}

FilmRow = connect(mapStateToProps)(FilmRow);

export default FilmRow;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    height                : '550px',
    width                : '450px'
  }
};