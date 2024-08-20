import { useState, useEffect } from "react";
import { RootState } from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from './state/favorite/favorite';

export interface Colors {
    id: number;
    title: string;
    userName: string;
    numViews: number;
    numVotes: number;
    numComments: number;
    numHearts: number;
    rank: number;
    dateCreated: string;
    hex: string;
    rgb: Rgb;
    hsv: Hsv;
    description: string;
    url: string;
    imageUrl: string;
    badgeUrl: string;
    apiUrl: string;
}
export interface Rgb {
    red: number;
    green: number;
    blue: number;
}
export interface Hsv {
    hue: number;
    saturation: number;
    value: number;
}

const URL = 'http://localhost:8080/colors';

function DisplayColor() {

    const [data, setData] = useState<Colors[]>([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.colors);

    //get data from node.js
    //cannot directly got api from here because of
    //Access to fetch at 'https://www.colourlovers.com/api/colors/new?format=json' from origin 'http://localhost:3000' has been blocked by CORS policy: 
    //No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 
    //'no-cors' to fetch the resource with CORS disabled.

    //so use node js to fetch the data first and then fetch the data from node js to here
    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(URL);
            const result: Colors[] = await res.json();
            console.log(result);
            setData(result);
        }
        fetchData();
    }, []);

    //to set favorite
    const toggleFavorite = (color: Colors) => {
        //check favorite list
        //if color.id == fav.id means already in favorite list, you can only remove it
        //else the color is not yet inside the favorite list yet, you can only add it
        if (favorites.some(fav => fav.id === color.id)) {
            dispatch(removeFavorite(color.id));
        } else {
            dispatch(addFavorite(color));
        }
    };

    console.log(search);

    return (

        <div className="container" style={{ width: "40vw" }}>
            {/*/search bar */}
            <form style={{ marginTop: "1vh" }}>
                <input className="form-control" type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Enter hex value"></input>
            </form>
            {/*/If search bar is empty return all else return the color matches with search bar */}
            {data.filter((color) => {
                return search.toLowerCase() === ''
                    ? color
                    : color.hex.toLowerCase().includes(search);
            }).map(color => (
                <div style={{ height: "45vh", marginBottom: "5vh", marginTop: "5vh", width: "40vw", textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="card" key={color.id}>
                    <a href={color.url} target="_blank">
                        <div style={{ position: "relative" }}>
                            <img className="card-img-top" src={color.imageUrl} width={100} height={250}></img>
                            <span className="badge badge-light" style={{ position: "absolute", color: "black", left: "1vw", top: "1vh", backgroundColor: "white" }}>{color.hex}</span>
                        </div>
                    </a>
                    <h2 className="card-title">Color data</h2>
                    <div className="card-text">
                        <table className="table table-bordered">
                            <thead>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Username</th>
                                <th scope="col">Views</th>
                                <th scope="col">Votes</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Hearts</th>
                                <th scope="col">Rank</th>
                                <th scope="col">Date Created</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">{color.id}</td>
                                    <td>{color.title}</td>
                                    <td>{color.userName}</td>
                                    <td>{color.numViews}</td>
                                    <td>{color.numVotes}</td>
                                    <td>{color.numComments}</td>
                                    <td>{color.numHearts}</td>
                                    <td>{color.rank}</td>
                                    <td>{color.dateCreated}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/*Button to add favorite and remove favorite*/}
                    <button className="btn btn-light" onClick={() => toggleFavorite(color)}>{favorites.some(fav => fav.id === color.id) ? "Remove Favorite" : "Add Favorite"}</button>
                </div>
            ))}
        </div>
    );
}

export default DisplayColor;
