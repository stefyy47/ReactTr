import { env } from 'utils/env'
import axios from 'axios'

export const addFarmCall = async (playerId, worldName, villageId, tribe, troops, x_coord, y_coord) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/addFarm`, {
      playerId, worldName, villageId, tribe, troops, x_coord, y_coord
    })
  } catch (error) {
    return 500
  }
  return response
}
