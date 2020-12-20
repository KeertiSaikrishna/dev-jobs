import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const H1 = styled.h1`
    color: ${props => props.color ? props.color : 'black'};
    font-family: Kumbh Sans Bold;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    margin: 0px;
`

const H2 = styled.h2`
    color: ${props => props.color ? props.color : 'black'};
    font-family: Kumbh Sans Bold;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin: 0px;
`
const H3 = styled.h3`
    color: ${props => props.color ? props.color : 'black'}; 
    font-family: Kumbh Sans Bold;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    margin: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const H4 = styled.h4`
    color: ${props => props.color ? props.color : 'black'};
    font-family: Kumbh Sans Bold;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    margin: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Body = styled.p`
    color: ${props => props.color ? props.color : 'black'};
    font-family: Kumbh Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    margin: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

function Typography(props) {
    const { variant, color, children } = props;
    const getVariant = () => {
        switch (variant) {
            case "h1":
                return ( <H1 title={children} color={color}>{children}</H1> );
            case "h2":
                return ( <H2 title={children} color={color}>{children}</H2> );
            case "h3":
                return ( <H3 title={children} color={color}>{children}</H3> );
            case "h4":
                return ( <H4 title={children} color={color}>{children}</H4> );
            case "body":
                return ( <Body title={children} color={color}>{children}</Body> );
            default:
                return (<p>{children}</p>);
        }
    }

    return (
        getVariant()
    )
}

Typography.defaultProps = {
    color: "#FFFFFF"
}

Typography.propTypes = {
    variant: PropTypes.string.isRequired,
    color: PropTypes.string,
    children: PropTypes.any.isRequired
}

export default Typography;