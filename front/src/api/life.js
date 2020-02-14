function getAllLife() {
  return new Promise((resolve, reject) => {
    axios.get("/api/life/getAllLife").then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//123123

function getLifePage(params) {
  return new Promise((resolve, reject) => {
    axios.post("/api/life/getLifePage", params).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}


function getLifeContent(params) {
  return new Promise((resolve, reject) => {
    axios.post("/api/life/getLifeContent", params).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export {
  getLifePage,
  getAllLife,
  getLifeContent
}
