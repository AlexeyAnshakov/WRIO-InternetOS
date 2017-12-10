import React from 'react';
import { titleChange, descChange, urlChange, closeDialog } from '../actions/imagedialog';
import EntityDialog from '../components/EntityDialog';
import mkActions from '../actions/indexActions';
import { connect } from 'react-redux';

const { createNewImage, editImage, removeEntity } = mkActions('MAIN');

function mapStateToProps(state) {
  const {
    showDialog,
    titleValue,
    urlValue,
    descValue,
    linkEntityKey,
    previewBusy,
  } = state.imageDialog;
  return {
    showDialog,
    previewBusy,
    titleValue,
    urlValue,
    descValue,
    linkEntityKey,
    showTitle: true, // customize settings
    showDescription: true, // customize settings
    isEditLink: false,
  };
}

// dispatch according actions

const mapDispatchToProps = dispatch => ({
  onTitleChange: v => dispatch(titleChange(v)),
  onDescChange: v => dispatch(descChange(v)),
  onUrlChange: v => dispatch(urlChange(v)),

  onRemoveLink: (key) => {
    dispatch(removeEntity(key));
    dispatch(closeDialog());
  },
  onCancelLink: () => dispatch(closeDialog()),
  onConfirmLink: (titleValue, urlValue, descValue) => {
    dispatch(createNewImage(titleValue, urlValue, descValue));
    dispatch(closeDialog());
  },
  onEditLink: (titleValue, urlValue, descValue, linkEntityKey) => {
    dispatch(editImage(titleValue, urlValue, descValue, linkEntityKey));
    dispatch(closeDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityDialog);
