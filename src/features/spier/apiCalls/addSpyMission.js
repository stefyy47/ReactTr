import { env } from 'utils/env'
import axios from 'axios'

export const addSpyMission = async (playerId, worldName, villageId, minPop, maxPop, spies) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/spier`, {
      playerId, worldName, villageId, spiesNumber: spies, minPop, maxPop
    })
  } catch (error) {
    return 500
  }
  return response
}
