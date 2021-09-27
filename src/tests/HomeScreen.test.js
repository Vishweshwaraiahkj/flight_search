import { render, fireEvent, screen } from '@testing-library/react'
import HomeScreen from '../pages/HomeScreen'
import SearchFlightsForm from 'components/SearchFlightsForm/SearchFlightsForm'
import SearchFlightsDesc from 'components/SearchFlightsDesc/SearchFlightsDesc'

test('renders Loading... text', () => {
  render(<HomeScreen />)
  const linkElement = screen.getByText(/Loading.../i)
  expect(linkElement).toBeInTheDocument()
})

test('renders Search Form', () => {
  const processFeedback = jest.fn()
  render(<SearchFlightsForm feedbackGetter={processFeedback} />)
  const Element = screen.getAllByText(/Search/i)
  expect(Element[0]).toBeInTheDocument()
  fireEvent.click(Element[1])
})

test('renders Searched Data', () => {
  const routeObject = {}
  render(<SearchFlightsDesc routeObject={routeObject} />)
  const Element = screen.getByTestId('desc-box')
  expect(Element).toBeInTheDocument()
})
