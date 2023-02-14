import { env } from 'utils/env'
import axios from 'axios'

export const deleteQueueCall = async (playerId, worldName, villageId, screen) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/clearQueue`, {
      playerId,
      worldName,
      villageId,
      screen
    })
  } catch (error) {
    return 500
  }
  return response
}
