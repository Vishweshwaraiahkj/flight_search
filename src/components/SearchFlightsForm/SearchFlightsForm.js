import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './search-flights-form.scss'

const SearchFlightsForm = props => {
    const {
        DescGetter,
        flightsData
    } = props;

    const [fromObjects, setFromObjects] = useState([]);
    const [toObjects, setToObjects] = useState([]);
    const [isReturn, setIsReturn] = useState(false);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [fromRoute, setFromRoute] = useState({});
    const [toRoute, setToRoute] = useState({});
    const [error, setError] = useState('');
    const [dateError, setDateError] = useState('');
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);

    const counterHandler = (e, mode, type) => {
        switch (type) {
            case 'adults':
                (mode === '+') ? setAdultCount(adultCount + 1) : setAdultCount(adultCount ? adultCount - 1 : 0);
                break;
            case 'children':
                (mode === '+') ? setChildCount(childCount + 1) : setChildCount(childCount ? childCount - 1 : 0);
                break;
            case 'infants':
                (mode === '+') ? setInfantCount(infantCount + 1) : setInfantCount(infantCount ? infantCount - 1 : 0);
                break;
            default:
                return;
        }
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        if (flightsData?.airports?.length) {
            setFromObjects(flightsData.airports);
            setToObjects(flightsData.airports[0].connections);
        }
    }, [flightsData]);

    const handleChange = e => {
        let value = e.target.value;
        let type = e.target.name;
        if (type === 'from-city') {
            let toObject = fromObjects.find(i => i.code === value);
            setToObjects(toObject?.connections);
            setFromRoute({
                [type]: value
            });
            setToRoute({
                'to-city': toObject?.connections[0].code
            });
        }
        if (type === 'to-city') {
            setToRoute({
                [type]: value
            });
        }
    }

    const toggleReturn = e => {
        if (e.target.checked) {
            setIsReturn(true);
        } else {
            setIsReturn(false);
        }
    }

    const dateHandler = e => {
        let date = e.target.value;
        let type = e.target.name;
        if (type === 'departure_date') {
            setDepartureDate(date);
        }
        if (type === 'return_date') {
            if (departureDate && departureDate < date) {
                setReturnDate(date);
                setDateError('');
            } else {
                setDateError("Error: Invalid date!")
            }
        }
        return;
    }

    const handleSubmit = e => {
        let travelData = {
            isReturn: {
                name: 'Return',
                value: isReturn ? 'Yes' : 'No'
            },
            departureDate: {
                name: 'Departure Date',
                value: departureDate
            },
            returnDate: {
                name: 'Return Date',
                value: returnDate
            },
            adultCount: {
                name: 'Adults',
                value: adultCount
            },
            childCount: {
                name: 'Children',
                value: childCount
            },
            infantCount: {
                name: 'Infants',
                value: infantCount
            },
            fromRoute: {
                name: 'From',
                value: fromObjects.find(i => i.code === fromRoute['from-city']).name
            },
            toRoute: {
                name: 'To',
                value: fromObjects.find(i => i.code === toRoute['to-city']).name
            }
        };

        if (travelData) {
            DescGetter(travelData);
            setError("")
        } else {
            setError("Error: Invalid data!")
        }

        e.preventDefault();
    }

    const submittable = Object.keys(fromRoute).length && (adultCount + childCount + infantCount) > 0;

    return (
        <form
            onSubmit={handleSubmit}
            className="search-box"
        >
            {(error || dateError) && <span className="error">{error || dateError}</span>}

            <label className="search-label">
                Search For Flights:
            </label>
            <div className="align-vertically-center switch-box">
                <label>Return: </label>
                <label className="switch">
                    <input type="checkbox" checked={isReturn} onChange={e => toggleReturn(e)} />
                    <span className="slider"></span>
                </label>
            </div>

            <div className="d-flex w-100p inputs-container">
                <div className="d-flex column flex-one">
                    <label>From </label>
                    <select
                        name="from-city"
                        className="search-inputs"
                        title="from data"
                        onChange={e => handleChange(e)}
                    >
                        {fromObjects?.map(i => (

                            <option
                                key={i.code}
                                value={i.code}
                                readOnly
                            >
                                {i.name}
                            </option>))
                        }
                    </select>
                </div>
                <div className="d-flex column flex-one">
                    <label>To </label>
                    <select
                        name="to-city"
                        className="search-inputs"
                        title="to data"
                        onChange={e => handleChange(e)}
                    >
                        {toObjects?.map(i => (
                            <option
                                key={i.code}
                                value={i.code}
                                readOnly
                            >
                                {i.name}
                            </option>))
                        }
                    </select>
                </div>
                <div className="d-flex column flex-one">
                    <label>Departure </label>
                    <input
                        type="date"
                        className="search-inputs"
                        name="departure_date"
                        value={departureDate}
                        onChange={e => dateHandler(e)}
                    />
                </div>
                {isReturn && (
                    <div className="d-flex column flex-one">
                        <label>Return </label>
                        <input
                            type="date"
                            className="search-inputs"
                            name="return_date"
                            value={returnDate}
                            onChange={e => dateHandler(e)}
                        />
                    </div>
                )}
            </div>
            <div className="d-flex w-100p seat-counters">
                <div className="d-flex row">
                    <label className="adults-label">
                        Adults:
                    </label>
                    <span>
                        <button
                            className="adultsplus circle"
                            onClick={(e) => counterHandler(e, '+', 'adults')}
                        >+</button>
                        {adultCount}
                        <button
                            className="adultsminus circle"
                            onClick={(e) => counterHandler(e, '-', 'adults')}
                        >-</button>
                    </span>
                </div>
                <div className="d-flex row">
                    <label className="children-label">
                        Children:
                    </label>
                    <span>
                        <button
                            className="childsplus circle"
                            onClick={(e) => counterHandler(e, '+', 'children')}
                        >+</button>
                        {childCount}
                        <button
                            className="childsminus circle"
                            onClick={(e) => counterHandler(e, '-', 'children')}
                        >-</button>
                    </span>
                </div>
                <div className="d-flex row">
                    <label className="infants-label">
                        Infants:
                    </label>
                    <span>
                        <button
                            className="infantsplus circle"
                            onClick={(e) => counterHandler(e, '+', 'infants')}
                        >+</button>
                        {infantCount}
                        <button
                            className="infantsminus circle"
                            onClick={(e) => counterHandler(e, '-', 'infants')}
                        >-</button>
                    </span>
                </div>
            </div>
            <button
                className="btn submit-btn medium-btn"
                type="submit"
                disabled={ submittable ? false : true}
            >Search</button>

        </form>
    )
}

SearchFlightsForm.propTypes = {
    DescGetter: PropTypes.func,
    flightsData: PropTypes.instanceOf(Object)
}

SearchFlightsForm.defaultProps = {
    DescGetter: () => { },
    flightsData: {}
}

export default SearchFlightsForm

