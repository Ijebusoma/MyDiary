import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import EntryList from './EntryList';
import { getNotes, saveNote } from '../actions/entryAction';
import { logoutUser } from '../actions/authAction';
import Navbar from './HeaderComponents/Navbar'
/**
 * @classdesc Sign in users
 */
class UserDashboard extends Component {
  /**
 * @param {props} props Representing some data passed down
 */
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      message:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  /**
   * @param {event} event
   * @returns { null} null
   */
  onLogoutClick(event) {
    event.preventDefault();
   
    this.props.logoutUser(this.props.history);
  }

  /**
   * @param {event} event
   * @returns { null} null
   */
  addNote(event) {
    event.preventDefault();
    const note  = this.state.note.trim();
    console.log(note);
    if(note !== ''){
    this.props.saveNote(this.state.note, this.props.history);
    }else{
      this.setState({
        message: 'You have not entered anything bro'
      })
    }
  }

  /**
   * @param {event} event
   * @returns { null} null
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /** Lifecycle method - After component mounts
   * @param {null} null
   * @returns { null} null
   */
  componentDidMount() {
    this.props.getNotes();
   /**  this.hamburger = document.getElementById('hamburger');
    this.close = document.getElementById('close');
    this.menu = document.getElementById('Sidenav');
    this.close.addEventListener('click', () => {
      this.menu.style.width = 0;
    });
    this.hamburger.addEventListener('click', () => {
      this.menu.style.width = '200px';
    });**/
  }


  /**
 *Renders web page
 * @returns {Webpage} Displays the webpage
 */
  render() {
    return (

      <div>
       <Navbar />
          <div className="container fluid">
                <div className="col-md-12">
                <form onSubmit={ this.addNote } >
                {this.state.message && <p className="note-text">{this.state.message}</p> }
                <br></br>
<textarea placeholder="What's on your mind?" name="note" cols="30" rows="5" onChange={this.handleChange}/>
<br />
<input type="submit" value="Add new" ></input>
                  
               
                </form>
                </div>


                 </div>

                 <center><h3 className="clearfix">My Notes</h3></center>
                 <hr />
                 <div className="container fluid">
                 {this.props.entries.entries.map(entry => (
<EntryList entry={ entry } key={entry.id } />
                 ))}

            </div>

      </div>
    );
  }
}
UserDashboard.propTypes = {
  getNotes: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  entries: state.entries
});

export default connect(mapStateToProps,
  { logoutUser, getNotes, saveNote })(withRouter(UserDashboard));
