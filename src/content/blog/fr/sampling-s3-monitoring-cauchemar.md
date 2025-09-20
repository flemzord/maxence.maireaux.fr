---
title: "Sampling et S3 : Le cauchemar du monitoring moderne"
date: 2025-06-15
description: "Pourquoi le sampling et le stockage sur S3 sont devenus les pires ennemis d'un monitoring efficace, et comment ces pratiques compromettent la visibilité opérationnelle."
tags: ["monitoring", "observability", "infrastructure", "devops", "s3", "sampling"]
---

Après des années à travailler avec des systèmes de monitoring et d'observabilité, j'ai vu se répéter les mêmes erreurs. Deux pratiques en particulier me font grincer des dents à chaque fois : le sampling des données et l'utilisation de S3 comme backend principal pour le monitoring. Ces approches, souvent adoptées pour réduire les coûts, finissent par créer plus de problèmes qu'elles n'en résolvent.

## Le sampling : quand l'économie devient aveuglement

Le sampling, cette pratique qui consiste à ne conserver qu'un échantillon de vos métriques, logs ou traces, est souvent présenté comme LA solution miracle pour réduire les coûts. Mais à quel prix ?

### La perte de granularité qui tue

Imaginez cette situation : votre application subit des micro-coupures de 100ms toutes les 5 minutes. Avec un sampling à 10%, vous avez 90% de chances de ne jamais les voir. Ces événements transitoires, pourtant critiques pour l'expérience utilisateur, deviennent invisibles.

J'ai vu des équipes passer des semaines à chercher la cause d'un problème intermittent, pour finalement découvrir que l'information cruciale avait été éliminée par le sampling. Un bug qui se produit sur 0.1% des requêtes ? Avec un sampling agressif, vous ne le verrez probablement jamais.

### L'alerting qui devient une loterie

Le sampling transforme votre système d'alerting en jeu de hasard. Un pic d'erreurs de courte durée peut passer complètement inaperçu s'il tombe dans la fenêtre non échantillonnée. J'ai vu des incidents majeurs n'être détectés qu'après plusieurs heures, simplement parce que les premières manifestations du problème avaient été "samplées out".

### Le debugging impossible

Quand un incident survient, vous avez besoin de toutes les données pour reconstituer la chaîne d'événements. Mais avec le sampling, c'est comme essayer de résoudre un puzzle avec la moitié des pièces manquantes. Cette trace qui aurait montré exactement où le problème a commencé ? Désolé, elle n'a pas été conservée.

## S3 : le stockage qui n'était pas fait pour ça

S3 est fantastique pour beaucoup de choses. Le monitoring n'en fait pas partie.

### La latence qui rend tout inutilisable

S3 est optimisé pour la durabilité et le stockage à long terme, pas pour les requêtes rapides et fréquentes. Essayer de faire une requête complexe sur des logs stockés dans S3, c'est comme essayer de chercher une aiguille dans une botte de foin... avec des gants de boxe.

Les requêtes qui prendraient quelques millisecondes dans une base de données spécialisée peuvent prendre plusieurs minutes avec S3. En situation de crise, ces minutes peuvent faire la différence entre un incident mineur et une catastrophe.

### Le coût caché des opérations

Ironiquement, utiliser S3 pour économiser peut finir par coûter plus cher. Chaque PUT, chaque GET, chaque requête est facturée. Avec des millions de petits objets (logs, métriques), les coûts d'API explosent rapidement. Ajoutez à cela les coûts d'egress quand vous devez analyser vos données, et votre "solution économique" devient un gouffre financier.

### L'accès temps réel impossible

Le monitoring, c'est avant tout du temps réel. Mais S3 n'est pas conçu pour ça. La cohérence éventuelle, les délais de propagation, l'absence de streaming natif... Autant d'obstacles qui rendent S3 inadapté pour des dashboards temps réel ou des alertes réactives.

## Les conséquences dans le monde réel

L'outage S3 de 2017 reste gravé dans les mémoires. Pendant près de 3 heures, des services majeurs comme Quora, Coursera, Docker et Medium ont perdu toute visibilité opérationnelle. Leurs logs ? Inaccessibles. Leurs métriques ? Introuvables. Les équipes étaient littéralement aveugles face à leurs propres systèmes.

Ce n'est pas un cas isolé. Combien d'incidents sont passés inaperçus à cause du sampling ? Combien d'heures perdues à attendre que S3 daigne répondre à une requête urgente ?

## La solution : investir dans le bon outil

Le monitoring n'est pas un endroit où économiser. C'est votre système nerveux, vos yeux et vos oreilles dans le monde de la production. Utiliser des solutions inadaptées comme le sampling agressif ou S3 comme backend principal, c'est accepter de naviguer à l'aveugle.

Des solutions existent : bases de données time-series spécialisées, systèmes de logs avec indexation performante, architectures distribuées avec réplication... Oui, elles coûtent plus cher que S3. Mais le coût d'un incident non détecté ou mal diagnostiqué est infiniment supérieur.

## Conclusion

Le sampling et S3 pour le monitoring sont des fausses bonnes idées. Elles promettent des économies mais livrent de l'aveuglement opérationnel. Dans un monde où la disponibilité et la performance sont critiques, peut-on vraiment se permettre de faire l'impasse sur une visibilité complète ?

La prochaine fois qu'on vous propose de "réduire les coûts" avec du sampling ou de "simplifier" avec S3, posez-vous la question : combien coûtera le prochain incident que vous ne verrez pas venir ?