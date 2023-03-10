import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { IconCard } from '@bit/totalsoft_oss.react-mui.kit.core'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import { emptyObject } from 'utils/constants'
import { Button, Grid } from '@mui/material'
import { Autocomplete } from '@totalsoft_oss/rocket-ui.core'

export const SpierFilter = ({ filter, onApplyFilter, onResetFilter, options }) => {
  const [localFilter, setLocalFilter] = useState(filter)
  const handleResetFilter = useCallback(() => {
    setLocalFilter(emptyObject)
    onResetFilter()
  }, [onResetFilter])

  const handleApplyFilter = useCallback(() => {
    onApplyFilter(localFilter)
  }, [localFilter, onApplyFilter])

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

SpierFilter.propTypes = {
  onResetFilter: PropTypes.func,
  onApplyFilter: PropTypes.func,
  filter: PropTypes.object,
  options: PropTypes.array,
  buildingType: PropTypes.string
}
