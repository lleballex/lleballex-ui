import { EnvVariable } from '@/config/env'

export const getEnv = (name: EnvVariable, required: boolean = true) => {
  const val = process.env[name]
  if (!val && required) {
    throw new Error(`Cannot find env variable: ${name}`)
  }
  return val
}
