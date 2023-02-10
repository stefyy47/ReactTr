import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'

function Dashboard() {
  const [/*authenticated*/, setauthenticated] = useState('')
  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated')
    if (loggedInUser) {
      setauthenticated(loggedInUser)
    }
  }, [])
  return (
    <>
      <Typography>This is my dashboard...</Typography>
      <Grid>This can be seen by any logged in users.</Grid>
    </>
  )
}
export default Dashboard
