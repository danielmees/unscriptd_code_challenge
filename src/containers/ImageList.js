import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import ImageListRow from '../components/ImageListRow';
import TextInput from '../components/TextInput';

class ImageList extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      searchParam: '',
      searchValid: true,
      deleteImageIdList: [],
      warnMessage: '',
      successMessage: '',
    }
  }

  componentWillMount() {
    const self = this;
    axios.get('http://localhost:3010/images')
      .then(function (response) {
        self.setState({ images: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateSearchParam (event) {
    const self = this;
    self.setState({ searchParam: event.target.value });
  }

  search () {
    const self = this;
    self.setState({ searchValid: true });
    axios.get(`http://localhost:3010/images/?caption_like=${this.state.searchParam}`)
      .then(function (response) {
        self.setState({ images: response.data }, () => {
          if (self.state.images.length === 0) {
            self.setState({ searchValid: false });
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteItemListUpdate (event, imageId) {
    const self = this;
    self.setState({ warnMessage : '', successMessage: '' });
    const deleteImageIdList = self.state.deleteImageIdList;
    if (event.target.checked) {
      deleteImageIdList.push(imageId);
    } else {
      const index = deleteImageIdList.indexOf(imageId);
      deleteImageIdList.splice(index, 1);
    }
    self.setState({ deleteImageIdList });
  }

  deleteImages () {
    const self = this;
    self.setState({ warnMessage : '', successMessage: '' });
    if (self.state.deleteImageIdList.length === 0) {
      self.setState({ warnMessage : 'Please select some images to delete.' });
    } else {
      self.state.deleteImageIdList.forEach((imageId) => {
        axios.delete(`http://localhost:3010/images/${imageId}`)
          .then(function (response) {
            self.setState({ successMessage: 'Images deleted successfully.' }, () => {
              const deleteImageIdList = self.state.deleteImageIdList;
              const index = deleteImageIdList.indexOf(imageId);
              deleteImageIdList.splice(index, 1);
              self.setState({ deleteImageIdList });

              axios.get('http://localhost:3010/images')
                .then(function (responseget) {
                  self.setState({ images: responseget.data });
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }

  render() {
    return (
      <div className="container" style={{padding:'50px'}}>
        <h1 className="text-center">Images</h1>
        <div className="form-group form-group-lg col-sm-8">
          <TextInput
            name=""
            label=""
            className="input-lg"
            value={this.state.searchParam}
            onChange={(event) => { this.updateSearchParam(event) }}
          />
        </div>
        <button type="button" onClick={() => this.search()} className="btn btn-info btn-lg" style={{marginTop:'20px'}}>
            <span className="glyphicon glyphicon-search"></span> Search
        </button>
        <table className="table table-hover text-center">
          <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Image</th>
            <th className="text-center">Title</th>
            <th className="text-center">Artist</th>
            <th className="text-center">&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {!this.state.searchValid &&
            <tr>
              <td colSpan="5" className="text-center" style={{fontSize:'20px'}}>No result found!</td>
            </tr>
          }
          {this.state.images.map(image =>
            <ImageListRow
              key={image.id} image={image}
              index={this.state.images.indexOf(image) + 1}
              deleteItemListUpdate={(event) => this.deleteItemListUpdate(event, image.id)}
            />
          )}
          </tbody>
        </table>
        <button type="button"
          className="btn btn-danger btn-lg"
          onClick={() => this.deleteImages()}
        >Delete</button>
        <div style={{display:'inline-block', color:'red', marginLeft:'50px'}}>{this.state.warnMessage}</div>
        <div style={{display:'inline-block', marginLeft:'50px'}}>{this.state.successMessage}</div>
      </div>
    );
  }
}

ImageList.propTypes = {
};

export default ImageList;
