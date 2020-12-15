import React from 'react'
import PropTypes from 'prop-types'
import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

const AddJobEditor = ({ requirement, description, benefit, setRequirment, setDescription, setBenefit }) => {
  const onEditorRequirment = (editorState) => {
    setRequirment(editorState)
  }

  const onEdiorDescription = (editorState) => {
    setDescription(editorState)
  }

  const onEditorBenefit = (editorState) => {
    setBenefit(editorState)
  }
  return (
    <>
      <div className="border border-solid border-gray-300 p-2 flex flex-col my-4">
        <h3 className="font-bold">Requirment Skill and Experience</h3>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorRequirment}
          // initialContentState={requirement}
        />
      </div>
      {/* Description  */}
      <div className="border border-solid border-gray-300 p-2">
        <h3 className="font-bold">Description</h3>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEdiorDescription}
        />
      </div>
      {/* Benefit */}
      <div className="border border-solid border-gray-300 p-2 my-4">
        <h3 className="font-bold">Benefit</h3>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorBenefit}
        />
      </div>
    </>
  )
}

AddJobEditor.propTypes = {
  requirment: PropTypes.objectOf(PropTypes.any),
  description: PropTypes.objectOf(PropTypes.any),
  benefit: PropTypes.objectOf(PropTypes.any),
  setRequirment: PropTypes.func,
  setDescription: PropTypes.func,
  setBenefit: PropTypes.func,
}
export default AddJobEditor
