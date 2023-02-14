import useInterval from 'hooks/useInterval'
import { usePlayerInfos } from 'hooks/usePlayerInfos'
import { defaultTo, isNil } from 'ramda'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { buildingTypes, emptyArray, emptyObject, emptyString } from 'utils/constants'
import { deleteQueueCall } from './apiCalls/deleteBuildQueue'
import { getBuildingsCall } from './apiCalls/getBuildings'
import { insertBuildingCall } from './apiCalls/insertBuild'
import { BuildingFilter } from './BuildingFilter'
import { BuildingList } from './BuildingList'
import { Initializer } from './Initializer'

export const BuildingListContainer = () => {
  const { playerInfo } = usePlayerInfos()
  const [buildings, setBuildings] = useState(emptyArray)
  const [currentVillage, setCurrentVillage] = useState(emptyObject)
  const [buildingType, setBuildingType] = useState(buildingTypes.All)
  const [currentPlayer] = useState(playerInfo?.playerId)
  const [worldName] = useState(playerInfo?.worldName)

  const handleRemoveBuildQueue = useCallback(async () => {
    await deleteQueueCall(currentPlayer, worldName, currentVillage?.villageId, 'building')
  }, [currentPlayer, currentVillage?.villageId, worldName])

  const handleAddBuild = useCallback(
    async (build, desiredLevel) => {
      await insertBuildingCall(currentPlayer, worldName, currentVillage?.villageId, build?.locationId, build?.buildingType, desiredLevel)
    },
    [currentPlayer, currentVillage, worldName]
  )

  const getBuildings = useCallback(async (playerId, worldName) => {
    if (!playerId || !worldName) return
    setBuildings(await getBuildingsCall(playerId, worldName))
  }, [])

  const handleApplyFilter = useCallback((villageId, type) => {
    setBuildingType(type)
    setCurrentVillage(villageId)
  }, [])

  const handleResetFilter = useCallback(() => {
    setBuildingType(buildingTypes.All)
    setCurrentVillage(emptyObject)
  }, [])

  useInterval(
    async () => {
      setBuildings(await getBuildingsCall(currentPlayer, worldName))
    },
    !isNil(currentPlayer) && !isNil(worldName) && buildings?.length > 0 ? 10000 : null
  )
  useEffect(() => {
    if (currentPlayer == emptyString || worldName == emptyString) return
    async function fetchData() {
      setBuildings(await getBuildingsCall(currentPlayer, worldName))
    }
    fetchData()
  }, [currentPlayer, worldName])

  if (buildings?.length == 0 || isNil(currentPlayer) || isNil(worldName)) return <Initializer getBuildings={getBuildings}></Initializer>
  return (
    <>
      <BuildingFilter
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        filter={currentVillage}
        buildingType={buildingType}
        options={buildings}
      ></BuildingFilter>
      <BuildingList
        handleAddBuild={handleAddBuild}
        buildingType={buildingType}
        buildingList={buildings?.find(b => b._id == currentVillage?._id)?.BuildingsInfo?.cache |> defaultTo(emptyArray)}
        handleRemoveQueue={handleRemoveBuildQueue}
      ></BuildingList>
    </>
  )
}
