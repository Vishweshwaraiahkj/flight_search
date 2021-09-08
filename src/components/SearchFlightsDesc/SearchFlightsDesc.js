import React from 'react'
import PropTypes from 'prop-types'
import './search-flights-desc.scss'

const SearchFlightsDesc = props => {
    const {
        routeObject
    } = props;

    return (
        <>
            <h1 className="desc-box-title">Route Description</h1>
            <div className="desc-box" data-testid="desc-box" >
                <div>
                    {Object.keys(routeObject).length ?
                        Object.keys(routeObject).map((i) => {
                            return (<div className="p-1rem">
                                <label>{routeObject[i].name}</label>
                                <span>{routeObject[i].value}</span>
                            </div>)
                        }) :
                        <div className="no-results">No Route Selected!</div>}
                </div>
            </div>
        </>
    )
}

SearchFlightsDesc.propTypes = {
    routeObject: PropTypes.instanceOf(Object)
}

SearchFlightsDesc.defaultProps = {
    routeObject: {}
}

export default SearchFlightsDesc

