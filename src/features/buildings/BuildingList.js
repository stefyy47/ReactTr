import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { CardTitle, DeleteButton, IconCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { Assessment } from '@material-ui/icons'
import getTheme from 'utils/theme'
import tableStyle from 'assets/jss/components/tableStyle'
import { BuildingListItem } from './BuildingListItem'

const useStyles = makeStyles(tableStyle(getTheme()))

export const BuildingList = ({ buildingList, buildingType, handleAddBuild, handleRemoveQueue }) => {
  const { table, tableHeader, enableScrollX } = useStyles()
  return (
    <IconCard
      icon={Assessment}
      iconColor='themeWithGradient'
      title={
        <CardTitle
          title={"Buildings"}
          actions={[
            <DeleteButton key='DeleteBuilding' title={"Delete queue"} fontSize='medium' color='themeWithGradient' onClick={handleRemoveQueue} />
          ]}
        />
      }
      content={
        <>
          <Grid className={enableScrollX}>
            <Table className={table}>
              <Thead>
                <Tr>
                  <Th className={tableHeader}>{"Name"}</Th>
                  <Th className={tableHeader}>{"Current level"}</Th>
                  <Th className={tableHeader}>{"Next level"}</Th>
                  <Th className={tableHeader}>{"Add it"}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {buildingList?.map((building, i) => (
                  <BuildingListItem handleAddBuild={handleAddBuild} key={i} building={building?.data} buildingType={buildingType}/>
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
  handleRemoveQueue: PropTypes.func
}
