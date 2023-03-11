import { usePlayerInfos } from 'hooks/usePlayerInfos'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { emptyArray, emptyString } from 'utils/constants'

import { Initializer } from 'features/buildings/Initializer'
import { isNil } from 'ramda'
import { getBuildingsCall } from 'features/buildings/apiCalls/getBuildings'
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'
import { getPossibleFarms } from './apiCalls/getPossibleFarms'
import { FarmerList } from './FarmerList'
import { addFarmCall } from './apiCalls/addFarm'

export const FarmerContainer = () => {
  const { playerInfo } = usePlayerInfos()
  const [cities, setCities] = useState(emptyArray)
  const [currentPlayer] = useState(playerInfo?.playerId)
  const [possibleFarms, setPossibleFarms] = useState({})
  const [worldName] = useState(playerInfo?.worldName)
  const [loading, setLoading] = useState(false)

  const handleAddVillageToFarmList = useCallback(
    async (villageId, tribe, troops, x_coord, y_coord) => {
      setLoading(true)
      await addFarmCall(currentPlayer, worldName, villageId, tribe, troops, x_coord, y_coord)
      setLoading(false)
    },
    [currentPlayer, worldName]
  )

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
      const possibleFarmsTemp = await getPossibleFarms(currentPlayer, worldName)
      setPossibleFarms(possibleFarmsTemp[0]['villages'])
      setLoading(false)
    }
    fetchData()
  }, [currentPlayer, worldName])
  if (loading) return <LoadingFakeText />
  if (cities?.length == 0 || isNil(currentPlayer) || isNil(worldName)) return <Initializer getBuildings={getCities}></Initializer>
  return <FarmerList possibleFarms={possibleFarms} handleAddVillageToFarmList={handleAddVillageToFarmList} />
}
