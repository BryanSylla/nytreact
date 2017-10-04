import axios from "axios";

export default {
  // Gets the 5 articles from API search
  getArticles: function(querydata,res) {

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=682ae2a492344221a4a8cbadf359784e&q='
      + querydata.query +'&sort=newest&fl=web_url, headline, pub_date,_id,snippet')
  .catch(error => {
    console.log(error);
  });
},

  //Gets all saved articles
  getsavedArticles: function() {
    return axios.get("/api/articles/saved");
  },
  // Deletes the book with the given id
  deletesavedArticle: function(id) {
    return axios.delete("/api/articles/saved/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles/saved", articleData);
  }
};
