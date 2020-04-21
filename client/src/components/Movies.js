import React from "react";
import axios from "axios";

import Favorite from "./Favorite";

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      Results: {},
      loading: false,
      message: "",
      totalResult: 0,
      totalPages: 0,
      currentPageNo: 0,
      favoriteList: [],
    };
    this.cancel = "";
  }

  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  componentWillMount = (updatedPageNo = "", query) => {
    // to get page number automatically
    let pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `/movies/${query}/${pageNumber}`;

    // to cancel results if user back space and types in new request
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        //   get response of total results
        const total = res.data.resultCount;
        const totalPagesCount = this.getPageCount(total, 20);
        const resultNotFound = !res.data.results.length
          ? "There are no more search results. Please try a new search"
          : "";
        //   set state
        this.setState({
          Results: res.data.results,
          message: resultNotFound,
          totalResult: total,
          totalPages: totalPagesCount,
          currentPageNo: updatedPageNo,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch the data",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    //if nothing on query set state to empty
    if (!query) {
      this.setState({
        query,
        Results: {},
        message: "",
        totalPages: 0,
        totalResult: 0,
      });
    } else {
      this.setState({ query: query, loading: true, message: "" }, () => {
        this.componentWillMount(1, query);
      });
    }
  };

  //addToFavorite
  addToFavorite = (index, previewUrl, trackName, artworkUrl100) => {
    const { favoriteList } = this.state;

    let item = {
      id: index,
      link: previewUrl,
      title: trackName,
      img: artworkUrl100,
    };

    this.setState({ favoriteList: [...favoriteList, item] });

    console.log(favoriteList);
  };

  renderSearchResults = () => {
    const { Results } = this.state;
    // set state for search results
    if (Object.keys(Results).length && Results.length) {
      return (
        <div className="container results">
          {Results.map((result, index) => {
            return (
              <div key={index} className="card">
                <a href={result.previewUrl} />
                <p>
                  <i class="fa fa-film"></i> {result.trackCensoredName}
                </p>

                <h6 className="image-username">{result.artistName}</h6>
                <div className="image-wraper">
                  <img
                    className="image"
                    src={result.artworkUrl100}
                    alt={result.artistName}
                  />
                </div>

                <div>
                  <button
                    className="btn btn-success"
                    color="outline-success"
                    size="sm"
                    onClick={this.addToFavorite.bind(
                      this,
                      index,
                      result.previewUrl,
                      result.artistName,
                      result.artworkUrl100
                    )}
                  >
                    addToFavorite
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const {
      query,

      favoriteList,
    } = this.state;

    console.log(favoriteList);

    return (
      <div className="container">
        {/* favorite pass props */}
        {favoriteList.length ? <Favorite favoriteList={favoriteList} /> : null}

        {/* Heading*/}
        <h2 className="heading">Search For Movies Below</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>

        {/* Results */}
        <div className="results container">{this.renderSearchResults()}</div>
      </div>
    );
  }
}

export default Movies;
