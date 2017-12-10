import React from 'react';
import { getServiceUrl, getDomain } from '../../servicelocator.js';
import PropTypes from 'prop-types';

export default class CommentsDisabled extends React.Component {
  render() {
    const iStyle = {
      width: '100%',
      height: '230px',
      border: 'none',
    };

    const frameUrl =
      `${getServiceUrl('core')}/edit?comment_article=${encodeURIComponent(window.location.href)}`;
    if (this.props.isAuthor) {
      return <iframe src={frameUrl} style={iStyle} />;
    }
    // do not open iframe if it isn't author
    return (
      <div>
        <ul className="breadcrumb" id="Comments">
          <li className="active">Comments</li>
        </ul>
        <div className="well enable-comment text-left">
          <h4>Comments disabled</h4>
          <p>Comments haven't been enabled by author.</p>
        </div>
      </div>
    );
  }
}

CommentsDisabled.propTypes = {
  isAuthor: PropTypes.bool,
};
