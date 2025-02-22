import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders site title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByText('TellTail')).toBeInTheDocument()
  })

  it('navigates home on brand click', async () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const brandLink = container.querySelector('[data-testid="brand-link"]')
    expect(brandLink).toBeInTheDocument()
    await userEvent.click(brandLink!)
  })

  it('opens navigation menu', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const menuButton = screen.getByLabelText('menu')
    await userEvent.click(menuButton)
    
    // Get all "About Us" links and verify the mobile one is visible
    const aboutUsLinks = screen.getAllByText('About Us')
    const mobileAboutUsLink = aboutUsLinks.find(link => 
      link.classList.contains('block')
    )
    expect(mobileAboutUsLink).toBeVisible()
  })
})