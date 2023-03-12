import { env } from 'utils/env'
import axios from 'axios'

export const removeFarmCall = async (playerId, worldName, x_coord, y_coord) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/removeFarm`, {
      playerId,
      worldName,
      x_coord: parseInt(x_coord),
      y_coord: parseInt(y_coord)
    })
  } catch (error) {
    return 500
  }
  return response
}
