---
title: "Débuguer intelligemment : suivez la chaîne"
description: "Trop d'ingénieurs se jettent sur le code quand quelque chose ne marche pas. La bonne approche ? Commencer par l'extérieur — traces, logs, métriques — et remonter méthodiquement vers le cœur du système."
date: 2025-12-23
tag: "Engineering"
lang: fr
translationKey: debugging-follow-the-chain
---

J'ai vu trop d'ingénieurs perdre des heures (voire des jours) sur des bugs qu'ils auraient pu résoudre en 20 minutes. Leur erreur ? Se jeter directement dans le code, poser des breakpoints au hasard, ajouter des `console.log` partout, et espérer tomber sur le problème.

Spoiler : ça ne marche pas. Ou plutôt, ça marche parfois, mais c'est inefficace et frustrant.

Aujourd'hui, je veux partager une approche qui m'a fait gagner un temps fou : **suivre la chaîne, de l'extérieur vers l'intérieur**.

## Le réflexe naturel (et pourquoi il est mauvais)

Quand quelque chose plante, le réflexe de beaucoup de devs c'est :
1. Ouvrir l'IDE
2. Chercher le fichier qui "doit" contenir le bug
3. Lire le code
4. Ajouter des logs ou des breakpoints
5. Relancer
6. Répéter jusqu'à trouver (ou abandonner)

Le problème avec cette approche ? Tu pars d'hypothèses. Tu *penses* savoir où est le problème. Et la plupart du temps, tu te trompes.

Résultat : tu passes des heures à débuguer le mauvais endroit.

## L'approche inverse : de l'extérieur vers l'intérieur

L'idée est simple : avant de toucher au code, tu analyses ce qui se passe **de l'extérieur vers l'intérieur**. Tu commences par ce qui est le plus loin du cœur de ton système, et tu remontes progressivement.

Concrètement, ça donne :

