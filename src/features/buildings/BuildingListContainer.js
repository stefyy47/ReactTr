import { defaultTo } from 'ramda'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { buildingTypes, emptyArray, emptyObject } from 'utils/constants'
import { getBuildingsCall } from './apiCalls/getBuildings'
import { BuildingFilter } from './BuildingFilter'
import { BuildingList } from './BuildingList'
import { Initializer } from './Initializer'

export const BuildingListContainer = () => {
  const [buildings, setBuildings] = useState(emptyArray)
  const [currentVillage, setCurrentVillage] = useState(emptyObject)
  const [buildingType, setBuildingType] = useState(buildingTypes[0])
  console.log(buildingType)
  const getBuildings = useCallback(async (playerId, worldName) => {
    if (!playerId || !worldName) return
    setBuildings(await getBuildingsCall(playerId, worldName))
  }, [])

  const handleApplyFilter = useCallback((villageId, type) => {
    setBuildingType(type)
    setCurrentVillage(villageId)
  }, [])

  const handleResetFilter = useCallback(() => {
    setBuildingType(buildingTypes[0])
    setCurrentVillage(emptyObject)
  }, [])
  if (buildings.length == 0) return <Initializer getBuildings={getBuildings}></Initializer>
  return (
    <>
    <BuildingFilter onApplyFilter={handleApplyFilter} onResetFilter={handleResetFilter} filter={currentVillage} buildingType={buildingType} options={buildings}></BuildingFilter>
    <BuildingList buildingType={buildingType} buildingList={currentVillage?.BuildingsInfo?.cache |> defaultTo(emptyArray)}></BuildingList>
    </>
  )
}
