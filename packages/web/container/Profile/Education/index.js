import React from 'react'
import ContainerProfile from 'components/ContainerProfile'
import CardProfile from 'components/CardProfile'

const Education = () => {
  return (
    <ContainerProfile title="Education">
      <CardProfile
        titleCard=" HCMC University of Technology and Education"
        imgCard="https://media-exp1.licdn.com/dms/image/C510BAQEaVrl7oCuRsg/company-logo_100_100/0?e=1612396800&v=beta&t=DIqbAkSTAW7VxvROkovQ234g5pYKmjsdRScaBBiF0pc"
      >
        <p>Bachelor of Engineering - BE</p>
        <div>2016 - 2021</div>
      </CardProfile>
    </ContainerProfile>
  )
}

export default Education
