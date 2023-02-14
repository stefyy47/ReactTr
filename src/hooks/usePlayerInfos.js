import { useSessionStorage } from './sessionStorage'
import { useCallback } from 'react'

export const usePlayerInfos = () => {
  const [playerInfo, setplayerAccount] = useSessionStorage('playerInfo')
  const setPlayerInfo = useCallback(
    (playerId, worldName) => {
      const obj = { playerId, worldName }
      setplayerAccount(JSON.stringify(obj))
    },
    [setplayerAccount]
  )

  return { playerInfo: JSON.parse(playerInfo), setPlayerInfo }
}
