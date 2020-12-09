import { useState } from 'react'
import { Card, Button, Form } from 'antd'
import { gql, useMutation } from '@apollo/client'
import dynamic from 'next/dynamic'
import { pickBy, identity } from 'lodash'
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

const FormAddJob = () => {
  const [form] = Form.useForm()
  const [addJob] = useMutation(CREATE_JOB)
  const [requirment, setRequirment] = useState(EditorState.createEmpty())
  const [description, setDescription] = useState(EditorState.createEmpty())
  const [benefit, setBenefit] = useState(EditorState.createEmpty())

  const handleAddEdit = async (values) => {
    const requirmentValue = requirment ? draftToHtml(convertToRaw(requirment.getCurrentContent())) : ''
    const descriptionValue = description ? draftToHtml(convertToRaw(description.getCurrentContent())) : ''
    const benefitValue = benefit ? draftToHtml(convertToRaw(benefit.getCurrentContent())) : ''

    const input = {
      title: values.title,
      location: values.location,
      category: values.category ? JSON.stringify({ ...values.category }) : '',
      expiredAt: values.expiredAt,
      salaryFrom: values.salaryFrom,
      salaryTo: values.salaryTo,
      vacancies: values.vacancies,
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

  return (
    <Form form={form} onFinish={handleAddEdit} validateTrigger={false}>
      <Card
        extra={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button htmlType="submit" className="text-white bg-primary rounded-sm px-4">
            Add Job
          </Button>
        }
      >
        <FormAddEdit />
        <AddJobEditor
          requirment={requirment}
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

export default FormAddJob
