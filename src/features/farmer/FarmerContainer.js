import { usePlayerInfos } from 'hooks/usePlayerInfos'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { emptyArray, emptyString } from 'utils/constants'

import { Initializer } from 'features/buildings/Initializer'
import { defaultTo, isNil } from 'ramda'
import { getBuildingsCall } from 'features/buildings/apiCalls/getBuildings'
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'
import { getPossibleFarms } from './apiCalls/getPossibleFarms'
import { FarmerList } from './FarmerList'
import { addFarmCall } from './apiCalls/addFarm'
import { removePossibleFarmCall } from './apiCalls/removePossibleFarm'
import { removeFarmCall } from './apiCalls/removeFarm'

export const FarmerContainer = () => {
  const { playerInfo } = usePlayerInfos()
  const [cities, setCities] = useState(emptyArray)
  const [currentPlayer] = useState(playerInfo?.playerId |> defaultTo(''))
  const [possibleFarms, setPossibleFarms] = useState([])
  const [worldName] = useState(playerInfo?.worldName |> defaultTo(''))
  const [loading, setLoading] = useState(false)

  const handleAddVillageToFarmList = useCallback(
    async (villageId, tribe, troops, x_coord, y_coord) => {
      setLoading(true)
      await addFarmCall(currentPlayer, worldName, villageId, tribe, troops, x_coord, y_coord)
      let tempPossibleFarms = [...possibleFarms]
      const index = tempPossibleFarms.findIndex(f => f.villageId == villageId)
      tempPossibleFarms.splice(index, 1)
      setPossibleFarms(tempPossibleFarms)
      setLoading(false)
    },
    [currentPlayer, possibleFarms, worldName]
  )

  const handleRemoveFarm = useCallback(
    async (x_coord, y_coord) => {
      if (x_coord == 0 && y_coord == 0) return
      setLoading(true)
      await removeFarmCall(currentPlayer, worldName, x_coord, y_coord)
      setLoading(false)
    },
    [currentPlayer, worldName]
  )

  const handleRemoveVillageFromPossibleFarmList = useCallback(
    async villageId => {
      setLoading(true)
      await removePossibleFarmCall(currentPlayer, worldName, villageId)
      let tempPossibleFarms = [...possibleFarms]
      const index = tempPossibleFarms.findIndex(f => f.villageId == villageId)
      tempPossibleFarms.splice(index, 1)
      setPossibleFarms(tempPossibleFarms)
      setLoading(false)
    },
    [currentPlayer, possibleFarms, worldName]
  )

  const orderPossibleFarms = useCallback(
    orderBy => {
      let tempPossibleFarms = [...possibleFarms]
      if (orderBy == 'pop') {
        tempPossibleFarms.sort((a, b) =>
          a.villagePopulation > b.villagePopulation ? -1 : b.villagePopulation > a.villagePopulation ? 1 : 0
        )
      } else if (orderBy == 'date') {
        tempPossibleFarms.sort((a, b) => (a.parsed_time > b.parsed_time ? -1 : b.parsed_time > a.parsed_time ? 1 : 0))
      }
      setPossibleFarms(tempPossibleFarms)
    },
    [possibleFarms]
  )

  const getCities = useCallback(async (playerId, worldName) => {
    if (!playerId || !worldName) return
    setLoading(true)
    setCities(await getBuildingsCall(playerId, worldName))
    setLoading(false)
  }, [])

  const makeArrayFromObject = useCallback(obj => {
    let arr = []
    Object.keys(obj).forEach(o => {
      arr.push({ villageId: o, ...obj[o] })
    })
    return arr
  }, [])

  useEffect(() => {
    if (currentPlayer == emptyString || worldName == emptyString) return
    async function fetchData() {
      setLoading(true)
      setCities(await getBuildingsCall(currentPlayer, worldName))
      const possibleFarmsTemp = await getPossibleFarms(currentPlayer, worldName)
      const arr = makeArrayFromObject(possibleFarmsTemp[0]['villages'])
      setPossibleFarms(arr)
      setLoading(false)
    }
    fetchData()
  }, [cities.length, currentPlayer, makeArrayFromObject, worldName])
  if (loading) return <LoadingFakeText />
  if (cities?.length == 0 || isNil(currentPlayer) || isNil(worldName)) {
    return <Initializer getBuildings={getCities}></Initializer>
  }
  return (
    <FarmerList
      possibleFarms={possibleFarms}
      handleAddVillageToFarmList={handleAddVillageToFarmList}
      orderFunction={orderPossibleFarms}
      onRemovePossibleFarm={handleRemoveVillageFromPossibleFarmList}
      handleRemoveFarm={handleRemoveFarm}
    />
  )
}
