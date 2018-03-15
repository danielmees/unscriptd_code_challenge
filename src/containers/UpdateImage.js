import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';

class UpdateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      artist: '',
      caption: '',
      dateCreated: '',
      displaySizes: [],
      url: '',
      title: '',
      success: false,
    }
  }

  componentWillMount() {
    const self = this;
    const { match } = this.props;
    axios.get(`http://localhost:3010/images/${match.params.imageId}`)
      .then(function (response) {
        self.setState({
          id: response.data.id,
          artist: response.data.artist,
          caption: response.data.caption,
          dateCreated: response.data.date_created,
          displaySizes: response.data.display_sizes,
          url: response.data.display_sizes[0].uri,
          title: response.data.title,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateImageInfo(event, type) {
    if (type === 'title') {
      this.setState({ title: event.target.value });
    } else {
      this.setState({ caption: event.target.value });
    }
  }

  editImage(event) {
    const self = this;
    event.preventDefault();
    self.setState({ success: false });
    axios.put(`http://localhost:3010/images/${this.state.id}`, {
        artist: this.state.artist,
        caption: this.state.caption,
        date_created: this.state.dateCreated,
        display_sizes: this.state.displaySizes,
        title: this.state.title,
    })
    .then(function (response) {
      self.setState({ success: true });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="container" style={{padding:'50px'}}>
        <h1 className="text-center">Update Image</h1>
        <div className="text-center">
          <img src={this.state.url} />
        </div>
        <form>
          <TextInput
            name="artist"
            label="Artist"
            disabled
            value={this.state.artist}
          />

          <TextInput
            name="dateCreated"
            label="Date Created"
            disabled
            value={this.state.dateCreated.slice(0, this.state.dateCreated.indexOf('T'))}
          />

          <TextInput
            name="title"
            label="Title"
            value={this.state.title}
            onChange={(event) => { this.updateImageInfo(event, 'title') }}
            error=''/>

          <TextArea
            name="caption"
            label="Caption"
            value={this.state.caption}
            onChange={(event) => { this.updateImageInfo(event, 'caption') }}
            error=''/>

          {this.state.success &&
            <div className="text-center" style={{marginBottom:'10px'}}>Image information updated successfully.</div>
          }

          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={(event) => this.editImage(event)}
            >Edit</button>

            <button
              className="btn btn-warning"
              style={{marginLeft:'5px'}}
              onClick={() => this.props.history.push('/') }
            >Back</button>
          </div>
        </form>
      </div>
    );
  }
}

UpdateImage.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(UpdateImage);
