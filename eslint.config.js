// Configuration minimale pour ESLint
export default [
  {
    // Désactive la règle problématique d'Astro
    rules: {
      'astro/missing-client-only-directive-value': 'off',
      // Désactive la règle des noms de composants multi-mots pour Vue
      'vue/multi-word-component-names': 'off',
    },
  },
];
