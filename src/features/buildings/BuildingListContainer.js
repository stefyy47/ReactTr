import { LoadingFakeText } from '@totalsoft_oss/rocket-ui.core'
import useInterval from 'hooks/useInterval'
import { usePlayerInfos } from 'hooks/usePlayerInfos'
import { defaultTo, isNil } from 'ramda'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { buildingIds, buildingNames, buildingTypes, emptyArray, emptyObject, emptyString } from 'utils/constants'
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
  const [loading, setLoading] = useState(false)

  const handleRemoveBuildQueue = useCallback(async () => {
    setLoading(true)
    await deleteQueueCall(currentPlayer, worldName, currentVillage?.villageId, 'building')
    setLoading(false)
  }, [currentPlayer, currentVillage?.villageId, worldName])

  const handleAddBuild = useCallback(
    async (build, desiredLevel) => {
      setLoading(true)
      await insertBuildingCall(currentPlayer, worldName, currentVillage?.villageId, build?.locationId, build?.buildingType, desiredLevel)
      setLoading(false)
    },
    [currentPlayer, currentVillage, worldName]
  )

  const handleAddMultipleResources = useCallback(
    async (desiredLevelWoodworks, desiredLevelClaypits, desiredLevelIronmines, desiredLevelCroplands, desiredLevelAllResources) => {
      for (let i = 0; i < currentVillage?.BuildingsInfo?.cache?.length; i++) {
        if (currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.Woodcutter && desiredLevelWoodworks > 0) {
          await handleAddBuild(currentVillage?.BuildingsInfo?.cache[i]?.data, desiredLevelWoodworks)
        }
        if (currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.ClayPit && desiredLevelClaypits > 0) {
          await handleAddBuild(currentVillage?.BuildingsInfo?.cache[i]?.data, desiredLevelClaypits)
        }
        if (currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.IronMine && desiredLevelIronmines > 0) {
          await handleAddBuild(currentVillage?.BuildingsInfo?.cache[i]?.data, desiredLevelIronmines)
        }
        if (currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.Cropland && desiredLevelCroplands > 0) {
          await handleAddBuild(currentVillage?.BuildingsInfo?.cache[i]?.data, desiredLevelCroplands)
        }
        if (
          (currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.Woodcutter ||
            currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.ClayPit ||
            currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.IronMine ||
            currentVillage?.BuildingsInfo?.cache[i]?.data?.buildingType == buildingIds.Cropland) &&
            desiredLevelAllResources > 0
        ) {
          await handleAddBuild(currentVillage?.BuildingsInfo?.cache[i]?.data, desiredLevelAllResources)
        }
      }
    },
    [currentVillage?.BuildingsInfo?.cache, handleAddBuild]
  )

  const getBuildings = useCallback(async (playerId, worldName) => {
    if (!playerId || !worldName) return
    setLoading(true)
    setBuildings(await getBuildingsCall(playerId, worldName))
    setLoading(false)
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
      setLoading(true)
      setBuildings(await getBuildingsCall(currentPlayer, worldName))
      setLoading(false)
    }
    fetchData()
  }, [currentPlayer, worldName])

  if(loading) return <LoadingFakeText lines={5}/>
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
        handleAddMultipleResources={handleAddMultipleResources}
      ></BuildingList>
    </>
  )
}
