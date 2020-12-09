import React from 'react'
import ContainerProfile from 'components/ContainerProfile'

const AboutUser = ({ isEmployee }) => {
  return (
    <ContainerProfile title="About">
      <p>
        {isEmployee
          ? 'To become a professional software engineer and full-stack developer working in a dynamic and international environment where I can contribute my skills and knowledge to solve real world problems.'
          : 'As a brand of Harvey Nash Group, NashTech has committed to deliver the very best talents, IT solutions and Business Process Services to our international clients in the UK, Europe, Asia Pacific & the US.'}
      </p>
    </ContainerProfile>
  )
}

export default AboutUser
