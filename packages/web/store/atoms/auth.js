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

  registerStep: atom({
    key: 'atoms_auth_registerStep',
    default: 0,
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
}
