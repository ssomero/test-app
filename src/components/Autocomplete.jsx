import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';
import axios from 'axios';

import './Autocomplete.css'

const ITEMS_API_URL = 'https://www.omdbapi.com/?apikey=3ca37a42';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function Autocomplete() {
    const [queryString, setQueryString] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const timeoutRef = useRef(null);


    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {


            if (queryString) {
                setIsLoading(true);

                axios.get(ITEMS_API_URL, { params: { s: queryString } })
                    .then(response => {
                        console.log(response);
                        setResults(response.data.Search);
                    })
                    .catch(error => {
                        console.log(`An error occurreA: ${error}`);
                    })
                    .then(() => {
                        console.log("then");
                        setTimeout(() => { setIsLoading(false); }, 5000);
                    })
            }
        }, 500)
    }, [queryString]);

    useEffect(() => {
        console.log("hei");
    }, [results]);

    const renderResult = (result, index) => {
        return <div className="list-item" key={index}>{result.Title}</div>
    };

    const resultItems = () => {
        return (
            results.map((result, index) => renderResult(result, index))
        )
    }

    const loader = () => {
        return (
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        );
    }
    return (
        <div className="wrapper">
            <div className={classnames("control", { 'is-loading': isLoading })}>
                <label>Search for movies</label>
                <input type="text" className="search-input" onChange={(e) => setQueryString(e.target.value)} />
            </div>
            {isLoading &&
            loader()}
            {!isLoading && results &&
                <div className="list is-hoverable">
                    {resultItems()}
                </div>
            }
        </div>
    );
}