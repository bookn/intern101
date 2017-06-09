const UserLog = require('./models/UserLog')

const dummy = UserLog({
  userId: '5938f00a762ddb3642ac7399',
  action: 'test action',
  timestamp: new Date()
})

dummy.save((err) => {
  if (err) console.log(err)
  else console.log('create user success')
})
