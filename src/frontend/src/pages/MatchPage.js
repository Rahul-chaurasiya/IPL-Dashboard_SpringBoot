import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.css';

export const MatchPage = () => {
    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();
    useEffect(
        () => {
            const fetchMatches = async () => {

                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
                // const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
                console.log(data);
            };
            fetchMatches();
        }, [teamName,year]
    );
 

    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h2> Select Year </h2>
                <div><YearSelector teamName={teamName} /></div>
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {
                    matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
                }
            </div>

        </div>
    );
}