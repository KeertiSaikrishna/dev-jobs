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
    const [page, setPage] = useState(1);
    // const [filteredJobsData, setFilteredJobsData] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const [searchString, setSearchString] = useState("");

    const updatePostDates = (filteredJobs) => {
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
        return filteredJobs;
    }

    useEffect(() => {
        const fetchData =  async () => {
            let api = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json/?page=${page}&search=${searchString}`;
            fetch(
                api
              )
            .then((res) => res.json())
            .then((data) => {
                let filteredData = updatePostDates(data);
                setJobsData(filteredData);
            });
        }
        fetchData();
    }, [searchString, page]);

    const toggleDarkTheme = () => {
        setDarkTheme(prevState => !prevState);
    }

    const increaseCount = () => {
        setPage(count => count + 1);
    }

    const handleSearch = (event) => {
        console.log('event is', event);
        setSearchString(event.target.value);
    }

    const Debounce = ( fn, delay ) => {
        let timer;
        return ((args) =>  {
            clearTimeout(timer);
            timer = setTimeout( () => {
                fn(args);
            }, delay);
        });
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
                    height: 90px;
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
                    gap: 16px;
                    background-color: ${theme.secondaryColors.white};
                    height: 30px;
                    align-items: center;
                    border-radius: 6px;
                    padding: 20px;
                `}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.024 15.0588H17.1123L23.9435 21.9037L21.9037 23.9435L15.0588 17.1123V16.0308L14.6824 15.6544C13.1286 16.9891 11.1093 17.7968 8.89842 17.7968C3.98374 17.7968 0 13.8131 0 8.89842C0 3.98374 3.98381 0 8.89842 0C13.813 0 17.7968 3.98374 17.7968 8.89842C17.7968 11.1093 16.9891 13.1286 15.6475 14.6824L16.024 15.0588ZM2.73799 8.89842C2.73799 12.3003 5.49651 15.0588 8.89842 15.0588C12.3003 15.0588 15.0588 12.3003 15.0588 8.89842C15.0588 5.49651 12.3003 2.73799 8.89842 2.73799C5.49651 2.73799 2.73799 5.49651 2.73799 8.89842Z" fill="#5964E0"/>
                </svg>
                <input className={css`
                        height: 45px;
                        width: 300px;
                        border: none;
                        &:focus {
                            border: none;
                            outline: none;
                        }
                    `} onChange={Debounce(handleSearch, 500)} placeholder="Filter by title, companies, expertise" />
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
                {jobsData.map(job => <JobCard key={job.id} job={job} darkTheme={darkTheme} />)}
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