import React, { useCallback, useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { AddButton, CardTitle, DeleteButton, IconCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { Assessment } from '@material-ui/icons'
import getTheme from 'utils/theme'
import tableStyle from 'assets/jss/components/tableStyle'
import { BuildingListItem } from './BuildingListItem'
import { Autocomplete } from '@totalsoft_oss/rocket-ui.core'
import { resourcesLevels } from 'utils/constants'

const useStyles = makeStyles(tableStyle(getTheme()))

export const BuildingList = ({ buildingList, buildingType, handleAddBuild, handleRemoveQueue, handleAddMultipleResources }) => {
  const { table, tableHeader, enableScrollX } = useStyles()
  const [allWoodworks, setAllWoodworks] = useState(0)
  const [allIronmines, setAllIronmines] = useState(0)
  const [allClaypits, setAllClaypits] = useState(0)
  const [allCroplands, setAllCroplands] = useState(0)
  const [allResources, setAllResources] = useState(0)
  const onAddMultipleResources = useCallback(async () => {
    handleAddMultipleResources(allWoodworks, allClaypits, allIronmines, allCroplands, allResources)
  }, [allClaypits, allCroplands, allIronmines, allResources, allWoodworks, handleAddMultipleResources])
  return (
    <IconCard
      icon={Assessment}
      iconColor='themeWithGradient'
      title={
        <CardTitle
          title={'Buildings'}
          actions={[
            <Autocomplete
              label='All Woodworks'
              key='woodworks'
              value={allWoodworks}
              onChange={setAllWoodworks}
              options={resourcesLevels}
            ></Autocomplete>,
            <Autocomplete
              label='All Claypits'
              key='claypits'
              value={allClaypits}
              onChange={setAllClaypits}
              options={resourcesLevels}
            ></Autocomplete>,
            <Autocomplete
              label='All Ironmines'
              key='ironmines'
              value={allIronmines}
              onChange={setAllIronmines}
              options={resourcesLevels}
            ></Autocomplete>,
            <Autocomplete
              label='All croplands'
              key='croplands'
              value={allCroplands}
              onChange={setAllCroplands}
              options={resourcesLevels}
            ></Autocomplete>,
            <Autocomplete
              label='All resources'
              key='resources'
              value={allResources}
              onChange={setAllResources}
              options={resourcesLevels}
            ></Autocomplete>,
            <AddButton
              key='AddMultipleResources'
              title={'ADD MULTIPLE RESOURCES BUILDINGS'}
              fontSize='medium'
              color='themeWithGradient'
              onClick={onAddMultipleResources}
            />,
            <DeleteButton
              key='DeleteEntireBuildingQueue'
              title={'Delete queue'}
              fontSize='medium'
              color='themeWithGradient'
              onClick={handleRemoveQueue}
            />
          ]}
        />
      }
      content={
        <>
          <Grid className={enableScrollX}>
            <Table className={table}>
              <Thead>
                <Tr>
                  <Th className={tableHeader}>{'Name'}</Th>
                  <Th className={tableHeader}>{'Current level'}</Th>
                  <Th className={tableHeader}>{'Next level'}</Th>
                  <Th className={tableHeader}>{'Add it'}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {buildingList?.map((building, i) => (
                  <BuildingListItem handleAddBuild={handleAddBuild} key={i} building={building?.data} buildingType={buildingType} />
                ))}
              </Tbody>
            </Table>
          </Grid>
        </>
      }
    ></IconCard>
  )
}

BuildingList.propTypes = {
  buildingList: PropTypes.array,
  buildingType: PropTypes.string,
  handleAddBuild: PropTypes.func,
  handleRemoveQueue: PropTypes.func,
  handleAddMultipleResources: PropTypes.func
}
