import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';

const ImageListRow = ({ image, index, deleteItemListUpdate }) => {
  return (
    <tr>
      <th scope="row" style={{verticalAlign:'middle'}}>{index}</th>
      <td><Link to={`/image/${image.id}`}><img src={image.display_sizes[2].uri} className="img-thumbnail" /></Link></td>
      <td style={{verticalAlign:'middle'}}>{image.title}</td>
      <td style={{verticalAlign:'middle'}}>{image.artist}</td>
      <td style={{verticalAlign:'middle', width:'30px'}}>
        <input type="checkbox" onChange={deleteItemListUpdate} />
      </td>
    </tr>
  );
};

ImageListRow.propTypes = {
  image: PropTypes.object.isRequired
};

export default ImageListRow;
