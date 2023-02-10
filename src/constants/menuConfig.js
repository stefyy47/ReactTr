import React from 'react'
import { Settings, Security, Lock, Groups } from '@mui/icons-material'
import identityUserRoles from 'constants/identityUserRoles'
import permissions from 'constants/permissions'
const { globalAdmin, admin, user } = identityUserRoles
const { viewSettings } = permissions

const menuItems = [
  // { icon: <Dashboard />, text: 'NavBar.Dashboard', path: '/dashboard', name: 'Dashboard', roles: [], rights: [] },
  // { icon: <AccountBox />, text: 'NavBar.Voting', path: '/voting', name: 'Voting', roles: [], rights: [] },
  { icon: <Groups />, text: 'Buildings', path: '/buildings', name: 'Buildings', roles: [], rights: [] },
  {
    icon: <Settings />,
    text: 'NavBar.Settings',
    name: 'Settings',
    roles: [admin, user, globalAdmin],
    rights: [viewSettings],
    children: [
      { icon: <Security />, text: 'NavBar.Security', path: '/settings/security', name: 'Security' },
      {
        icon: <Lock />,
        text: 'NavBar.Privacy',
        path: '/settings/privacy',
        name: 'Privacy'
      }
    ]
  }
]

export default menuItems
