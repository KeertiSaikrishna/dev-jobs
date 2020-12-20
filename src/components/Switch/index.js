import React from 'react';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';
import theme from '../../Theme/theme';

function Switch(props) {
    const { checked, onClick } = props;

    return (
        <span className={css`
                height: 24px;
                width: 48px;
                border-radius: 12px;
                background-color: ${theme?.secondaryColors.white};
                position: relative;
                cursor: pointer;
                &:hover span {
                    background-clor: ${theme?.primaryColors.lightViolet};
                }
            `}
            onClick={onClick}
        >
            <span className={css`
                position: absolute;
                height: 14px;
                width: 14px;
                top: 5px;
                left: 5px;
                right: 5px;
                background-color: ${theme?.primaryColors.violet};
                border-radius: 50%;
                transform:${ checked && "translateX(24px)" } ;
                transition: .6s;
            `} />
        </span>
    )
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Switch;