import React, { useState, useEffect } from "react";

export default function FetchApi() {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState({});
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        const arr = [...res.slice(0, 10)];
        setPhotos(arr);
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        const objAlbums = {};
        res.forEach((item) => {
          objAlbums[item.id] = item;
        });
        console.log(objAlbums);
        setAlbums(objAlbums);
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    let arr = [];
    photos.forEach((itemP) => {
      if (albums[itemP.albumId]) {
        console.log(albums[itemP.albumId]);
        const itemA = albums[itemP.albumId];
        console.log(itemA);
        let obj = {
          PhotoID: itemP.id,
          AlbumTitle: itemA.title,
          PhotoTitle: itemP.title,
          URLImage: itemP.url,
          ThumbnailURLImage: itemP.thumbnailUrl,
        };
        arr.push(obj);
      }
      //console.log(itemP);
      /*albums.forEach((itemA) => {
        //console.log(itemA);
        if (itemP.albumId === itemA.id) {
          //console.log(itemP.id, itemA.albumId);
          let obj = {
            PhotoID: itemP.id,
            AlbumTitle: itemA.title,
            PhotoTitle: itemP.title,
            URLImage: itemP.url,
            ThumbnailURLImage: itemP.thumbnailUrl,
          };
          arr.push(obj);
        }
      });*/
    });
    setResult(arr);
  }, [albums]);

  function handleOnDelete(idx) {
    let array = [...result];
    array.splice(idx, 1);
    setResult(array);
  }

  return (
    <>
      <div className="table-responsive-md">
        <table className="table table-bordered table-hover table-striped table-info">
          <thead>
            <tr className="tr">
              <th scope="col">PhotoID</th>
              <th scope="col">AlbumTitle</th>
              <th scope="col">PhotoTitle</th>
              <th scope="col">URLImage</th>
              <th scope="col">ThumbnailURLImage</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.PhotoID}</td>
                  <td>{item.AlbumTitle}</td>
                  <td>{item.PhotoTitle}</td>
                  <td>{item.URLImage}</td>
                  <td>
                    <img src={item.ThumbnailURLImage} />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => handleOnDelete(i)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
