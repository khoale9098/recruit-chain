import { atom } from 'recoil'

export default {
  registerForm: atom({
    key: 'atoms_auth_registerForm',
    default: {
      username: '',
      email: '',
      birthday: null,
      password: '',
    },
  }),

  userPersisted: atom({
    key: 'persist_user_info',
    default: {
      token: null,
      userId: null,
      userType: null,
    },
  }),

  auth: atom({
    key: 'atoms_user_info',
    default: {},
  }),

  check: atom({
    key: 'check',
    default: {
      check: '',
      userId: null,
    },
  }),
}
