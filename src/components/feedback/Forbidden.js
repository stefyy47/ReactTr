import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import Typography from '@totalsoft_oss/rocket-ui.components.data-display.typography'
import Button from '@totalsoft_oss/rocket-ui.components.buttons.button'
import forbiddenIcon from './forbidden.png'

const Forbidden = ({ forbiddenText, forbiddenButtonText }) => {
  const handleForbiddenButton = useCallback(() => {
    history.push('/login')
  }, [])

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
      <Grid item>
        <img src={forbiddenIcon} alt='ForbiddenIcon' />
      </Grid>
      <Grid item>
        <Typography variant={'h6'} emphasis='bold'>
          {forbiddenText}
        </Typography>
      </Grid>
      <Grid item>
        <Button size={'medium'} color={'primary'} onClick={handleForbiddenButton}>
          {forbiddenButtonText}
        </Button>
      </Grid>
    </Grid>
  )
}

Forbidden.defaultProps = {
  forbiddenText: 'Nu aveti permisiuni sa vizualizati aceasta pagina.',
  forbiddenButtonText: 'Logare aplicatie'
}

Forbidden.propTypes = {
  /**
   * Text to be displayed
   */
  forbiddenText: PropTypes.string,
  /**
   * Text to be displayed on button
   */
  forbiddenButtonText: PropTypes.string
}

export default Forbidden
