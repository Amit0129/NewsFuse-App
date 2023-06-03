import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    console.log("Iam a  const of News Componet");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("CDm");
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=5cee09a6278c4537bc605b90a759bd39&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
  }
  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5cee09a6278c4537bc605b90a759bd39&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    
      console.log("Next");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5cee09a6278c4537bc605b90a759bd39&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsFuse - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => {
            // console.log(element)
            return <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title ? element.title : ""}
              description={element.description ? element.description : ""}
              imageUrl={
                element.urlToImage
                  ? element.urlToImage
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOinP1I4DJR8UXKbif9pXj4UTa1dar-CfGBr4mmSXNfOySMXxPfwa023_n0gvkdK4mig&usqp=CAU"
              }
              newsUrl={element.url}
            />
          </div>
              
            
          })}
        </div>
        <div className="cointainer d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-outline-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handleNextClick}
            disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
