import React, { useCallback, useState } from 'react'
import { Tr, Td } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import getTheme from 'utils/theme'
import buildingStyle from 'features/buildings/styles/styles'
import { IconButton } from '@totalsoft_oss/rocket-ui.core'
import { Add } from '@mui/icons-material'
import { TextField } from '@mui/material'

const useStyles = makeStyles(buildingStyle(getTheme()))

export const FarmerListItem = ({ farm, villageId, handleAddVillageToFarmList }) => {
  const { tableContent } = useStyles()
  const [troopsToSend, setTroopsToSend] = useState(0)

  const onAddVillageToFarmList = useCallback(async () => {
    await handleAddVillageToFarmList(villageId, farm?.tribe, troopsToSend, farm?.coordinates?.x_coord, farm?.coordinates?.y_coord)
  }, [farm?.coordinates?.x_coord, farm?.coordinates?.y_coord, farm?.tribe, handleAddVillageToFarmList, troopsToSend, villageId])

  const changeTroops = useCallback(e => {
    setTroopsToSend(parseInt(e.target.value))
  }, [])

  return (
    <>
      <Tr>
        <Td className={tableContent}>{<h5>{farm?.tribe}</h5>}</Td>
        <Td className={tableContent}>
          <h5>{farm?.troops}</h5>
        </Td>
        <Td className={tableContent}>
          <h5>{farm?.residence_palace_level}</h5>
        </Td>
        <Td className={tableContent}>
          <h5>{farm?.wall_level}</h5>
        </Td>
        <Td className={tableContent}>
          <h5>{farm?.water_ditch_level}</h5>
        </Td>
        <Td className={tableContent}>
          <h5>{farm?.villagePopulation}</h5>
        </Td>
        <Td className={tableContent}>
          <h5>{`x: ${farm?.coordinates?.x_coord} y: ${farm?.coordinates?.y_coord}`}</h5>
        </Td>
        <Td className={tableContent}>
          <TextField type='number' label={'Number of troops to send'} value={troopsToSend} onChange={changeTroops} />
        </Td>
        <Td className={tableContent}>
          <IconButton
            title='Add in farm list'
            color={'successNoBackground'}
            size={'small'}
            onClick={onAddVillageToFarmList}
            fontSize={'small'}
          >
            <Add size={'small'} />
          </IconButton>
        </Td>
      </Tr>
    </>
  )
}

FarmerListItem.propTypes = {
  farm: PropTypes.object,
  villageId: PropTypes.string,
  handleAddVillageToFarmList: PropTypes.func
}
