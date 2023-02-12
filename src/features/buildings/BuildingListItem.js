import React, { useCallback } from 'react'
import { Tr, Td } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import getTheme from 'utils/theme'
import buildingStyle from './styles/styles'
import { buildingNames, buildingTypes } from 'utils/constants'
import { isNil } from 'ramda'
import { Autocomplete, IconButton } from '@totalsoft_oss/rocket-ui.core'
import { useState } from 'react'
import { Add } from '@mui/icons-material'

const useStyles = makeStyles(buildingStyle(getTheme()))

export const BuildingListItem = ({ building, buildingType, handleAddBuild }) => {
  const { tableContent } = useStyles()
  const [desiredLevel, setDesiredLevel] = useState(0)
  const onAddBuild = useCallback(() => {
    if(desiredLevel == 0) return
    handleAddBuild(building, desiredLevel)
  }, [building, desiredLevel, handleAddBuild])
  if (buildingType == buildingTypes.Resources) {
    if (building?.buildingType != '1' && building?.buildingType != '2' && building?.buildingType != '3' && building?.buildingType != '4')
      return null
  }
  if (buildingType == buildingTypes.Buildings)
    if (building?.buildingType == '1' || building?.buildingType == '2' || building?.buildingType == '3' || building?.buildingType == '4')
      return null
  if (isNil(buildingNames[building?.buildingType]) || building?.lvl == '0') return null

  var levelOptions = []
  const lowEnd = parseInt(building?.lvl) + 1
  const highEnd = parseInt(building?.lvlMax)
  for (var i = lowEnd; i <= highEnd; i++) {
    levelOptions.push(i)
  }
  return (
    <>
      <Tr>
        <Td className={tableContent}>{<h5>{buildingNames[building?.buildingType]}</h5>}</Td>
        <Td className={tableContent}>
          <h5>{building?.lvl}</h5>
        </Td>
        <Td className={tableContent}>
          <Autocomplete
            label={'Desired level'}
            fullWidth
            required
            simpleValue
            options={levelOptions}
            onChange={setDesiredLevel}
            value={desiredLevel}
          ></Autocomplete>
        </Td>
        <Td>
          <IconButton color={'successNoBackground'} size={'small'} onClick={onAddBuild} fontSize={'small'}>
            <Add size={'small'} />
          </IconButton>
        </Td>
      </Tr>
    </>
  )
}

BuildingListItem.propTypes = {
  building: PropTypes.object,
  buildingType: PropTypes.string,
  handleAddBuild: PropTypes.func
}
