import { expect, test } from '@playwright/test'

test('la home carga el catálogo desde Firestore', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reparar')
  await expect(page.locator('.product-card').first()).toBeVisible()
})

test('el menú filtra productos por categoría', async ({ page }) => {
  await page.goto('/')
  await page.locator('.category-link').filter({ hasText: 'Arreglos' }).click()

  await expect(page).toHaveURL(/\/category\/arreglos$/)
  await expect(page.locator('.product-card').first()).toBeVisible()
})

test('del catálogo se llega al detalle y al carrito', async ({ page }) => {
  await page.goto('/')

  const firstCard = page.locator('.product-card').first()
  await expect(firstCard).toBeVisible()
  const name = await firstCard.locator('h2').innerText()
  await firstCard.locator('.product-detail-link').click()

  await expect(page).toHaveURL(/\/item\//)
  await expect(page.getByRole('heading', { name })).toBeVisible()
  await page.getByRole('button', { name: 'Sumar una unidad' }).click()
  await page.getByRole('button', { name: 'Agregar al carrito' }).click()

  await expect(page.locator('.cart-count')).toHaveText('1')
  await page.locator('.cart-widget').click()
  await expect(page).toHaveURL(/\/cart$/)
  await expect(page.getByRole('heading', { name })).toBeVisible()
})

test('el checkout solicita ingreso y el registro conserva su destino', async ({ page }) => {
  await page.goto('/checkout')

  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('heading', { name: 'Ingresar a tu cuenta' })).toBeVisible()
  await page.getByRole('link', { name: 'Registrarme' }).click()
  await expect(page).toHaveURL(/\/registro$/)
  await expect(page.getByRole('heading', { name: 'Crear una cuenta' })).toBeVisible()
})

test('una ruta inexistente muestra el 404', async ({ page }) => {
  await page.goto('/ruta-que-no-existe')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('No encontramos')
  await expect(page.getByRole('link', { name: 'Ir al catalogo' })).toBeVisible()
})
