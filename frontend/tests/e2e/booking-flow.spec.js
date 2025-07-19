// tests/e2e/booking-flow.spec.js
import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test('user can complete booking process', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://anaslawfirm.com')
    
    // 2. Click booking button
    await page.click('text=Book Consultation')
    
    // 3. Should navigate to booking page
    await expect(page).toHaveURL(/.*booking/)
    
    // 4. Select a lawyer
    await page.click('.lawyer-card:first-child button')
    
    // 5. Should navigate to booking form
    await expect(page).toHaveURL(/.*booking-form/)
    
    // 6. Fill booking form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '+628123456789')
    await page.fill('textarea[name="message"]', 'Test consultation request')
    
    // 7. Submit form
    await page.click('button[type="submit"]')
    
    // 8. Check success message
    await expect(page.locator('text=Success')).toBeVisible()
  })

  test('navigation menu works correctly', async ({ page }) => {
    await page.goto('https://anaslawfirm.com')
    
    // Test navigation links
    await page.click('text=Articles')
    await expect(page).toHaveURL(/.*article/)
    
    await page.click('text=Home')
    await expect(page).toHaveURL('https://anaslawfirm.com/')
  })
})