import { usePlayerInfos } from 'hooks/usePlayerInfos'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { emptyArray, emptyObject, emptyString } from 'utils/constants'
import { getRecruitsCall } from './apiCalls/getRecruits'
import { Initializer } from 'features/buildings/Initializer'
import { RecruitFilter } from './RecruitFilter'
import { isEmpty, isNil } from 'ramda'
import { RecruitStats } from './RecruitStats'
import { insertRecruitCall } from './apiCalls/insertRecruit'
import { deleteQueueCall } from 'features/buildings/apiCalls/deleteBuildQueue'
import { useHistory } from 'react-router-dom'

export const RecruitListContainer = () => {
  const { playerInfo } = usePlayerInfos()
  const history = useHistory()
  const [cities, setCities] = useState(emptyArray)
  const [currentVillage, setCurrentVillage] = useState(emptyObject)
  const [currentPlayer] = useState(playerInfo?.playerId)
  const [worldName] = useState(playerInfo?.worldName)
  const [occupiedBuildings, setOccupiedBuildings] = useState(Array(3).fill(false))

  const handleApplyFilter = useCallback(villageId => {
    setCurrentVillage(villageId)
  }, [])

  const handleResetFilter = useCallback(() => {
    setCurrentVillage(emptyObject)
  }, [])

  const getCities = useCallback(async (playerId, worldName) => {
    if (!playerId || !worldName) return
    setCities(await getRecruitsCall(playerId, worldName))
  }, [])

  const handleAddRecruits = useCallback(
    async recruits => {
      await insertRecruitCall(currentPlayer, worldName, currentVillage?.villageId, recruits)
      history.go()
    },
    [currentPlayer, currentVillage?.villageId, history, worldName]
  )

  const handleClearQueue = useCallback(async () => {
    await deleteQueueCall(currentPlayer, worldName, currentVillage?.villageId, 'recruit')
    history.go()
  }, [currentPlayer, currentVillage?.villageId, history, worldName])

  useEffect(() => {
    if (isNil(currentVillage) || isEmpty(currentVillage)) return
    let items = [...occupiedBuildings]
    if ('19' in currentVillage.recruits) {
      items[0] = true
    } else {
      items[0] = false
    }
    if ('20' in currentVillage.recruits) {
      items[1] = true
    } else {
      items[1] = false
    }
    if ('21' in currentVillage.recruits) {
      items[2] = true
    } else {
      items[2] = false
    }
    if (items[0] != occupiedBuildings[0] || items[1] != occupiedBuildings[1] || items[2] != occupiedBuildings[2])
      setOccupiedBuildings(items)
  }, [currentVillage, currentVillage.recruits, occupiedBuildings])

  useEffect(() => {
    if (currentPlayer == emptyString || worldName == emptyString) return
    async function fetchData() {
      setCities(await getRecruitsCall(currentPlayer, worldName))
    }
    fetchData()
  }, [currentPlayer, worldName])
  if (cities?.length == 0 || isNil(currentPlayer) || isNil(worldName)) return <Initializer getBuildings={getCities}></Initializer>
  return currentVillage != emptyObject ? (
    <>
      <RecruitFilter
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        filter={currentVillage}
        options={cities}
      ></RecruitFilter>
      <RecruitStats
        handleAddRecruits={handleAddRecruits}
        handleClearQueue={handleClearQueue}
        tribeId={currentVillage?.tribeId}
        occupiedBuildings={occupiedBuildings}
        setOccupiedBuildings={setOccupiedBuildings}
      />
    </>
  ) : (
    <RecruitFilter
      onApplyFilter={handleApplyFilter}
      onResetFilter={handleResetFilter}
      filter={currentVillage}
      options={cities}
    ></RecruitFilter>
  )
}
