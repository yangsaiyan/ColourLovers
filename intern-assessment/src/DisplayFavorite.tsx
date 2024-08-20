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

function DisplayFavorite() {

    const favorites = useSelector((state: RootState) => state.favorites.colors);
    const dispatch = useDispatch();

    const toggleFavorite = (color: Colors) => {
        if (favorites.some(fav => fav.id === color.id)) {
            dispatch(removeFavorite(color.id));
        } else {
            dispatch(addFavorite(color));
        }
    };

  return (
    //store favorite color using redux and display it
    <div className="container" style={{ width: "40vw" }}>
    {favorites.map(color => (
        <div style={{ height: "45vh", marginBottom: "5vh", marginTop: "5vh", width: "40vw", textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className="card" key={color.id}>
            <a href={color.url} target="_blank">
            <div style={{ position:"relative" }}>
                <img className="card-img-top" src={color.imageUrl} width={100} height={250}></img>
                <span className="badge badge-light" style={{ position:"absolute", color:"black", left:"1vw", top: "1vh", backgroundColor:"white"}}>{color.hex}</span>
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
            <button className="btn btn-light" onClick={() => toggleFavorite(color)}>{favorites.some(fav => fav.id === color.id) ? "Remove Favorite" : "Add Favorite"}</button>
        </div>
    ))}
</div>
  );
}

export default DisplayFavorite;
