function getAllArticle() {
  return new Promise((resolve, reject) => {
    axios.get("/api/article/getAllArticle").then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}


function getArticlePage(params) {
  return new Promise((resolve, reject) => {
    axios.post("/api/article/getArticlePage", params).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export {
  getArticlePage,
  getAllArticle
}
