import { defaultTo } from 'ramda'
import React from 'react'
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
  const [buildings, setBuildings] = useState(emptyArray)
  const [currentVillage, setCurrentVillage] = useState(emptyObject)
  const [buildingType, setBuildingType] = useState(buildingTypes.All)
  const [currentPlayer, setCurrentPlayer] = useState(emptyString)
  const [worldName, setWorldName] = useState(emptyString)

  const handleRemoveBuildQueue = useCallback(async () => {
    await deleteQueueCall(currentPlayer, worldName, currentVillage?.villageId)
  }, [currentPlayer, currentVillage?.villageId, worldName])

  const handleAddBuild = useCallback(async (build, desiredLevel) => {
    await insertBuildingCall(currentPlayer, worldName, currentVillage?.villageId, build?.locationId, build?.buildingType, desiredLevel)
  }, [currentPlayer, currentVillage, worldName])

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
  if (buildings.length == 0 || currentPlayer == emptyString || worldName == emptyString)
    return <Initializer setCurrentPlayer={setCurrentPlayer} setWorldName={setWorldName} getBuildings={getBuildings}></Initializer>
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
        buildingList={currentVillage?.BuildingsInfo?.cache |> defaultTo(emptyArray)}
        handleRemoveQueue={handleRemoveBuildQueue}
      ></BuildingList>
    </>
  )
}
