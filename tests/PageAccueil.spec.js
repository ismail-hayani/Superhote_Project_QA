import { test, expect } from '@playwright/test';

// Test de la page d'accueil SuperHote
test('PageAccueil - affichage et navigation', async ({ page, context }) => {
  await context.clearCookies(); // Supprime tous les cookies avant le test
  await page.goto('https://www.superhote.com/', { timeout: 60000 }); // Timeout augmenté à 60s

  // Vérification du header et de la navigation
  await expect(page.getByRole('banner').getByRole('link', { name: 'Logo SuperHote Rounded' })).toBeVisible();
  for (const navText of ['À propos', 'L\'Outil', 'Témoignages', 'Blog', 'Se connecter']) {
    await expect(page.getByRole('navigation')).toContainText(navText);
  }
  await expect(page.getByRole('link', { name: 'DÉMO GRATUITE', exact: true })).toBeVisible();

  // Vérification du contenu principal
  await expect(page.locator('h1')).toContainText('Rejoignez le TOP 10% des Conciergeries');
  await page.getByText('La meilleure solution en').click();
  await expect(page.getByText('La meilleure solution en')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('La meilleure solution en ligne pour piloter et automatiser les de vos locations courte durée');
  await expect(page.locator('header')).toContainText('SuperHote est intégré avec vos outils favoris');
  await expect(page.getByRole('main')).toContainText('Automatisez à 100%Boostez vos réservations en même temps');
  await expect(page.getByRole('main')).toContainText('Nos clients économisent en moyenne 28h par semaine en rejoignant SuperHote (tout en augmentant leur taux d\'occupation et en améliorant leur expérience client).');
  await expect(page.locator('.icon-red').first()).toBeVisible();

  // Vérification des sections principales
  for (const mainText of [
    'Facile à prendre en main',
    'Surpuissant & Performant',
    'Une solution robuste',
    'Contrairement aux machines à gaz que l\'on peut trouver sur le marché, SuperHote se prend vite en main et s\'utilise facilement depuis n\'importe quel appareil (ordinateur, mobile & tablette)',
    'Avec SuperHote, vous pouvez automatiser à peu près tout ce à quoi vous pouvez penser, tout en fournissant une expérience 5 étoiles à vos voyageurs & en boostant vos réservations.',
    'Certains de nos clients n\'ont que quelques appartements — d\'autres en gèrent plus de 200 via notre plateforme. Que vous démarriez ou soyez la conciergerie la plus importante de votre région, nous pouvons vous aider.'
  ]) {
    await expect(page.getByRole('main')).toContainText(mainText);
  }

  // Vérification des onglets
  for (const tab of [
    'Gérez vos calendriers',
    'Boostez vos résas',
    'Optimisez vos prix',
    'Gérez votre équipe',
    'Pilotez votre business',
    'Simplifiez la compta'
  ]) {
    await expect(page.getByRole('tab', { name: tab })).toBeVisible();
  }

  // Section "Gérez vos calendriers"
  await expect(page.getByText('Gérez vos calendriers facilement 📅')).toBeVisible();
  for (const calendrierText of [
    'Synchronisez vos calendriers entre les plateformes',
    'Ayez une visibilité globale sur tous vos appartements',
    'Accédez rapidement au détail de chaque réservations'
  ]) {
    await expect(page.getByLabel('Gérez vos calendriers')).toContainText(calendrierText);
  }
  await page.getByText('Assignez des ménages,').click();
  await expect(page.getByLabel('Gérez vos calendriers')).toContainText('Assignez des ménages, checkins & tâches à votre équipe');

  // Support et communauté
  await expect(page.getByRole('img', { name: 'Support SuperHote' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Obtenez un support' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Rejoignez la SuperHote Family et faites passer votre Conciergerie au niveau supérieur');
  await expect(page.getByRole('main')).toContainText('Échangez et partagez vos idées ainsi que votre motivation avec des SuperHotes aux 4 coins de la France et à l’International dans la communauté SuperHote');
  await expect(page.getByRole('main')).toContainText('Questions fréquentes');
  await page.getByText('Les questions que vous vous').click();
  await expect(page.getByRole('heading', { name: 'Ils nous font confiance' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('D\'autres questions ?');
  await page.getByText('Testez GRATUITEMENT l\'écosyst').click();
  await page.getByRole('link', { name: 'DÉMARRER GRATUITEMENT' }).click();
});