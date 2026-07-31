---
title: "Pourquoi nos agents IA vivent dans Slack (et pas dans un onglet de navigateur)"
date: 2026-07-31
tag: "IA"
description: "Comment on a déployé chez Formance une équipe d'agents IA directement dans Slack — avec NixOS pour la reproductibilité, Hermes Agents pour l'orchestration, et des personnages de Silicon Valley pour les rendre vivants."
lang: fr
translationKey: agents-slack
---

Il y a quelques mois, j'ai remarqué un truc qui m'a agacé. Tout le monde dans la boîte utilisait l'IA. Mais chacun dans son coin. Un onglet ChatGPT par-ci, un Claude par-là, chacun avec ses prompts, ses habitudes, ses découvertes. Et zéro capitalisation collective. Quand quelqu'un trouvait une bonne façon de faire, ça restait dans son historique de conversation. Perdu pour tout le monde.

Le pire, c'est que ce n'est pas un problème d'outillage. Les outils sont excellents. C'est un problème de *lieu*. L'IA vivait dans des onglets de navigateur, isolée, pendant que le travail, lui, se passait ailleurs : dans Slack.

Alors on a inversé le truc. Au lieu de demander aux gens d'aller vers l'IA, on a amené l'IA là où les gens travaillent déjà. Et honnêtement, ça a tout changé.

## Le problème de l'onglet de navigateur

Réfléchis deux secondes à ce qui se passe quand ton IA vit dans un onglet séparé.

D'abord, il y a le coût du changement de contexte. Tu es dans une conversation Slack, quelqu'un pose une question, tu ouvres un autre onglet, tu réexpliques tout le contexte à l'IA, tu copies la réponse, tu reviens, tu colles. À chaque fois. C'est de la friction pure, et la friction tue l'adoption.

Ensuite, et c'est le plus important : tout ce qui se passe dans un onglet privé est invisible pour le reste de l'équipe. Personne n'apprend de la question de personne. Alors que dans un canal Slack, quand quelqu'un pose une question à un agent et obtient une bonne réponse, dix personnes la lisent en passant. C'est de l'apprentissage par osmose. Le savoir devient un bien commun au lieu d'un historique privé.

