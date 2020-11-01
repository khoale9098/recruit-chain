import React from 'react'
import ContainerProfile from 'components/ContainerProfile'
import CardProfile from 'components/CardProfile'

const Experience = () => {
  return (
    <ContainerProfile title="Total Work Experience - 3 year(s)">
      <CardProfile
        titleCard="Blockchain Engineer, Product Engineer, Fullstack Engineer"
        imgCard="https://media-exp1.licdn.com/dms/image/C4D0BAQEd92am3bw1ng/company-logo_100_100/0?e=1612396800&v=beta&t=UzLDjOerebMfhkOHqfeSihXagQrOk97Va7_AkU5Ullk"
      >
        <p>Facebook</p>
        <div style={{ color: 'rgba(0,0,0,.6)' }}>
          <div>Jun 2016 – Sep 2016</div>
          <span>Googleplex, Mountain View, CA</span>
        </div>

        <p className="pt-2">
          Work in Google Identity team. Build a new update for Authenticator app, which is one of the first party apps from
          Google with more than 10 million users.
        </p>
      </CardProfile>

      <CardProfile titleCard="Software Engineer" imgCard="https://img.utdstc.com/icons/facebook-android.png:225">
        <p>Facebook</p>
        <div style={{ color: 'rgba(0,0,0,.6)' }}>
          <div>Jun 2016 – Sep 2016</div>
          <span>Googleplex, Mountain View, CA</span>
        </div>

        <p className="pt-2">
          Work in Google Identity team. Build a new update for Authenticator app, which is one of the first party apps from
          Google with more than 10 million users.
        </p>
      </CardProfile>

      <CardProfile
        titleCard="Software Engineer"
        imgCard="https://media-exp1.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_100_100/0?e=1612396800&v=beta&t=TZeoGHZsJX2CH-CseLQOrlguczyhUX7LsXSn2QQNSxw"
      >
        <p>Google</p>
        <div style={{ color: 'rgba(0,0,0,.6)' }}>
          <div>Jun 2016 – Sep 2016</div>
          <span>Googleplex, Mountain View, CA</span>
        </div>

        <p className="pt-2">
          Work in Google Identity team. Build a new update for Authenticator app, which is one of the first party apps from
          Google with more than 10 million users.
        </p>
      </CardProfile>
    </ContainerProfile>
  )
}

export default Experience
