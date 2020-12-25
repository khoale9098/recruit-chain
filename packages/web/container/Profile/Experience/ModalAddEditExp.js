import moment from 'moment'
import { pickBy, identity } from 'lodash'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import { Modal, Form, Input, Button, DatePicker, message } from 'antd'

const FIELD_EXP = {
  TITLE: 'job_title',
  EMPLOYMENT_TYPE: 'employment_type',
  COMPANY_NAME: 'companyName',
  LOCATION: 'location',
  MEDIA: 'media',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
}

const CREATE_EXP = gql`
  mutation createExperience($expInput: ExperienceInput!) {
    createExperience(expInput: $expInput) {
      _id
    }
  }
`

const UPDATE_EXP = gql`
  mutation updateExperience($expInput: ExperienceInput!, $expId: ID!) {
    updateExperience(expInput: $expInput, expId: $expId) {
      _id
    }
  }
`

const ModalAddEditExp = ({ show, cancel, isEdit, experience, refetch }) => {
  const [form] = Form.useForm()
  const [createExp, { loading }] = useMutation(CREATE_EXP, {
    onCompleted() {
      refetch()
    },
  })
  const [updateExp, { loading: loadingExp }] = useMutation(UPDATE_EXP, {
    onCompleted() {
      refetch()
      message.success('Update Successful!')
    },
  })
  const onSubmit = async (values) => {
    const inputValues = pickBy(values, identity)

    if (isEdit) {
      await updateExp({ variables: { expInput: inputValues, expId: experience?._id } })
    } else {
      await createExp({ variables: { expInput: inputValues } })
    }
  }
  const initValue = {
    ...experience,
    ...(experience?.startDate && {
      startDate: moment(experience.startDate),
    }),
    ...(experience?.endDate && {
      endDate: moment(experience.endDate),
    }),
  }

  return (
    <Modal title="Experience" visible={show} onCancel={cancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={initValue}>
        <Form.Item name={FIELD_EXP.TITLE} label="Title" required>
          <Input />
        </Form.Item>
        <Form.Item name={FIELD_EXP.EMPLOYMENT_TYPE} label="Employment type">
          <Input />
        </Form.Item>
        <Form.Item name={FIELD_EXP.COMPANY_NAME} label="Company" required>
          <Input />
        </Form.Item>
        <Form.Item name={FIELD_EXP.LOCATION} label="Location">
          <Input />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item name={FIELD_EXP.START_DATE} label="Start Date" className="w-1/2 mr-2">
            <DatePicker picker="month" className="w-full" />
          </Form.Item>

          <Form.Item name={FIELD_EXP.END_DATE} label="End Date" className="w-1/2 ml-2">
            <DatePicker picker="month" className="w-full" />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button className="px-8" type="primary" htmlType="submit" loading={loading || loadingExp}>
              OK
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

ModalAddEditExp.propTypes = {
  show: PropTypes.bool,
  experience: PropTypes.objectOf(PropTypes.any),
  isEdit: PropTypes.bool,
  cancel: PropTypes.func,
  refetch: PropTypes.func,
}

export default ModalAddEditExp
