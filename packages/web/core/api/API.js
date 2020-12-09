const API_ROOT = 'https://dev.viecdi.com/api/v1'

const USER = {
  REQUEST: `${API_ROOT}/job_requests`,
  APPLY: `${API_ROOT}/candidates`,
}

const JOB = {
  APPLY: `${API_ROOT}/jobs/{id}/apply`,
  LIST: `${API_ROOT}/jobs`,
  DETAIL: `${API_ROOT}/jobs/{slug}`,
  URGENT: `${API_ROOT}/jobs?urgent=1`,
}

const BLOG = {
  LIST: `${API_ROOT}/blogs`,
  CATEGORY: `${API_ROOT}/blogs/categories`,
  DETAIL: `${API_ROOT}/blogs/{slug}`,
  SUBSCRIBERS: `${API_ROOT}/email_subscribers`,
}
export default {
  USER,
  JOB,
  BLOG,
}
