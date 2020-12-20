import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContainedButton = styled.button`
    height: 48px;
    width: 140px;
    background: ${props => props.theme?.primaryColors.violet};
    border-radius: 5px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    color: ${props => props?.theme?.secondaryColors?.white};
    &:hover {
        background: ${props => props?.theme?.primaryColors?.lightViolet};
    }
`

const OutlinedButton = styled.button`
    height: 48px;
    width: 147px;
    border-radius: 5px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    color: ${props => props.darkTheme ? props.theme.primaryColors.violet : props.theme.secondaryColors.white};
    background: ${props => props.darkTheme ? props.theme.primaryColors.lightGrey : props.theme.primaryColors.veryDarkBlue};
    &:hover {
        background: ${props => props.darkTheme ? props.theme.primaryColors.lightViolet : props.theme.secondaryColors.darkGrey};
    }
`



function Button(props) {
    const { variant, children, darkTheme, onClick } = props;
    const getVariant = () => {
        switch (variant) {
            case "contained":
                return <ContainedButton onClick={onClick} >{children}</ContainedButton>
            default:
                return <OutlinedButton onClick={onClick} darkTheme={darkTheme}>{children}</OutlinedButton>
        }
    }

    return (
        getVariant()
    )
}

Button.defaultProps = {
    variant: "outlined",
    darkTheme: false
}

Button.propTypes = {
    variant: PropTypes.string,
    children: PropTypes.string.isRequired,
    darkTheme: PropTypes.bool,
}

export default Button;