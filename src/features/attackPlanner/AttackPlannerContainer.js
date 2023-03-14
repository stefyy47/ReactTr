import { usePlayerInfos } from 'hooks/usePlayerInfos'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { emptyArray, emptyString } from 'utils/constants'

import { Initializer } from 'features/buildings/Initializer'
import { isNil } from 'ramda'
import { getBuildingsCall } from 'features/buildings/apiCalls/getBuildings'
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'

export const FarmerContainer = () => {
  const { playerInfo } = usePlayerInfos()
  const [cities, setCities] = useState(emptyArray)
  const [currentPlayer] = useState(playerInfo?.playerId)
  const [worldName] = useState(playerInfo?.worldName)
  const [loading, setLoading] = useState(false)

  const getCities = useCallback(async (playerId, worldName) => {
    if (!playerId || !worldName) return
    setLoading(true)
    setCities(await getBuildingsCall(playerId, worldName))
    setLoading(false)
  }, [])

  useEffect(() => {
    if (currentPlayer == emptyString || worldName == emptyString) return
    async function fetchData() {
      setLoading(true)
      setCities(await getBuildingsCall(currentPlayer, worldName))
      setLoading(false)
    }
    fetchData()
  }, [currentPlayer, worldName])
  
  if (loading) return <LoadingFakeText />
  if (cities?.length == 0 || isNil(currentPlayer) || isNil(worldName)) return <Initializer getBuildings={getCities}></Initializer>
  return null
}
