import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    articles: [],
    savedarticles: [],
    query: "",
    b_date: "",
    e_date: ""
  };

  componentDidMount() {
    
   this.loadsavedArticles();
  }

  loadArticles = (res) => {
    
        this.setState({ articles: res.data.response.docs, query: "", b_date: "", e_date: "" });
        console.log(this.state.articles);

  };

   loadsavedArticles = () => {
    API.getsavedArticles()
      .then(res =>
        this.setState({ savedarticles: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deletesavedArticle(id)
      .then(res => this.loadsavedArticles())
      .catch(err => console.log(err));
  };

saveArticle= (title, url,snippet) => {
API.saveArticle({
        title: title,
        url: url,
        snippet:snippet
      })
        .then(res => this.loadsavedArticles())
        .catch(err => console.log(err));
};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {

      API.getArticles({
        query: this.state.query,
        b_date: this.state.b_date,
        e_date: this.state.e_date
      })
        .then(res => this.loadArticles(res))
        //.catch(err => console.log(err));
    }
  };



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What NYT Articles Should I Look For?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="What are you looking for(required)"
              />
              <Input
                value={this.state.b_date}
                onChange={this.handleInputChange}
                name="b_date"
                placeholder="Enter Start Date (optional)"
              />

              <Input
                value={this.state.e_date}
                onChange={this.handleInputChange}
                name="e_date"
                placeholder="Enter End Date (optional)"
              />
              
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
         
          <Col size="md-6">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.web_url}>
                      <strong>
                        {article.headline.main} 
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveArticle(article.headline.main,article.web_url,article.snippet)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
         <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedarticles.length ? (
              <List>
                {this.state.savedarticles.map(savedarticle => (
                  <ListItem key={savedarticle._id}>
                  <Row>
                  <Col size="md-6">
                    <Link to={savedarticle.url}>
                      <strong>
                        {savedarticle.title} 
                      </strong>
                    </Link>
                    <p>
                    	{savedarticle.snippet} 
                    </p>
                    </Col>
                    <Col size="md-3">
                    Saved on: {savedarticle.date}
                    </Col>
                    <Col size="md-3">
                    <DeleteBtn onClick={() => this.deleteArticle(savedarticle._id)} />
                    </Col>
                    </Row>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Articles to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
