import React from 'react';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';
import theme from '../../Theme/theme';
import Typography from '../Typography';
import jobIcon from '../../assets/desktop/job-icon.png';

function JobCard(props) {
    const { job, darkTheme } = props;
    return ( 
        <div className={css`
                display: flex;
                flex-direction: column;
                height: 200px;
                width: 320px;
                border-radius: 6px;
                padding: 32px;
                padding-top: 0px;
                background: ${ darkTheme ? theme.primaryColors.veryDarkBlue : theme.secondaryColors.white};
                gap: 20px;
            `}>
            <img src={job.company_logo ? job.company_logo : jobIcon } 
                alt="logo"
                className={css`
                    height: 50px;
                    width: 50px;
                    margin-top: -25px;
                    border-radius: 15px;
                `} />
            <div className={css`
                    display: inline-flex;
                    gap: 12px;
                    padding-top: 12px;
                `} >
                <Typography variant="body" color={theme.secondaryColors.darkGrey}>{job.postedTime} ago</Typography>
                <span className={css`
                    height: 4px;
                    width: 4px;
                    background-color: ${theme.secondaryColors.darkGrey};
                    border-radius: 50%;
                    margin-top: 12px;
                `} />
                <Typography variant="body" color={theme.secondaryColors.darkGrey}>{job.type}</Typography>
            </div>
            <Typography variant="h3" color={darkTheme ? theme.secondaryColors.white : theme.primaryColors.veryDarkBlue}>{job.title}</Typography>
            <Typography variant="body" color={theme.secondaryColors.darkGrey}>{job.company}</Typography>
            <Typography className={css`padding-top: 12px`} variant="h4" color={theme.primaryColors.violet}>{job.location}</Typography>
        </div>
     )
}

JobCard.defaultProps = {
    darkTheme: false
}

JobCard.propTypes = {
    job: PropTypes.object.isRequired,
    darkTheme: PropTypes.bool
}

export default JobCard;