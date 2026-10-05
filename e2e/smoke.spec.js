import { expect, test } from '@playwright/test'

// Recorrido minimo del atelier: catalogo -> categoria -> detalle -> carrito,
// mas las rutas de borde (checkout protegido y 404).

test('la home muestra el hero y el catalogo', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reparar')
  await expect(page.getByRole('link', { name: /Ir al inicio/i })).toBeVisible()
  await expect(page.locator('.product-card').first()).toBeVisible()
})

test('el menu filtra por categoria', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Ver arreglos' }).click()

  await expect(page).toHaveURL(/\/category\/arreglos$/)
  await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 10_000 })
})

test('desde el catalogo se llega al detalle del producto', async ({ page }) => {
  await page.goto('/')

  const primeraCard = page.locator('.product-card').first()
  const nombre = await primeraCard.locator('h2').innerText()
  await primeraCard.locator('.product-detail-link').click()

  await expect(page).toHaveURL(/\/item\//)
  await expect(page.getByRole('heading', { name: nombre })).toBeVisible()
  await expect(page.getByLabel('Selector de cantidad')).toBeVisible()
})

test('se agrega una unidad al carrito y el widget la refleja', async ({ page }) => {
  await page.goto('/item/yc-remiendo-denim')

  const agregar = page.getByRole('button', { name: 'Agregar al carrito' })
  await expect(agregar).toBeDisabled() // arranca en cantidad 0

  await page.getByRole('button', { name: 'Sumar una unidad' }).click()
  await agregar.click()

  await expect(page.locator('.cart-count')).toHaveText('1')

  await page.getByRole('link', { name: 'Ver carrito' }).click()
  await expect(page).toHaveURL(/\/cart$/)
  await expect(page.getByText('Remiendo visible denim')).toBeVisible()
})

test('el checkout protegido redirige a acceso restringido', async ({ page }) => {
  await page.goto('/checkout')

  await expect(page).toHaveURL(/\/acceso-restringido$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('checkout')
})

test('una ruta inexistente muestra el 404', async ({ page }) => {
  await page.goto('/ruta-que-no-existe')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('No encontramos')
  await expect(page.getByRole('link', { name: 'Ir al catalogo' })).toBeVisible()
})
