export const EMAIL="himanshugupta.396+mercor@gmail.com"
export const PASSWORD="himanshugupta.396+mercor@gmail.com"

export const API_URL='http://localhost:3000'

export const AUTH = 'auth/login'
export const PROFILE = 'auth/profile'
export const EMPLOYEE_PROJECTS = (id: string) => `employees/${id}/projects`

export const START_TIME = `timelogs/start`
export const STOP_TIME = `timelogs/stop`
export const GET_TIME_LOG = (userId: string, projectId: string) => `timelogs/${projectId}/${userId}`