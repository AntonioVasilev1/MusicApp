import {html} from '../lib.js';
import {getAlbumsByName} from "../api/data.js";

const searchTemplate = (onSearch, onSearchChange, albums=[]) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" @input=${onSearchChange}>
            <button class="button-list" @click=${onSearch}>Search</button>
        </div>

        <h2>Results:</h2>
        <div class="search-result">
            ${albums.length === 0
                    ? html`<p class="no-result">No result.</p>`
                    : albums.map(albumCard)
            }
            
        </div>
    </section>`

const albumCard = (album) => html`
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${sessionStorage.length > 0
    ? html`
                        <div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>`
    : null}

        </div>
    </div>`;

export async function searchPage(ctx) {
    let currentSearch = '';

    const onSearchChange = (e) => {
        currentSearch = e.target.value;
    }

    const onSearch = (e) => {
        let name = currentSearch;

        getAlbumsByName(name)
            .then(albums => {
                ctx.render(searchTemplate(onSearch, onSearchChange, albums))
            })
    }
    ctx.render(searchTemplate(onSearch, onSearchChange));
}