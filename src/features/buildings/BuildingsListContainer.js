import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { env } from 'utils/env'

const mongoose = require('mongoose')

export const BuildingListContainer = () => {
  console.log(env.REACT_APP_MONGODB_LINK)
  console.log(mongoose.Mongoose)
  const [mongoConnection, setMongoConnection] = useState()
  const connectMongo = useCallback(async () => {
    const aa = await mongoose.connect(env.REACT_APP_MONGODB_LINK)
    setMongoConnection(aa)
  }, [])
  console.log(mongoConnection)
  useEffect(() => {
    connectMongo()
  }, [connectMongo])
  return null
}
