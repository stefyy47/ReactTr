import { usePlayerInfos } from 'hooks/usePlayerInfos'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { emptyArray, emptyObject, emptyString } from 'utils/constants'

import { Initializer } from 'features/buildings/Initializer'
import { isNil } from 'ramda'
import { SpierFilter } from './SpierFilter'
import { Spier } from './Spier'
import { getBuildingsCall } from 'features/buildings/apiCalls/getBuildings'
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'
import { addSpyMission } from './apiCalls/addSpyMission'

export const SpierContainer = () => {
  const { playerInfo } = usePlayerInfos()
  const [cities, setCities] = useState(emptyArray)
  const [currentVillage, setCurrentVillage] = useState(emptyObject)
  const [currentPlayer] = useState(playerInfo?.playerId)
  const [worldName] = useState(playerInfo?.worldName)
  const [loading, setLoading] = useState(false)

  const handleApplyFilter = useCallback(villageId => {
    setCurrentVillage(villageId)
  }, [])

  const handleResetFilter = useCallback(() => {
    setCurrentVillage(emptyObject)
  }, [])

  const handleAddSpyMission = useCallback(async(minPop, maxPop, spies) => {
    setLoading(true)
    await addSpyMission(currentPlayer, worldName, currentVillage?.villageId, parseInt(minPop), parseInt(maxPop), parseInt(spies))
    setLoading(false)
  }, [currentPlayer, currentVillage?.villageId, worldName])

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
  if(loading) return <LoadingFakeText />
  if (cities?.length == 0 || isNil(currentPlayer) || isNil(worldName)) return <Initializer getBuildings={getCities}></Initializer>
  return currentVillage != emptyObject ? (
    <>
      <SpierFilter
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        filter={currentVillage}
        options={cities}
      ></SpierFilter>
      <Spier handleAddSpyMission={handleAddSpyMission} />
    </>
  ) : (
    <SpierFilter onApplyFilter={handleApplyFilter} onResetFilter={handleResetFilter} filter={currentVillage} options={cities}></SpierFilter>
  )
}