Et je ne suis pas le seul à faire ce constat. [Gartner prédit que 40% des applications d'entreprise embarqueront des agents IA spécialisés d'ici fin 2026](https://slack.com/blog/news/slack-is-where-agents-work), contre moins de 5% un an plus tôt. La tendance de fond, c'est exactement ça : les agents quittent les onglets isolés pour rejoindre les endroits où le travail se coordonne déjà.

Mais il y a une troisième raison, et c'est ma préférée : **l'accessibilité**. Tout le monde dans une entreprise ne va pas installer un CLI, configurer des clés API ou apprendre le prompt engineering. Par contre, tout le monde sait mentionner quelqu'un dans Slack. Le jour où l'IA devient aussi simple qu'un `@` dans un canal, elle n'est plus réservée aux devs. Les sales, l'équipe produit, le support — tout le monde a accès au même niveau d'outillage. C'est ça, démocratiser l'IA en interne. Pas des licences et des formations : un `@` dans un canal.

## Notre setup chez Formance

Concrètement, voilà ce qu'on a monté.

**NixOS pour la fondation.** Si tu me lis régulièrement, tu sais que je suis [convaincu par Nix pour la reproductibilité](/fr/blog/pourquoi-adopter-nix-devshells-environnements-reproductibles). Toute la configuration de nos agents est déclarative et versionnée dans git. Si la machine qui les héberge disparaît demain, on la reconstruit à l'identique en quelques minutes. Pas de "ça marchait avant", pas de serveur snowflake bricolé à coups de SSH. L'infrastructure des agents est traitée comme du code, parce que c'en est.

**Hermes Agents pour l'orchestration.** C'est un [framework d'agents open source](https://hermes-agent.ai/) qu'on self-hoste. Il gère la mémoire persistante, les skills, la connexion à Slack, et surtout : il permet de faire tourner plusieurs agents distincts. Chaque agent a **son propre workspace** — sa mémoire, ses outils, son contexte de travail isolé — mais tous partagent **une base de connaissance globale** commune. C'est le meilleur des deux mondes : l'agent produit ne se noie pas dans les runbooks d'infra, mais tout le monde connaît les fondamentaux de la boîte.

Ce point mérite qu'on s'y arrête. Un agent unique qui sait tout faire, ça finit toujours pareil : un contexte gigantesque, des réponses moyennes partout, excellentes nulle part. En séparant les workspaces, chaque agent reste affûté sur son domaine. Et la base partagée évite de répéter dix fois les mêmes informations : qui on est, ce qu'on construit, comment on parle, où sont les choses.

## Des rôles, pas des tâches

C'est le choix de design dont je suis le plus content : nos agents ne sont pas dédiés à des *tâches*, mais à des *rôles*.

La différence est énorme. Un agent-tâche, c'est "le bot qui résume les meetings" ou "le bot qui trie les tickets". Utile, mais figé. Un agent-rôle, c'est un périmètre de responsabilité, comme pour un humain. Le rôle est stable, les tâches évoluent.

Deux exemples de chez nous :

**Monica, notre agent produit.** Elle est connectée en [MCP](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026) à tous nos outils produit. Tu peux lui demander où en est une feature, ce que disent les retours clients sur un sujet, ou de creuser une question de spec. Elle ne fait pas *une* tâche produit, elle occupe *le terrain* du produit.

**Gilfoyle, notre SRE.** Lui, il vit dans les canaux d'infra. Il aide pendant les incidents, il surveille l'état global de la plateforme, et il répond à toutes les questions d'infrastructure — du "pourquoi ce pod redémarre en boucle" au "comment est architecturé notre réseau". Le genre de questions qui, avant, interrompaient systématiquement un humain de l'équipe.

Le MCP (Model Context Protocol) mérite une parenthèse : c'est le standard ouvert qui permet de brancher un agent sur n'importe quel outil sans développer une intégration spécifique à chaque fois. On le décrit souvent comme "l'USB-C de l'IA", et depuis qu'Anthropic l'a [confié à la Linux Foundation fin 2025](https://www.dualmedia.fr/en/mcp-standard-2026-ia/), c'est devenu un standard neutre porté par tout l'écosystème. Concrètement pour nous : brancher Monica sur un nouvel outil produit, c'est de la configuration, pas du développement.

## Le détail qui change tout : ils ont un nom et une tête

Oui, nos agents s'appellent Monica et Gilfoyle. Oui, ce sont des personnages de *Silicon Valley*. Et oui, chacun a son avatar sur Slack.

Ça peut paraître gadget. Ça ne l'est pas du tout.

Un bot qui s'appelle `product-assistant-bot` avec une icône grise, personne ne lui parle naturellement. Un agent qui s'appelle Gilfoyle, avec la tête de Gilfoyle et — soyons honnêtes — un peu de son sarcasme, les gens le mentionnent comme ils mentionneraient un collègue. La personnalité crée de l'attachement, l'attachement crée de l'usage, et l'usage crée de la valeur. C'est aussi simple que ça.

Et il y a un effet de bord que je n'avais pas anticipé : les noms structurent le réflexe. Quand tu as une question d'infra, tu *sais* que c'est pour Gilfoyle. Question produit ? Monica. Personne n'a eu besoin de lire une doc pour comprendre qui fait quoi. Le casting fait office de documentation.

## Soyons honnêtes

Ce setup n'est pas magique, et il y a des pièges.

**Le risque du "agent sprawl".** C'est la tentation de créer un agent pour tout et n'importe quoi. Dix agents mal définis, c'est pire qu'un seul agent moyen : du bruit, de la confusion, des périmètres qui se chevauchent. On ajoute un agent quand un *rôle* le justifie, pas quand une tâche nous passe par la tête.

**La confiance se construit.** Un agent qui répond à côté deux fois de suite dans un canal public, c'est toute l'équipe qui arrête de lui parler. Les premières semaines, on a passé du temps à nourrir les workspaces, corriger les réponses, ajuster les connaissances. Un agent, ça s'onboarde. Comme un humain.

**Les garde-fous ne sont pas optionnels.** Un agent branché en MCP sur tes outils de prod, ça se réfléchit. Qui peut lui demander quoi, qu'est-ce qu'il peut faire en écriture, qu'est-ce qui reste en lecture seule. On a commencé lecture seule presque partout, et on élargit au cas par cas.

## Par où commencer

Si tu veux tenter l'expérience, mon conseil : ne commence pas par la technique, commence par le rôle. Trouve *la* personne de ton équipe qui se fait interrompre dix fois par jour pour les mêmes questions. C'est elle que ton premier agent doit soulager.

Ensuite seulement, choisis l'outillage. Un framework open source self-hosté comme Hermes Agents si tu veux le contrôle complet, ou une solution managée si tu veux aller vite. Branche-le sur un canal, donne-lui un nom, un avatar, un périmètre clair. Et laisse l'équipe se l'approprier.

Le plus dur n'est pas technique. Le plus dur, c'est de penser tes agents comme des collègues qu'on recrute, qu'on onboarde et qu'on fait grandir — pas comme des scripts qu'on déploie.

---

*On n'a pas ajouté de l'IA à notre stack. On a recruté une équipe qui ne dort jamais — et elle a de meilleures répliques que nous.*
