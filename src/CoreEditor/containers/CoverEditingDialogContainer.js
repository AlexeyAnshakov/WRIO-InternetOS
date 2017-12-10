import React from 'react';
import { connect } from 'react-redux';
import { closeCoverDialog, newCover, coverTabChange, coverTabDelete } from '../actions/coverDialog';
import CoverEditingDialog from '../components/CoverEditingDialog';

import mkEditorActions from '../actions/indexActions';
import { saveCovers } from '../actions/coverDialog';
import { openImageDialog } from '../actions/imagedialog';
import { openLinkDialog } from '../actions/linkdialog';

function mapStateToProps(state) {
  const { showDialog } = state.coverDialog;
  return {
    showDialog,
    imageUrl: state.coverDialog.tab.imageUrl,
    editorState: state.coverDialog.tab.editorState,
    tabs: state.coverDialog.tabs,
    tab: state.coverDialog.tab,
  };
}

// dispatch according actions

const mapDispatchToProps = (dispatch, getState) => {
  const { editorChanged } = mkEditorActions('COVEREDITOR_'); // map action name to particular editor name
  return {
    imageUrlChange: url => dispatch({ type: 'COVER_DIALOG_IMAGE_URL_CHANGED', url }),
    onCloseDialog: () => {
      dispatch(closeCoverDialog());
    },
    onSaveCover: (editorState, imageUrl) => dispatch(saveCovers(editorState, imageUrl)),
    openLinkDialog: (...args) => dispatch(openLinkDialog(...args)),
    openImageDialog: (...args) => dispatch(openImageDialog(...args)),
    editorChanged: state => dispatch(editorChanged(state)),
    onCoverTabChange: (...args) => dispatch(coverTabChange(...args)),
    onCoverTabDelete: (...args) => dispatch(coverTabDelete(...args)),
    onNewCover: (...args) => dispatch(newCover(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoverEditingDialog);
