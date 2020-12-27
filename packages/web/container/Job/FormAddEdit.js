import React from 'react'
import { Form, Input, DatePicker, Select, InputNumber } from 'antd'
import { CONFIG } from '../../constants'

const FIELD_JOB = {
  TITLE: 'title',
  TOKEN_BONUS: 'tokenBonus',
  SALARY_FROM: 'salaryFrom',
  SALARY_TO: 'salaryTo',
  EXPIRED_AT: 'expiredAt',
  LOCATION: 'location',
  CATEGORY: 'category',
}

const FormAddEdit = () => {
  return (
    <>
      <Form.Item label="Job Title" name={FIELD_JOB.TITLE} className="font-semibold flex flex-col" labelAlign="left" required>
        <Input />
      </Form.Item>
      <div className="w-full flex">
        <div className="w-1/3 ">
          <Form.Item label="Location" name={FIELD_JOB.LOCATION} className="font-semibold flex flex-col" labelAlign="left">
            <Input />
          </Form.Item>
        </div>
        <div className="w-1/3 ml-4 ">
          <Form.Item label="Expired Date" name={FIELD_JOB.EXPIRED_AT} className="font-semibold flex flex-col" labelAlign="left">
            <DatePicker className="w-full" />
          </Form.Item>
        </div>
        <div className="w-1/3 ml-4 ">
          <Form.Item
            label="Token Bonus"
            name={FIELD_JOB.TOKEN_BONUS}
            className="font-semibold flex flex-col"
            labelAlign="left"
            required
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/3 ">
          <Form.Item label="Catagory" name={FIELD_JOB.CATEGORY} className="font-semibold flex flex-col" labelAlign="left">
            <Select mode="multiple">
              {Object.values(CONFIG.JOB.CATAGORY).map((c) => (
                <Select.Option key={c}>{c}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="w-1/3 ml-4 ">
          <Form.Item label="Salary From" name={FIELD_JOB.SALARY_FROM} className="font-semibold flex flex-col" labelAlign="left">
            <Input />
          </Form.Item>
        </div>
        <div className="w-1/3 ml-4 ">
          <Form.Item label="Salary To" name={FIELD_JOB.SALARY_TO} className="font-semibold flex flex-col" labelAlign="left">
            <Input />
          </Form.Item>
        </div>
      </div>
    </>
  )
}

export default FormAddEdit
