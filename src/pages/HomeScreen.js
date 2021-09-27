import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchFlightsForm from 'components/SearchFlightsForm'
import SearchFlightsDesc from 'components/SearchFlightsDesc'
import './homescreen.scss'

const HomeScreen = () => {
  const [flightLocations, setFlightLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [routeDesc, setRouteDesc] = useState({})

  useEffect(() => {
    axios
      .get(
        'https://api-uat-ezycommerce.ezyflight.se/api/v1/Airport/OriginsWithConnections/en-us',
        {
          headers: {
            'Tenant-Identifier':
              '9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d'
          }
        }
      )
      .then((response) => {
        const data = response.data
        if (data) {
          setFlightLocations(data)
          setIsLoading(false)
        }
      })
  }, [])

  const DescGetter = (dataObj) => {
    dataObj && setRouteDesc(dataObj)
  }

  return (
    <div className="flight-search">
      {isLoading && (
        <div className="full-screen-loader">
          <span>Loading...</span>
        </div>
      )}
      {!isLoading && (
        <>
          <header className="app-header">
            <h1 className="app-title">Flight Search</h1>
          </header>
          <section className="search-section">
            <SearchFlightsForm
              flightsData={flightLocations}
              DescGetter={DescGetter}
            />
            <SearchFlightsDesc routeObject={routeDesc} />
          </section>
        </>
      )}
    </div>
  )
}

export default HomeScreen
