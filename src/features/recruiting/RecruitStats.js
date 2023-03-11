import { Button, Grid, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete } from '@totalsoft_oss/rocket-ui.core'
import { emptyString, tribes } from 'utils/constants'

export const RecruitStats = ({ handleAddRecruits, handleClearQueue, occupiedBuildings, setOccupiedBuildings, tribeId }) => {
  const [barracksTroop, setBarracksTroop] = useState(emptyString)
  const [stableTroop, setStableTroop] = useState(emptyString)
  const [workshopTroop, setworkshopTroop] = useState(emptyString)
  let barracksOptions = []
  let stableOptions = []
  let workshopOptions = []
  if (tribeId == tribes.Roman) {
    barracksOptions = [
      { id: '1', name: 'Legionnaire' },
      { id: '2', name: 'Praetorian' },
      { id: '3', name: 'Imperian' }
    ]
    stableOptions = [
      { id: '4', name: 'Equites Legati' },
      { id: '5', name: 'Equites Imperatoris' },
      { id: '6', name: 'Equites Caesaris' }
    ]
    workshopOptions = [
      { id: '7', name: 'Battering Ram' },
      { id: '8', name: 'Fire Catapult' }
    ]
  } else if (tribeId == tribes.Teutons) {
    barracksOptions = [
      { id: '11', name: 'Clubswinger' },
      { id: '12', name: 'Spearfighter' },
      { id: '13', name: 'Axefighter' },
      { id: '14', name: 'Scout' }
    ]
    stableOptions = [
      { id: '15', name: 'Paladin' },
      { id: '16', name: 'Teutonic Knight' }
    ]
    workshopOptions = [
      { id: '17', name: 'Ram' },
      { id: '18', name: 'Catapult' }
    ]
  } else if (tribeId == tribes.Gauls) {
    barracksOptions = [
      { id: '1', name: 'Phalanx' },
      { id: '2', name: 'Swordsman' }
    ]
    stableOptions = [
      { id: '3', name: 'Pathfinder' },
      { id: '4', name: 'Theutates Thunder' },
      { id: '5', name: 'Druidrider' },
      { id: '6', name: 'Haeduan' }
    ]
    workshopOptions = [
      { id: '7', name: 'Ram' },
      { id: '8', name: 'Trebuchet' }
    ]
  }

  const addRecruits = useCallback(async () => {
    let occupiedBuildingsTemp = [...occupiedBuildings]
    let recruits = {}
    if (barracksTroop != emptyString) {
      occupiedBuildingsTemp[0] = true
      recruits['19'] = barracksTroop
    }
    if (stableTroop != emptyString) {
      occupiedBuildingsTemp[1] = true
      recruits['20'] = stableTroop
    }
    if (workshopTroop != emptyString) {
      occupiedBuildingsTemp[2] = true
      recruits['21'] = workshopTroop
    }
    setOccupiedBuildings(occupiedBuildingsTemp)
    await handleAddRecruits(recruits)
  }, [barracksTroop, handleAddRecruits, occupiedBuildings, setOccupiedBuildings, stableTroop, workshopTroop])

  const onDeleteQueue = useCallback(async () => {
    setOccupiedBuildings([false, false, false])
    await handleClearQueue()
  }, [handleClearQueue, setOccupiedBuildings])

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item xs={2} md={2} lg={2}>
        <TextField label={`Barracks ${occupiedBuildings[0] ? 'is recruiting' : 'is not recruiting'}`} error disabled></TextField>
        <Autocomplete
          label={'Choose barracks troop'}
          isClearable
          disabled={occupiedBuildings[0]}
          simpleValue
          value={barracksTroop}
          onChange={setBarracksTroop}
          options={barracksOptions}
        />
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <TextField label={`Stables ${occupiedBuildings[1] ? 'is recruiting' : 'is not recruiting'}`} error disabled></TextField>
        <Autocomplete
          label={'Choose stable troop'}
          isClearable
          disabled={occupiedBuildings[1]}
          simpleValue
          value={stableTroop}
          onChange={setStableTroop}
          options={stableOptions}
        />
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <TextField label={`Workshop ${occupiedBuildings[2] ? 'is recruiting' : 'is not recruiting'}`} error disabled></TextField>
        <Autocomplete
          label={'Choose workshop troop'}
          isClearable
          disabled={occupiedBuildings[2]}
          simpleValue
          value={workshopTroop}
          onChange={setworkshopTroop}
          options={workshopOptions}
        />
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <Button variant='contained' size='large' onClick={addRecruits}>
          Submit Troops
        </Button>
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <Button variant='contained' size='large' onClick={onDeleteQueue}>
          Clear Troops
        </Button>
      </Grid>
    </Grid>
  )
}

RecruitStats.propTypes = {
  handleAddRecruits: PropTypes.func,
  handleClearQueue: PropTypes.func,
  occupiedBuildings: PropTypes.array,
  setOccupiedBuildings: PropTypes.func,
  tribeId: PropTypes.string
}
