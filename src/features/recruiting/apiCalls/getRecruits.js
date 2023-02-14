import { env } from 'utils/env'
import axios from 'axios'

export const getRecruitsCall = async (playerId, worldName) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.get(`${env.REACT_APP_BACKEND_HOST}/api/recruits`, {
      params: {
        playerId,
        worldName
      }
    })
  } catch (error) {
    return []
  }
  return response.data
}
