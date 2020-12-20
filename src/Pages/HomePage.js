import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import Switch from '../components/Switch';
import Typography from '../components/Typography';
import { css } from '@emotion/css';
import theme from '../Theme/theme';
import backgroundImage from '../assets/desktop/bg-pattern-header.svg';
import mobileBackgroundImage from '../assets/mobile/bg-pattern-header.svg';
import tabletBackgroundImage from '../assets/tablet/bg-pattern-header.svg';
import sunIcon from '../assets/desktop/icon-sun.svg';
import moonIcon from '../assets/desktop/icon-moon.svg';

const breakpoints = [300, 768, 1200]

const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)

function HomePage() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [count, setCount] = useState(12);
    const [filteredJobsData, setFilteredJobsData] = useState([]);
    const [jobsData, setJobsData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            fetch(
                'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
              )
            .then((res) => res.json())
            .then((data) => {
                setJobsData(data);
            });
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (jobsData.length > 0) {
            const filteredJobs = jobsData.slice(0,count);            
            for (let x in filteredJobs) {
                const currentDate = new Date();
                const jobPostDate = new Date(filteredJobs[x].created_at);
                const diffTime = Math.abs(currentDate - jobPostDate);
                const diffDays = Math.ceil(diffTime / ( 1000 * 60 * 60 * 24));
                const diffHours = Math.ceil(diffTime / ( 1000 * 60 * 60));
                if ( diffDays > 1 && diffDays < 8 ) {
                    filteredJobs[x].postedTime = `${diffDays-1}d`;
                } else if (diffDays > 7 && diffDays < 15) {
                    filteredJobs[x].postedTime = `${1}w`;
                } else if (diffDays > 14 && diffDays < 30 ) {
                    filteredJobs[x].postedTime = `${2}w`;
                } else if (diffDays > 30) {
                    filteredJobs[x].postedTime = `${1}m`;
                } else {
                    filteredJobs[x].postedTime = `${diffHours}h`;
                }
            }
            setFilteredJobsData(filteredJobs);
        }
    }, [count, jobsData])

    const toggleDarkTheme = () => {
        setDarkTheme(prevState => !prevState);
    }

    const increaseCount = () => {
        setCount(count => count + count);
    }

    return (
        <div className={css`
                display: flex;
                flex-direction: column;
                background-color: ${ darkTheme ? theme.primaryColors.midNight : theme.secondaryColors.lightGrey};
                min-height: 100vh;
                background-repeat: no-repeat;
                background-size: 100% 160px;
                padding-bottom: 50px;
                gap: 30px;
                ${mq[0]} {
                    padding-left: 24px;
                    padding-right: 24px;
                    background-image: url(${mobileBackgroundImage});
                }
                ${mq[1]} {
                    padding-left: 40px;
                    padding-right: 40px;
                    background-image: url(${tabletBackgroundImage});
                    column-gap: 30px;
                }
                ${mq[2]} {
                    background-image: url(${backgroundImage}) !important;
                    padding-left: 165px;
                    padding-right: 165px;
                }
            `}>
            <div className={css`
                    display: flex;
                    justify-content: space-between;
                    align-items:center;
                    height: 160px;
                `} >
                <Typography variant="h1" >devjobs</Typography>
                <div className={css`
                        display: flex;
                        gap: 16px;
                    `}>
                    <img className={css` height: 24px `} src={sunIcon} alt="sun" />
                    <Switch checked={darkTheme} onClick={toggleDarkTheme} />
                    <img className={css` height: 24px `} src={moonIcon} alt="moon" />
                </div>
            </div>
            <div className={css`
                    display: flex;
                    flex-wrap: wrap;
                    padding-top: 50px;
                    column-gap: 30px;
                    row-gap: 60px;
                    justify-content: space-between;
                    ${mq[0]} {
                        justify-content: center;
                    }
                    ${mq[1]} {
                        justify-content: space-between;
                    }
                `}> 
                {filteredJobsData.map(job => <JobCard key={job.id} job={job} darkTheme={darkTheme} />)}
            </div>
            <div className={css`
                    align-self: center;
                `} onClick={increaseCount} >
                <Button variant="contained">Load More</Button>
            </div>
        </div>
    )
}

export default HomePage;