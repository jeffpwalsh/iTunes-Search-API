import React from "react";
// import { Table } from "reactstrap";

export default (props) => {
  const { favoriteList } = props;

  return (
    <div className="jumbotron">
      <h2>#Favorite List</h2>

      {favoriteList.map((item) => {
        return (
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Artist/Title</th>
                  <th scope="col">Preview</th>
                  <th scope="col">Thumbnail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.title}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td>
                    <img
                      className="favourite-image"
                      src={item.img}
                      alt={item.title}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
