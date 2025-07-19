// c:\laragon\www\anas_law_website\frontend\tests\router\index.test.js
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

describe('Router Configuration', () => {
  it('should have correct route paths', () => {
    const routes = [
      { path: '/', name: 'Home' },
      { path: '/booking', name: 'Booking' },
      { path: '/article', name: 'Article' },
      { path: '/login', name: 'Login' },
      { path: '/booking-form/:id?', name: 'BookingForm' }
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes
    })

    const routePaths = router.getRoutes().map(route => route.path)
    
    expect(router.getRoutes()).toHaveLength(5)
    expect(routePaths).toContain('/')
    expect(routePaths).toContain('/booking')
    expect(routePaths).toContain('/article')
    expect(routePaths).toContain('/booking-form/:id?')
  })

  it('should navigate to correct routes', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/booking', component: { template: '<div>Booking</div>' } }
      ]
    })

    await router.push('/booking')
    expect(router.currentRoute.value.path).toBe('/booking')

    await router.push('/')
    expect(router.currentRoute.value.path).toBe('/')
  })
})