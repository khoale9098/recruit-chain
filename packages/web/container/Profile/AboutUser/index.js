import React from 'react'
import ContainerProfile from 'components/ContainerProfile'
import PropTypes from 'prop-types'
import CompanyVacancies from '../CompanyVacancie'
import RecentVacencies from '../RecentVacancies'
import ModalEditAbout from './ModalEditAbout'
import UseAnalytics from '../UseAnalytics'

const AboutUser = ({ about, updateUser, isEmployee }) => {
  const [showEditAbout, setShowEditAbout] = React.useState(false)

  return (
    <>
      <ContainerProfile showModal={() => setShowEditAbout(true)} title="About">
        <p>{about}</p>
        {!isEmployee ? (
          <>
            <CompanyVacancies />
            <RecentVacencies />
          </>
        ) : (
          <UseAnalytics />
        )}
      </ContainerProfile>
      <ModalEditAbout about={about} show={showEditAbout} updateUser={updateUser} cancel={() => setShowEditAbout(false)} />
    </>
  )
}
AboutUser.propTypes = {
  about: PropTypes.string,
  updateUser: PropTypes.func,
  isEmployee: PropTypes.bool,
}
AboutUser.defaultProps = {
  about: '',
  isEmployee: false,
  updateUser: () => {},
}

export default AboutUser
