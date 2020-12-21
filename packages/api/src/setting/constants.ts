export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
} as const

export const USER = {
  USER_TYPE: {
    EMPLOYEE: 'employee',
    EMPLOYER: 'employer'
  },
  STATUS: {
    ACTIVE: 'active',
    DELETED: 'deleted',
  },
} as const


export const SORT_FOLLOW_OPTION = {
  DEFAULT: 'DEFAULT',
  NEWEST_FIRST: 'NEWEST_FIRST',
  OLDEST_FIRST: 'OLDEST_FIRST',
}

export const JOB = {
  APPLY_STATUS: {
    RESPONSES: 'responses',
    INTERVIEW_FIRST_ROUND: 'interview1',
    INTERVIEW_SECOND_ROUND: 'inteview2',
    OFFER: 'offer',
    REJECT: 'rejected',
    RESERVE: 'reserve',
    ACCEPTED: 'accepted'
  }
} as const