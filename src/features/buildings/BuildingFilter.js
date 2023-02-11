import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { IconCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import { emptyString } from 'utils/constants'
import { Button, Grid } from '@mui/material'
import { Autocomplete } from '@totalsoft_oss/rocket-ui.core'

export const BuildingFilter = ({ filter, onApplyFilter, onResetFilter, options, buildingType }) => {
  const [localFilter, setLocalFilter] = useState(filter)
  const [localBuildingType, setLocalBuildingType] = useState(buildingType)
  const optionsForBuildingTypes = [{"id": '0', "name": "All"}, {"id": '1', "name": "Resources"}, {"id": '2', "name": "Buildings"}]
  const handleResetFilter = useCallback(() => {
    setLocalFilter(emptyString)
    onResetFilter()
  }, [onResetFilter])

  const handleApplyFilter = useCallback(() => {
    onApplyFilter(localFilter, localBuildingType)
  }, [localBuildingType, localFilter, onApplyFilter])

  const handleEnterPressed = useCallback(
    event => {
      if (event.keyCode === 13) {
        onApplyFilter(localFilter)
      }
    },
    [localFilter, onApplyFilter]
  )

  return (
    <>
      <IconCard
        icon={SearchIcon}
        iconColor='themeWithGradient'
        content={
          <Grid container spacing={2} alignItems='flex-end' onKeyDown={handleEnterPressed}>
            <Grid item xs={12} md={12} lg={12}>
              <Autocomplete
                label={'Choose village'}
                fullWidth
                required
                options={options}
                valueKey={'villageId'}
                labelKey={'villageName'}
                onChange={setLocalFilter}
                value={localFilter}
              ></Autocomplete>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Autocomplete
                label={'Building Types'}
                fullWidth
                required
                simpleValue
                options={optionsForBuildingTypes}
                labelKey={'name'}
                onChange={setLocalBuildingType}
                value={localBuildingType}
              ></Autocomplete>
            </Grid>
          </Grid>
        }
      ></IconCard>
      <Grid container alignItems={'center'} alignContent={'flex-end'} justifyContent={'flex-end'} spacing={1}>
        <Grid item>
          <Button onClick={handleApplyFilter} size={'medium'} startIcon={<SendIcon />}>
            {"Apply filters"}
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleResetFilter} size={'medium'} startIcon={<DeleteIcon />}>
            {"Reset filters"}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

BuildingFilter.propTypes = {
  onResetFilter: PropTypes.func,
  onApplyFilter: PropTypes.func,
  filter: PropTypes.object,
  options: PropTypes.array,
  buildingType: PropTypes.string
}
