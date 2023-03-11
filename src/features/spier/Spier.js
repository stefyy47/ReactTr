import { NotStarted } from '@mui/icons-material'
import { Button, Grid, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'

export const Spier = ({handleAddSpyMission}) => {
  const [minPop, setMinPop] = useState()
  const [maxPop, setMaxPop] = useState()
  const [spies, setSpies] = useState()

  const changeMinPop = useCallback(e => {
    setMinPop(e.target.value)
  }, [])

  const changeMaxPop = useCallback(e => {
    setMaxPop(e.target.value)
  }, [])

  const changeSpies = useCallback(e => {
    setSpies(e.target.value)
  }, [])

  const onAddSpyMission = useCallback(() => {
    if(isNil(minPop) || isNil(maxPop) || isNil(spies)) return
    handleAddSpyMission(minPop, maxPop, spies)
  }, [handleAddSpyMission, maxPop, minPop, spies])

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <TextField fullWidth type='number' label={'Min population'} value={minPop} onChange={changeMinPop}></TextField>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TextField fullWidth type='number' label={'Max population'} value={maxPop} onChange={changeMaxPop}></TextField>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TextField fullWidth type='number' label={'NumberOfSpies'} value={spies} onChange={changeSpies}></TextField>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Button onClick={onAddSpyMission} size={'large'} startIcon={<NotStarted />}>
          {'Submit spy mission'}
        </Button>
      </Grid>
    </Grid>
  )
}

Spier.propTypes = {
    handleAddSpyMission: PropTypes.func
}
