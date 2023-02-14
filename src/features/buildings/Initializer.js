import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { emptyString } from 'utils/constants'
import { useCallback } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { usePlayerInfos } from 'hooks/usePlayerInfos'

export const Initializer = ({ getBuildings }) => {
  const [worldNameLocal, setWorldNameLocal] = useState(emptyString)
  const { setPlayerInfo } = usePlayerInfos()

  const [playerId, setPlayerId] = useState(emptyString)
  const handleWorldNameChanged = useCallback(
    e => {
      setWorldNameLocal(e.target.value)
    },
    [setWorldNameLocal]
  )
  const handlePlayerIdChanged = useCallback(
    e => {
      setPlayerId(e.target.value)
    },
    [setPlayerId]
  )
  const handleGetBuildings = useCallback(() => {
    if (!worldNameLocal || !playerId) return
    setPlayerInfo(playerId, worldNameLocal)
    getBuildings(playerId, worldNameLocal)
  }, [worldNameLocal, playerId, setPlayerInfo, getBuildings])
  return (
    <Grid container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={3}>
      <Grid item xs={2} md={2} lg={2}>
        <TextField label={'World Name'} fullWidth value={worldNameLocal} onChange={handleWorldNameChanged}></TextField>
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <TextField label={'Player id'} fullWidth value={playerId} onChange={handlePlayerIdChanged}></TextField>
      </Grid>
      <Grid item xs={2} sm={2} lg={2}>
        <Button variant='contained' size='large' onClick={handleGetBuildings}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

Initializer.propTypes = {
  getBuildings: PropTypes.func
}
