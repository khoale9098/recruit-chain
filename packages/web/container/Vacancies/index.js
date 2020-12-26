import React from 'react'
import { Card } from 'antd'
import VacanciesView from './VacanciesView'

const VancanciesUI = () => {
  return (
    <Card title={<div className="font-semibold">My List Vacancies</div>}>
      <VacanciesView />
    </Card>
  )
}

export default VancanciesUI
