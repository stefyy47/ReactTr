import { env } from 'utils/env'
import axios from 'axios'

export const insertRecruitCall = async (playerId, worldName, villageId, recruits) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/insertRecruit`, {
      playerId, worldName, villageId, recruits
    })
  } catch (error) {
    return 500
  }
  return response
}
