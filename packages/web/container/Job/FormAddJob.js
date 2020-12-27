import { useState } from 'react'
import { Card, Button, Form, message } from 'antd'
import { gql, useMutation } from '@apollo/client'
import dynamic from 'next/dynamic'
import { pickBy, identity } from 'lodash'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import FormAddEdit from './FormAddEdit'

const AddJobEditor = dynamic(() => import('./AddJobEditor'), { ssr: false })

const CREATE_JOB = gql`
  mutation createJob($jobInput: JobInput!) {
    createJob(jobInput: $jobInput) {
      _id
    }
  }
`

const FormAddJob = ({ isEdit, job }) => {
  const [form] = Form.useForm()
  const [addJob] = useMutation(CREATE_JOB, {
    onCompleted() {
      message.success('Add job successful!')
      window.location.reload()
    },
    onError(err) {
      if (err.message === 'YOU DONT HAVE ENOUGH TOKEN') {
        message.error('You dont have enough token work to add job!')
      } else {
        message.error('Your vacancie posting is unsuccessful!')
      }
    },
  })

  const [requirement, setRequirment] = useState(EditorState.createEmpty())
  const [description, setDescription] = useState(EditorState.createEmpty())
  const [benefit, setBenefit] = useState(EditorState.createEmpty())

  const handleAddEdit = async (values) => {
    const requirmentValue = requirement ? draftToHtml(convertToRaw(requirement.getCurrentContent())) : ''
    const descriptionValue = description ? draftToHtml(convertToRaw(description.getCurrentContent())) : ''
    const benefitValue = benefit ? draftToHtml(convertToRaw(benefit.getCurrentContent())) : ''

    const input = {
      title: values.title,
      location: values.location,
      category: values.category ? JSON.stringify(values.category) : '',
      expiredAt: values.expiredAt,
      salaryFrom: values.salaryFrom,
      salaryTo: values.salaryTo,
      vacancies: values.vacancies,
      tokenBonus: values.tokenBonus,
      requirement: requirmentValue,
      description: descriptionValue,
      benefit: benefitValue,
    }

    const inputValues = pickBy(input, identity)

    await addJob({
      variables: {
        jobInput: inputValues,
      },
    })
  }

  const _renderButton = () => (
    <Button htmlType="submit" className="text-white bg-primary rounded-sm px-4">
      {isEdit ? 'Edit Job' : '   Add Job'}
    </Button>
  )

  return (
    <Form
      form={form}
      onFinish={handleAddEdit}
      validateTrigger={false}
      initialValues={{
        title: job?.title || '',
        salaryFrom: job?.salaryFrom || '',
        salaryTo: job?.salaryTo || '',
        location: job?.location || '',
        vacancies: job?.vacancies || '',
        category: (job?.category && JSON.parse(job?.category)) || [],
        tokenBonus: job?.tokenBonus || 0,
      }}
    >
      <Card extra={_renderButton()}>
        <FormAddEdit />
        <AddJobEditor
          requirement={job?.requirement || EditorState.createEmpty()}
          description={description}
          benefit={benefit}
          setRequirment={setRequirment}
          setDescription={setDescription}
          setBenefit={setBenefit}
        />
      </Card>
    </Form>
  )
}

FormAddJob.propTypes = {
  isEdit: PropTypes.bool,
  job: PropTypes.objectOf(PropTypes.any),
}
export default FormAddJob
