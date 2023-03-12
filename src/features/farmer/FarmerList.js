import React, { useCallback, useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { CardTitle, IconCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { Assessment } from '@material-ui/icons'
import getTheme from 'utils/theme'
import tableStyle from 'assets/jss/components/tableStyle'
import { FarmerListItem } from './FarmerListItem'
import { IconButton } from '@totalsoft_oss/rocket-ui.core'
import { Group, Remove, WatchLater } from '@mui/icons-material'
import { TextField } from '@mui/material'

const useStyles = makeStyles(tableStyle(getTheme()))

export const FarmerList = ({ possibleFarms, handleAddVillageToFarmList, orderFunction, onRemovePossibleFarm, handleRemoveFarm }) => {
  const { table, tableHeader, enableScrollX } = useStyles()
  const [xCoordToDelete, setXCoordToDelete] = useState(0)
  const [yCoordToDelete, setYCoordToDelete] = useState(0)
  const onRemoveFarm = useCallback(async () => {
    await handleRemoveFarm(xCoordToDelete, yCoordToDelete)
  }, [handleRemoveFarm, xCoordToDelete, yCoordToDelete])

  const changeXCoord = useCallback(e => {
    setXCoordToDelete(e.target.value)
  }, [])

  const changeYCoord = useCallback(e => {
    setYCoordToDelete(e.target.value)
  }, [])

  const orderByPop = useCallback(() => {
    orderFunction('pop')
  }, [orderFunction])

  const orderByDate = useCallback(() => {
    orderFunction('date')
  }, [orderFunction])

  return (
    <IconCard
      icon={Assessment}
      iconColor='themeWithGradient'
      title={
        <CardTitle
          title={'Possible farms'}
          actions={[
            <TextField key='xCoord' label={'X Coord to remove from farm'} value={xCoordToDelete} onChange={changeXCoord} />,
            <TextField key='yCoord' label={'Y Coord to remove from farm'} value={yCoordToDelete} onChange={changeYCoord} />,
            <IconButton title='Remove Farm from farmlist by coords' key={'removeFromFarmList'} onClick={onRemoveFarm}>
              <Remove />
            </IconButton>,
            <IconButton title='Order by date' key={'orderByDate'} onClick={orderByDate}>
              <WatchLater />
            </IconButton>,
            <IconButton title='Order by population' key={'orderByPopulation'} onClick={orderByPop}>
              <Group />
            </IconButton>
          ]}
        />
      }
      content={
        <>
          <Grid className={enableScrollX}>
            <Table className={table}>
              <Thead>
                <Tr>
                  <Th className={tableHeader}>{'Parsed Date'}</Th>
                  <Th className={tableHeader}>{'Tribe'}</Th>
                  <Th className={tableHeader}>{'Troops'}</Th>
                  <Th className={tableHeader}>{'Residence Level'}</Th>
                  <Th className={tableHeader}>{'Wall level'}</Th>
                  <Th className={tableHeader}>{'Water ditch level'}</Th>
                  <Th className={tableHeader}>{'Population'}</Th>
                  <Th className={tableHeader}>{'Coordinates'}</Th>
                  <Th className={tableHeader}>{'Number of troops'}</Th>
                  <Th className={tableHeader}>{'Actions'}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {possibleFarms?.map((farm, i) => (
                  <FarmerListItem
                    key={i}
                    farm={farm}
                    villageId={farm?.villageId}
                    handleAddVillageToFarmList={handleAddVillageToFarmList}
                    onRemovePossibleFarm={onRemovePossibleFarm}
                  />
                ))}
              </Tbody>
            </Table>
          </Grid>
        </>
      }
    ></IconCard>
  )
}

FarmerList.propTypes = {
  possibleFarms: PropTypes.array,
  handleAddVillageToFarmList: PropTypes.func,
  orderFunction: PropTypes.func,
  onRemovePossibleFarm: PropTypes.func,
  handleRemoveFarm: PropTypes.func
}
