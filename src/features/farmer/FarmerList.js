import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { IconCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { Assessment } from '@material-ui/icons'
import getTheme from 'utils/theme'
import tableStyle from 'assets/jss/components/tableStyle'
import { FarmerListItem } from './FarmerListItem'

const useStyles = makeStyles(tableStyle(getTheme()))

export const FarmerList = ({ possibleFarms, handleAddVillageToFarmList }) => {
  const { table, tableHeader, enableScrollX } = useStyles()
  return (
    <IconCard
      icon={Assessment}
      iconColor='themeWithGradient'
      title={'Possible farms'}
      content={
        <>
          <Grid className={enableScrollX}>
            <Table className={table}>
              <Thead>
                <Tr>
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
                {Object.keys(possibleFarms)?.map((farm, i) => (
                  <FarmerListItem
                    key={i}
                    farm={possibleFarms[farm]}
                    villageId={farm}
                    handleAddVillageToFarmList={handleAddVillageToFarmList}
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
  possibleFarms: PropTypes.object,
  handleAddVillageToFarmList: PropTypes.func
}
