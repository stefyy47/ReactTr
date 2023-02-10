import { emptyString } from 'utils/constants'
import { ballotListPager, envelopeListPager, meetingListPager, meetingListFilter, web3Info, defaultResetBallotData } from './cacheKeyFunctions'

// Here you define the default values for local apollo state (@client only values)
// https://www.apollographql.com/docs/react/local-state/local-state-management/

const envelopeDefaultListPager = {
  pageSize: 10,
  page: 0
}

const meetingDefaultListPager = {
  pageSize: 10,
  page: 0
}

const ballotDefaultListPager = {
  pageSize: 10,
  page: 0
}

const meetingDefaultListFilters = {
  onlyActive: true
}

const web3DefaultInfo = {
  address: emptyString,
  password: emptyString
}

const resetBallotDataDefaultValues = {
  resetInitialized: false,
  remainingResetTime: 0,
  resetBallotAddress: emptyString,
  remainingVotersForReset: 0,
  maxWaitSeconds: 0
}

export const defaults = {
  [ballotListPager]: ballotDefaultListPager,
  [envelopeListPager]: envelopeDefaultListPager,
  [meetingListPager]: meetingDefaultListPager,
  [meetingListFilter]: meetingDefaultListFilters,
  [web3Info]: web3DefaultInfo,
  [defaultResetBallotData]: resetBallotDataDefaultValues
}
