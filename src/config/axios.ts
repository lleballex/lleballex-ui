import { getEnv } from '@/lib/get-env'
import axios from 'axios'

export const Axios = axios.create({
  baseURL: getEnv('NEXT_PUBLIC_API_URL'),
})