1. **Les symptômes observés** (ce que l'utilisateur voit)
2. **Les traces** (le parcours de la requête)
3. **Les logs** (ce que chaque service a fait)
4. **Les métriques** (l'état du système)
5. **Le code** (enfin, si nécessaire)

Cette approche a un avantage énorme : chaque étape **réduit le périmètre** de ton investigation. Tu ne cherches plus une aiguille dans une botte de foin, tu sais exactement où regarder.

## Étape 1 : Les symptômes

Ça paraît évident, mais je vois encore des gens débuguer sans avoir clairement défini le problème.

Avant toute chose, pose-toi ces questions :
- **Quel est le comportement observé ?** (erreur 500, timeout, mauvaise donnée...)
- **Quel est le comportement attendu ?**
- **C'est reproductible ?** Comment ? Avec quels paramètres ?
- **Depuis quand ça se passe ?** (indice crucial pour identifier un déploiement ou changement)
- **Qui est impacté ?** Un utilisateur ? Tous ? Un sous-ensemble ?

Si tu ne peux pas répondre clairement à ces questions, tu n'es pas prêt à débuguer. Tu vas partir dans tous les sens.

## Étape 2 : Les traces

Si ton système utilise du tracing distribué (OTLP, Datadog APM...), c'est ta meilleure arme.

Une trace te montre **exactement le parcours d'une requête** à travers tous tes services. Tu vois :
- Par quels services la requête est passée
- Combien de temps chaque étape a pris
- Où ça a planté (s'il y a une erreur)
- Les métadonnées associées à chaque span

C'est incroyablement puissant. En quelques secondes, tu peux identifier :
- Le service fautif
- L'opération précise qui a échoué
- Le contexte (IDs de corrélation, paramètres...)

J'ai résolu des bugs en production en moins de 5 minutes grâce aux traces, là où sans ça j'aurais passé des heures à deviner.

### Si tu n'as pas de tracing

C'est le moment d'en mettre en place. Sérieusement. L'investissement initial est vite rentabilisé.

En attendant, tu peux te rabattre sur les IDs de corrélation dans tes logs (si tu en as), ou reconstituer le parcours manuellement — mais c'est laborieux.

## Étape 3 : Les logs

Les logs, c'est le pain quotidien du debug. Mais encore faut-il savoir les utiliser correctement.

### Filtrer efficacement

Ne lis pas tous les logs de ta stack. C'est une perte de temps monumentale. Utilise tes outils de recherche :
- Filtre par **timestamp** (autour du moment de l'incident)
- Filtre par **trace ID** ou **request ID** (si tu en as)
- Filtre par **niveau** (ERROR, WARN en priorité)
- Filtre par **service** (celui identifié par le tracing, ou par déduction)

### Lire dans le bon ordre

Les logs se lisent **chronologiquement**. Tu veux comprendre ce qui s'est passé *avant* l'erreur, pas seulement l'erreur elle-même.

Souvent, le vrai problème est quelques lignes plus haut : une connexion refusée, un timeout, une valeur inattendue...

### Attention aux logs qui manquent

Parfois, l'absence de log est plus parlante que les logs eux-mêmes. Si tu t'attends à voir un log et qu'il n'est pas là, c'est que :
- Le code n'a pas été exécuté (condition non remplie, erreur avant)
- Le service n'a pas reçu la requête
- Il y a un problème de configuration des logs

## Étape 4 : Les métriques

Les métriques te donnent une vue d'ensemble de l'état de ton système. Elles répondent à des questions différentes des logs :
- **Le système est-il sous charge ?** (CPU, mémoire, connexions)
- **Y a-t-il des anomalies ?** (pics de latence, taux d'erreur)
- **Quand le problème a-t-il commencé ?** (corrélation avec un déploiement, un pic de trafic)

### Les métriques clés à surveiller

- **Rate** : nombre de requêtes par seconde
- **Errors** : taux d'erreur
- **Duration** : latence (p50, p95, p99)
- **Saturation** : ressources utilisées vs disponibles

C'est le fameux framework RED et USE. Si tu ne connais pas, je te conseille de te renseigner.

### Corréler les métriques avec les événements

Superpose tes métriques avec les déploiements, les changements de config, les incidents externes... Souvent, le coupable devient évident : "Tiens, le taux d'erreur a explosé pile 5 minutes après le déploiement de 14h32."

## Étape 5 : Le code (enfin)

Ce n'est qu'après avoir fait tout ça que tu devrais ouvrir ton IDE.

À ce stade, tu as normalement :
- Identifié le service fautif
- Identifié l'opération précise
- Compris le contexte (paramètres, état du système)
- Des hypothèses fondées sur des données

Maintenant, tu peux lire le code avec un objectif précis. Tu cherches une chose spécifique, pas "le bug quelque part dans 100k lignes".

### Valider tes hypothèses

Le code te permet de valider (ou invalider) tes hypothèses. Si les logs te disent "valeur null reçue", le code te dit *pourquoi* cette valeur peut être null et *ce qui se passe* quand elle l'est.

### Ne pas se perdre

C'est tentant de "refactorer en passant" ou de "corriger un autre truc que j'ai vu". Résiste. Tu es là pour résoudre un problème précis. Note les autres trucs pour plus tard.

## Un exemple concret

Situation : un client signale que certaines de ses requêtes échouent avec une erreur 500.

**Étape 1 — Symptômes :**
- Erreur 500 intermittente
- Seulement sur l'endpoint `/api/orders`
- Depuis ce matin
- Pas tous les utilisateurs, juste certains comptes

**Étape 2 — Traces :**
Je récupère un trace ID depuis les logs du client. La trace me montre :
- API Gateway → Order Service → Inventory Service ❌
- L'Inventory Service renvoie une erreur après 30 secondes (timeout)

**Étape 3 — Logs :**
Je filtre les logs de l'Inventory Service autour du moment de l'erreur :
```
ERROR: Connection refused to database replica-2
WARN: Falling back to primary database
ERROR: Query timeout after 30000ms
```

**Étape 4 — Métriques :**
Je regarde les métriques de l'Inventory Service :
- CPU normal
- Mémoire normale
- Mais connexions DB saturées depuis 8h ce matin
- Coïncide avec un déploiement à 7h55

**Conclusion :**
Le déploiement de 7h55 a introduit un bug qui ne ferme pas correctement les connexions DB dans certains cas. Le pool se sature, les nouvelles requêtes timeout.

**Temps total : 15 minutes.** Sans cette approche méthodique, j'aurais probablement passé des heures à lire du code au hasard.

## Les erreurs classiques à éviter

### Sauter directement au code

C'est LA plus grosse erreur. Tu perds un temps fou à chercher au mauvais endroit.

### Ignorer le timing

"Depuis quand ça se passe ?" est une question cruciale. Corrèle toujours avec les déploiements, les changements de config, les pics de charge...

### Se fier à une seule source

Les traces sans les logs, c'est incomplet. Les logs sans les métriques, c'est du tunnel vision. Utilise tout ce que tu as.

### Ne pas reproduire avant de débuguer

Si tu ne peux pas reproduire le problème, tu ne peux pas valider ta solution. Investis du temps pour trouver un cas reproductible.

### Corriger sans comprendre

"J'ai ajouté un try/catch et ça marche maintenant." Non. Tu as caché le problème, pas résolu. Comprends la cause racine.

## Pour conclure

Débuguer intelligemment, c'est une compétence qui s'apprend. Et la clé, c'est la méthode.

Commence par l'extérieur : les symptômes, les traces, les logs, les métriques. Chaque étape réduit le périmètre. Quand tu arrives au code, tu sais exactement ce que tu cherches.

Cette approche m'a fait gagner des centaines d'heures. Elle fera pareil pour toi.

---

*La prochaine fois que quelque chose plante, résiste à l'envie d'ouvrir l'IDE immédiatement. Respire, ouvre tes dashboards, et suis la chaîne.*
