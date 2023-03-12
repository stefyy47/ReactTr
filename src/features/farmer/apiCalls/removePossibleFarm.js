import { env } from 'utils/env'
import axios from 'axios'

export const removePossibleFarmCall = async (playerId, worldName, villageId) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/removePossibleFarm`, {
      playerId, worldName, villageId
    })
  } catch (error) {
    return 500
  }
  return response
}
