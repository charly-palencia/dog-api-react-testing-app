import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import indexFixtures from "../__tests__/fixtures/breeds-all";
import imageFixtures from "../__tests__/fixtures/images";
import {BrowserRouter} from 'react-router-dom'

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, {wrapper: BrowserRouter}),
  }
}

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('https://dog.ceo/api/breeds/list/all', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json(indexFixtures))
  }),

  rest.get('https://dog.ceo/api/breed/affenpinscher/images', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json(imageFixtures))
  }),
)


// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


test('loads and displays greeting', async () => {
 const {user} = renderWithRouter(<App />)

  // role url
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/link_role
  await waitFor(() => screen.getAllByRole('link'))
  const links = screen.queryAllByRole("link");

  // go to details
  await user.click(links[0])

  // validat details
  await waitFor(() => screen.getByText('Bread Detail'))
  await waitFor(() => screen.getAllByRole('img'))
  expect(screen.getAllByRole("img").length).toBe(4)

  await user.click(screen.getByText('Back'))

  // only find is async/await
  // https://testing-library.com/docs/queries/about/
  await waitFor(() => screen.findByText('Breeds index'))

  const linkTds = await screen.findAllByRole("link");
  expect(linkTds.length).toBe(96);
})
