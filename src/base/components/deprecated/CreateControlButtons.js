import React from "react";
import UIActions from "../actions/UI.js";
import PlusActions from "../../widgets/Plus/actions/PlusActions.js";
import normURL from "../../widgets/Plus/utils/normURL";
import UrlMixin from "../mixins/UrlMixin";
import PropTypes from "prop-types";

export default class CreateControlButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editAllowed: false
    };
  }

  componentWillMount() {
    UIActions.gotProfileUrl.listen(author => {
      if (
        UrlMixin.fixUrlProtocol(author) ==
        UrlMixin.fixUrlProtocol(this.props.author)
      ) {
        this.setState({
          editAllowed: true
        });
      }
    });
  }

  onCloseClick() {
    var url = window.location.href;
    var parentUrl = this.props.author.url
      ? normURL(this.props.author.url)
      : undefined;
    parentUrl ? PlusActions.del(parentUrl, url) : PlusActions.del(url);
  }

  onEditClick() {
    UIActions.switchToEditMode({
      editMode: true
    });
  }

  render() {
    return (
      <div className="margin-bottom">
        {this.state.editAllowed ? (
          <button
            type="button"
            onClick={this.onEditClick}
            className="btn btn-default btn-block"
          >
            <span className="glyphicon glyphicon-pencil" />Edit
          </button>
        ) : (
          ""
        )}
        {/*<button type="button" className="btn btn-success btn-block"><span className="glyphicon glyphicon-plus"></span>Added</button>*/}
        <button
          type="button"
          onClick={this.onCloseClick.bind(this)}
          className="btn btn-default btn-block"
        >
          <span className="glyphicon glyphicon-remove" />Close
        </button>
      </div>
    );
  }
}

CreateControlButtons.propTypes = {
  article: PropTypes.object.isRequired,
  author: PropTypes.string.isRequired
};
