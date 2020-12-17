import React from 'react'
import ContainerProfile from 'components/ContainerProfile'
import PropTypes from 'prop-types'
import ModalEditAbout from './ModalEditAbout'

const AboutUser = ({ about, updateUser }) => {
  const [showEditAbout, setShowEditAbout] = React.useState(false)

  return (
    <>
      <ContainerProfile showModal={() => setShowEditAbout(true)} title="About">
        <p>{about}</p>
      </ContainerProfile>
      <ModalEditAbout about={about} show={showEditAbout} updateUser={updateUser} cancel={() => setShowEditAbout(false)} />
    </>
  )
}
AboutUser.propTypes = {
  about: PropTypes.string,
  updateUser: PropTypes.func,
}
AboutUser.defaultProps = {
  about: '',
  updateUser: () => {},
}

export default AboutUser
