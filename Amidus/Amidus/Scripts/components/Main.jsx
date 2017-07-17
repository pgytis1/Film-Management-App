import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

import FilmRow from './FilmRow';
import ActorRowForAdding from './ActorRowForAdding';
import ActorRow from './ActorRow';
import MainActorRowForEdit from './MainActorRowForEdit';

import { fetchFilms } from '../actions';
import { updateFilm } from '../actions';
import { deleteFilm } from '../actions';
import { removeActor } from '../actions';
import { updateActor } from '../actions';
import { postMovie } from '../actions';
import { getAllActors } from '../actions';
import { addFilmActors } from '../actions';
import { getGenres } from '../actions';
import { postActor } from '../actions';
import { deleteActor } from '../actions';



class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortBy: 'None',
            currentPage: 1,
            query: '',
            dateFrom: '',
            dateTo: '',
            modalIsOpen: false,
            modalIsOpen2: false,
            title: '',
            date: '',
            ids: [],
            selectedGenre: 'None',
            fullName: '',
            actorSearchQuery: ''
        }

        this.handleSubmitActor = this.handleSubmitActor.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSelectSort = this.handleSelectSort.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.deleteFilm = this.deleteFilm.bind(this);
        this.removeActor = this.removeActor.bind(this);
        this.handleActorUpdate = this.handleActorUpdate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);
        this.openModal2 = this.openModal2.bind(this);
        this.handleNewMovieTitleChange = this.handleNewMovieTitleChange.bind(this);
        this.handleNewMovieDateChange = this.handleNewMovieDateChange.bind(this);
        this.handleNewMovieGenreChange = this.handleNewMovieGenreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdsCheck = this.handleIdsCheck.bind(this);
        this.addMoreActors = this.addMoreActors.bind(this);
        this.handleSelectGenre = this.handleSelectGenre.bind(this);
        this.getGenres = this.getGenres.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
        this.handleNewActorFullNameChange = this.handleNewActorFullNameChange.bind(this);
        this.handleActorSearchQuery = this.handleActorSearchQuery.bind(this);
        this.deleteActor = this.deleteActor.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchFilms(this.state.query, this.state.sortBy,
                                       this.state.currentPage, this.state.dateFrom, this.state.dateTo, this.state.selectedGenre));
        this.props.dispatch(getGenres());
    }

    handlePageChange(event){
        this.setState({ currentPage: event.selected+1 });
        this.props.dispatch(fetchFilms(this.state.query, this.state.sortBy,
                                           event.selected+1, this.state.dateFrom, this.state.dateTo, this.state.selectedGenre));
    }

    handleSelectSort(event) {
        this.setState({ 
            sortBy: event.target.value,
            currentPage: 1
         });
        this.props.dispatch(fetchFilms(this.state.query, event.target.value, 1, this.state.dateFrom,
                                       this.state.dateTo, this.state.selectedGenre));
    }

    handleSearch(event) {
        this.setState({ 
            query: event.target.value,
            currentPage: 1
         });
        this.props.dispatch(fetchFilms(event.target.value, this.state.sortBy, 1, this.state.dateFrom,
                                       this.state.dateTo, this.state.selectedGenre));
    }

    handleUpdate(film) {
        this.props.dispatch(updateFilm(film, this.state.query, this.state.sortBy,
                                           this.state.currentPage, this.state.dateFrom, this.state.dateTo, this.state.selectedGenre));
    }

    handleActorUpdate(id, fullName) {
        this.props.dispatch(updateActor(id, fullName));
    }

    deleteFilm(id){
        this.props.dispatch(deleteFilm(id, this.state.query, this.state.sortBy, this.state.currentPage,
                                       this.state.dateFrom, this.state.dateTo, this.state.selectedGenre));
    }

    removeActor(movieId, actorId){
        this.props.dispatch(removeActor(movieId, actorId, this.state.query, this.state.sortBy, this.state.currentPage,
                                        this.state.dateFrom, this.state.dateTo, this.state.selectedGenre));
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    openModal() {
        this.props.dispatch(getAllActors(this.state.actorSearchQuery));
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal2() {
        this.setState({
            modalIsOpen2: false
        });
    }

    openModal2() {
        this.props.dispatch(getAllActors(this.state.actorSearchQuery));
        this.setState({
            modalIsOpen2: true
        });
    }


    handleNewMovieTitleChange(event) {
         this.setState({title: event.target.value});
    }

    handleNewMovieDateChange(event) {
        this.setState({date: event.target.value});
    }

    handleNewMovieGenreChange(event) {
         this.setState({genre: event.target.value});
    }
    
    handleNewActorFullNameChange(event) {
         this.setState({fullName: event.target.value});
    }

    handleSubmit() {
        this.props.dispatch(postMovie(this.state.title, this.state.date, this.state.genre, this.state.ids, this.state.query,
                                      this.state.sortBy, this.state.currentPage, this.state.dateFrom,
                                      this.state.dateTo, this.state.selectedGenre));
        this.setState({
            title: '',
            date: '',
            genre: ''
        });
    }

    handleIdsCheck(newIds) {
        this.setState({
             ids: newIds
        });
    }

    addMoreActors(filmId, actorIds){
        this.props.dispatch(addFilmActors(filmId, actorIds, this.state.query, this.state.sortBy,
                                          this.state.currentPage, this.state.dateFrom, this.state.dateTo,
                                          this.state.selectedGenre));
    }

    handleSelectGenre(event){
         this.setState({ 
            selectedGenre: event.target.value,
            currentPage: 1
         });
        this.props.dispatch(fetchFilms(this.state.query, this.state.sortBy, this.state.currentPage,
                                       this.state.dateFrom, this.state.dateTo, event.target.value));
    }

    getGenres(){
        this.props.dispatch(getGenres());
    }

    handleDateFromChange(event) {
        this.setState({dateFrom: event.target.value});
        this.props.dispatch(fetchFilms(this.state.query, this.state.sortBy, this.state.currentPage,
                                       event.target.value, this.state.dateTo, this.state.selectedGenre));
    }

    handleDateToChange(event) {
        this.setState({dateTo: event.target.value});
        this.props.dispatch(fetchFilms(this.state.query, this.state.sortBy, this.state.currentPage,
                                       this.state.dateFrom, event.target.value, this.state.selectedGenre));
    }

    handleSubmitActor(){
        this.props.dispatch(postActor(this.state.fullName));
        this.setState({
            fullName: ''
        });
    }

    handleActorSearchQuery(event){
        this.setState({
            actorSearchQuery: event.target.value
        });
        this.props.dispatch(getAllActors(event.target.value));
    }

    deleteActor(id){
        this.props.dispatch(deleteActor(id, this.state.actorSearchQuery, this.state.query, this.state.sortBy,
                                           event.selected+1, this.state.dateFrom, this.state.dateTo, this.state.selectedGenre));
    }

    render() {
        return (
            <div className="">         

                <nav className="navbar navbar-default">
                    
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul className="nav navbar-nav">
                        <li className="navbar-form navbar-left">
                            
                            <select className="btn btn-default dropdown-toggle" name="sort" onChange={this.handleSelectSort} value={this.state.sortBy}>
                                <option value="None" >Sort by</option>
                                <option value="Title_Asc" >Title A-Z</option>
                                <option value="Title_Desc" >Title Z-A</option>
                                <option value="Date_Asc" >Date A-Z</option>
                                <option value="Date_Desc" >Date Z-A</option>
                            </select>
                        </li>
                        <li className="navbar-form navbar-left">
                            
                            <select className="btn btn-default dropdown-toggle" name="sort" onChange={this.handleSelectGenre} value={this.state.selectedGenre}>
                                <option value="None" >Choose Genre</option>
                                {this.props.genres.map((genre, i) => 
                                    <option key={i} value={genre} >{genre}</option>
                                )}
                            </select>
                        </li>
                        <li className="navbar-form navbar-left">
                            Start Release Date:
                            <input className="form-control"
                                    type="date"
                                    value={this.state.dateFrom}
                                    onChange={this.handleDateFromChange}
                                    required
                            />
                        </li>
                        <li className="navbar-form navbar-left">
                            End Release Date:
                            <input className="form-control"
                                    type="date"
                                    value={this.state.dateTo}
                                    onChange={this.handleDateToChange}
                                    required
                            />
                        </li>
                        </ul>

                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <input className="form-control" onChange={this.handleSearch} placeholder="Enter Movie title" type="text" />
                            </div>
                        </form>
                        
                    
                    </div>{/* /.navbar-collapse */}
                    </div>{/* /.container-fluid */}
                </nav>

                <table className="table">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Release date</th>
                            <th>Genre</th>
                            <th>Actors</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    
                    {this.props.films.map((film, i) =>
                        <FilmRow
                            film={film}
                            nr={i}
                            key={film.id}
                            updateFilm = {this.handleUpdate}
                            deleteFilm = {this.deleteFilm}
                            removeActor = {this.removeActor}
                            updateActor = {this.handleActorUpdate}
                            addMoreActors = {this.addMoreActors}
                        />
                    )}
                    </tbody>        
                </table>

                <ReactPaginate
                    pageCount={this.props.pagingInfo.totalPages}
                    marginPagesDisplayed={this.props.pagingInfo.marginPagesDisplayed}
                    pageRangeDisplayed={this.props.pagingInfo.visiblePages}
                    onPageChange={this.handlePageChange}
                    initialPage={0}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    breakLabel={<a>...</a>}
                    breakClassName={"break-me"}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                />
                
                <div className="">
                <div className="nav navbar-nav navbar-left" >
                <div className="navbar navbar-default">
                <label>Add New Actor</label>
                    

                <form onSubmit={this.handleSubmitActor}>         
                        Full Name:
                        <input className="form-control"
                                type="text"
                                value={this.state.fullName}
                                onChange={this.handleNewActorFullNameChange}
                                required
                            />
                    
                    <input className="form-control" type="submit" value="Send" 
                            className="btn btn-default"       
                    />
                </form>
                </div>
                </div>
                </div>
                
                <div>
                    <button onClick={this.openModal2}>Edit Actors</button>
                </div>

                <Modal
                isOpen={this.state.modalIsOpen2}
                onRequestClose={this.closeModal2}
                style={customStyles}
                contentLabel="Edit Actors"
                >
                
                    <input className="form-control"
                                       type="text"
                                       value={this.state.actorSearchQuery}
                                       onChange={this.handleActorSearchQuery}
                                       required
                                       placeholder="Enter Actor's Name"
                    />
                    <table>
                        {this.props.actors.map((actor, i) =>
                            <MainActorRowForEdit
                                    actor={actor}
                                    key={actor.id}
                                    deleteActor={this.deleteActor}
                                    updateActor={this.handleActorUpdate}
                            /> )
                        }
                    </table>
                
                
                   <button className="btn btn-default" onClick={this.closeModal2}>Finish</button>

                </Modal>

                <div className="container-fluid">
                <div className="nav navbar-nav navbar-right" >
                <div className="navbar navbar-default">
                
                <label>Add New Movie</label>
                <br/>
                    Actors:
                <div>
                    <button onClick={this.openModal}>Choose Actors</button>
                </div>

                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
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

                    {this.props.actors.map((actor, i) =>
                        <ActorRowForAdding
                                actor={actor}
                                key={actor.id}
                        /> )}
                   </CheckboxGroup>
                
                
                   <button className="btn btn-default" onClick={this.closeModal}>Finish</button>

                </Modal>
                <form onSubmit={this.handleSubmit}>         
                                Title:
                                <input className="form-control"
                                       type="text"
                                       value={this.state.title}
                                       onChange={this.handleNewMovieTitleChange}
                                       required
                                 />
                            
                                Release Date:
                                <input className="form-control"
                                       type="date"
                                       value={this.state.date}
                                       onChange={this.handleNewMovieDateChange}
                                       required
                                />
                            
                                Genre:
                                <select className="form-control"
                                        name="sort" onChange={this.handleNewMovieGenreChange} value={this.state.genre}>

                                        <option value="None" >Choose Genre</option>
                                        {this.props.genres.map((genre, i) => 
                                            <option key={i} value={genre} >{genre}</option>
                                        )}

                                </select>

                            
                            <input className="form-control" type="submit" value="Send" 
                                    className="btn btn-default"       
                           />
                        </form>
                        </div>
                        </div>
                        </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        films: state.films,
        pagingInfo: state.pagingInfo,
        actors: state.actors,
        genres: state.genres
    };
}

Main = connect(mapStateToProps)(Main);

export default Main;

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