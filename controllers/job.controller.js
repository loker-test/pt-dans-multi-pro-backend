const axios = require("axios");

const datasetApi = 'http://dev3.dansmultipro.co.id/api'

const getJobList = async (req, res) => {
  const params = {}

  const reqParams = req.query
  if (reqParams?.search !== undefined) params.description = reqParams.search
  if (reqParams?.location !== undefined) params.location = reqParams.location
  if (reqParams?.full_time !== undefined) params.full_time = true
  if (reqParams?.page !== undefined) params.page = reqParams.page

  const dataset = await axios.get(datasetApi+'/recruitment/positions.json', {
    params: params
  })

  res.json({
    message: 'success get job list',
    data: dataset.data
  })
}

const getJobDetail = async (req, res) => {
  const details = await axios.get(`${datasetApi}/recruitment/positions/${req.params.id}`)

  res.json({
    message: 'success get job detail',
    data: details.data
  })
}

module.exports = {
  getJobList,
  getJobDetail,
}
