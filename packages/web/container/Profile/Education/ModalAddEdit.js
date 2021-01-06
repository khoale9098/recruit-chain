import React from 'react'
import { useMutation, gql } from '@apollo/client'
import moment from 'moment'
import PropTypes from 'prop-types'
import { pickBy, identity } from 'lodash'
import { Modal, Form, Input, Button, DatePicker, message } from 'antd'

const CREATE_EDUCATION = gql`
  mutation createEducation($educationInput: EducationInput!) {
    createEducation(educationInput: $educationInput) {
      _id
    }
  }
`
const UPDATE_EDUCATION = gql`
  mutation updateEducation($educationInput: EducationInput!, $educationId: ID!) {
    updateEducation(educationInput: $educationInput, educationId: $educationId) {
      _id
    }
  }
`

const FIELD_EDUCATION = {
  SUMMARY: 'summary',
  EDUCATION_ORG: 'education_org',
  DEGRESS: 'degree',
  MEDIA: 'media',
  FIELD_OF_STUDY: 'field_of_study',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
}

const ModalAddEdit = ({ show, cancel, education, isEdit, refetch }) => {
  const [form] = Form.useForm()
  const [createEducation, { loading }] = useMutation(CREATE_EDUCATION, {
    onCompleted() {
      refetch()
    },
  })

  const [updateEducation, { loading: loadingUpdated }] = useMutation(UPDATE_EDUCATION, {
    onCompleted() {
      refetch()
      message.success('Update Successful!')
    },
  })

  const onSubmit = async (values) => {
    const inputValues = pickBy(values, identity)

    if (isEdit) {
      await updateEducation({ variables: { educationInput: inputValues, educationId: education?._id } })
    } else {
      await createEducation({ variables: { educationInput: inputValues } })
    }
  }

  return (
    <Modal title="Education" visible={show} onCancel={cancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          ...education,
          ...(education?.startDate && {
            startDate: moment(education.startDate),
          }),
          ...(education?.endDate && {
            endDate: moment(education.endDate),
          }),
        }}
      >
        <Form.Item name={FIELD_EDUCATION.EDUCATION_ORG} label="School" required>
          <Input />
        </Form.Item>
        <Form.Item name={FIELD_EDUCATION.DEGRESS} label="Degree">
          <Input />
        </Form.Item>
        <Form.Item name={FIELD_EDUCATION.FIELD_OF_STUDY} label="Field of study">
          <Input />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item name={FIELD_EDUCATION.START_DATE} label="Start Date" className="w-1/2 mr-2">
            <DatePicker picker="year" className="w-full" />
          </Form.Item>

          <Form.Item name={FIELD_EDUCATION.END_DATE} label="End Date" className="w-1/2 ml-2">
            <DatePicker picker="year" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item name={FIELD_EDUCATION.SUMMARY} label="Summary">
          <Input.TextArea />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item>
            <Button className="px-8" type="primary" htmlType="submit" loading={loading || loadingUpdated}>
              OK
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

ModalAddEdit.propTypes = {
  show: PropTypes.bool,
  education: PropTypes.objectOf(PropTypes.any),
  isEdit: PropTypes.bool,
  cancel: PropTypes.func,
  refetch: PropTypes.func,
}
export default ModalAddEdit
