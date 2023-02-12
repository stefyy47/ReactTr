import { env } from 'utils/env'
import axios from 'axios'

export const insertBuildingCall = async (playerId, worldName, villageId, locationId, buildingType, desiredLevel) => {
  if (!playerId || !worldName) return
  let response
  try {
    response = await axios.post(`${env.REACT_APP_BACKEND_HOST}/api/queue`, {
      playerId, worldName, villageId, build: {locationId, buildingType, desiredLevel}
    })
  } catch (error) {
    return 500
  }
  return response
}
