import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('body');
class MovieRow extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
/**
 * Funstions modal
 */
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //  this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
/**
 * end Funstions modal
 */

  render() {
    return <table id="row" key={this.props.movie.id}>
      <tbody>
        <tr>
          <td>
            <img alt="poster" width="120" src={this.props.movie.poster_src} />
          </td>
          <td>
            <h3>{this.props.movie.title}</h3>
            <p><b>Release Date</b> - {this.props.movie.release_date}</p>
            <p><b>Genre</b>: {this.props.movie.genre}</p>
            
    
            <button onClick={this.openModal}>Details</button>

          </td>
        </tr>
      </tbody>

      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <tbody>
          <tr>
            <td>
              <img alt="poster" width="120" src={this.props.movie.poster_src} />
            </td>
            <td  >
              <h4>{this.props.movie.title}</h4>
              <p>{this.props.movie.genre}</p>
              <p><b>Release Date</b> - {this.props.movie.release_date}</p>
              <p><b>Genre</b>: {this.props.movie.genre}</p>
              <p>{this.props.movie.overview}</p>
              <button onClick={this.closeModal}>close</button>
            </td>
          </tr>


        </tbody>

      </Modal>
    </table>

  }
}

export default MovieRow