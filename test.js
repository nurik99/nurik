const axios = require('axios')

const http = axios.create({
  baseURL: 'https://api.pinnacle.com/v1',
  timeout: 5000,
  headers: {Authorization: 'Basic U03MyOT23YbzMDc6d3c3O1DQ1'}
})


http.get('/fixtures?sportId=1')
	.then(response => console.log(response))
	.catch(err => console.log(err))
