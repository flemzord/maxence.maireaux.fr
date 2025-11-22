---
title: "Message Queues vs Pub/Sub : arrêtez de les confondre"
description: "Je vois trop souvent des architectures avec Kafka là où une simple queue aurait suffi, ou pire, RabbitMQ pour gérer des millions d'événements. On parle de deux systèmes fondamentalement différents."
date: 2025-11-22
tag: "Architecture"
lang: fr
translationKey: message-queues-vs-pub-sub
---

J'ai perdu le compte du nombre de fois où j'ai vu quelqu'un proposer Kafka pour gérer l'envoi d'emails. Ou inversement, tenter de faire de l'analytics temps réel avec RabbitMQ.

Le problème ? La plupart des gens pensent que Message Queues et Pub/Sub, c'est pareil. Que c'est juste une question de préférence personnelle, comme Vim vs Emacs.

Spoiler : c'est pas pareil. Pas du tout.

Et choisir le mauvais outil pour le mauvais job, c'est se préparer des nuits blanches et des incidents bien relous.

## Pourquoi cette confusion existe

Je pense que le problème vient du fait que les deux systèmes résolvent un problème similaire en surface : envoyer des messages de manière asynchrone entre différentes parties d'une application.

Tu veux déclencher un traitement sans bloquer ton API ? Tu penses "messaging".

Tu veux traiter des événements en temps réel ? Tu penses aussi "messaging".

Résultat : tout se mélange dans la tête des gens.

Mais sous le capot, on parle de deux architectures complètement différentes, basées sur deux structures de données fondamentalement différentes.

## La vraie différence : Queue vs Log

C'est là que tout se joue.

**RabbitMQ, SQS, et autres Message Queues utilisent une Queue** (une file d'attente, quoi). Tu sais, la structure de données FIFO que tu as apprise en L1 : tu ajoutes à la fin, tu retires du début.

**Kafka, Pulsar, NATS JetStream, et autres systèmes Pub/Sub utilisent un Log**. Pas un log applicatif hein, mais la structure de données Log : un journal append-only qu'on peut lire et relire.

Et cette différence technique, aussi simple qu'elle paraisse, change absolument tout.

### La Queue : lis et jette

Avec une queue, le comportement est simple et brutal :

1. Un message arrive
2. Un consommateur le lit
3. Il le traite
4. Il l'acquitte
5. **Le message est supprimé. À jamais. Gone.**

C'est le principe même de la file d'attente : une fois que tu as pris ton ticket, le prochain client prend le sien. Ton ticket n'existe plus.

Ce modèle est parfait pour représenter des **jobs** - des unités de travail qui doivent être faites une fois, et une seule fois.

### Le Log : lis et relis

Avec un log, c'est radicalement différent :

1. Un message arrive
2. Il est ajouté à la fin du log
3. Un (ou plusieurs) consommateurs le lisent
4. **Le message reste là. Il n'est pas supprimé.**

Chaque consommateur garde juste un pointeur (offset) pour savoir où il en est dans sa lecture. Mais le message lui-même reste disponible pour être relu autant de fois que nécessaire.

C'est pour ça que Kafka est souvent décrit comme un "journal distribué" - comme un journal papier, tu peux revenir en arrière et relire les vieilles nouvelles.

## Quand utiliser une Message Queue

J'utilise des message queues quand j'ai des **tâches discrètes** à exécuter. Le genre de truc où tu peux dire "ce job est fait" ou "ce job a échoué".

### Cas d'usage typiques

**Envoyer des emails ou notifications**

Tu as 1000 utilisateurs à notifier ? Balance les user IDs dans une queue, et que les workers se partagent le boulot. Chaque email part une fois, et une seule fois.

**Jobs CI/CD**

Déclencher des builds, lancer des tests, déployer en prod. Chaque job est unique, a un début et une fin claire.

**Génération de rapports**

Un client demande un export PDF de ses données ? Hop, dans la queue. Quand c'est fait, c'est fait.

**Traitement d'images ou de vidéos**

Redimensionner des photos, transcoder des vidéos. Des tâches longues et coûteuses qui bénéficient du parallélisme.

### Ce que j'aime avec les queues

**Le parallélisme qui marche vraiment**

Tu peux avoir 10, 50, 100 workers qui lisent depuis la même queue. Chacun traite son message indépendamment. Un job lent ne bloque pas les autres.

J'ai déjà eu des pipelines CI où certains builds prenaient 5 minutes et d'autres 2 heures. Avec une queue, aucun problème : les builds rapides ne sont pas bloqués par les lents.

**Les fonctionnalités riches**

Les message queues modernes, c'est pas juste une FIFO bête et méchante. Tu as :

- **Des priorités** : les emails de réinitialisation de mot de passe passent avant les newsletters
- **Des TTL** : si un job n'a pas été traité en 1 heure, on le jette
- **Du routing** : selon le type de tâche, on envoie vers différentes queues
- **Des retry avec backoff** : un job échoue ? On le remet dans la queue avec un délai exponentiel
- **De la validation de schéma** : on s'assure que le message est bien formé avant de l'accepter

Tout ça, c'est invaluable quand tu construis des systèmes résilients.

**La simplicité du modèle mental**

Une queue, c'est facile à comprendre. Tu as un job à faire ? Tu le mets dans la queue. Ton worker prend un job, le traite, l'acquitte. Simple.

### Le mythe de l'instabilité

"Ouais mais RabbitMQ ça crash tout le temps et ça perd des messages."

J'entends souvent ça. Et c'était vrai... il y a 10 ans.

Les anciennes implémentations de message queues stockaient tout en RAM. Résultat : si tu avais trop de messages, boom, out of memory, crash, et tous tes messages perdus.

Pire : si tes consumers étaient lents, ta queue se remplissait, crashait, et du coup tes producers pouvaient plus écrire non plus. Couplage horrible.

**Les MQ modernes ne font plus ça.** RabbitMQ, SQS, tous persistent sur disque maintenant. Tu peux avoir des millions de messages en attente, ça va pas crasher.

## Quand utiliser du Pub/Sub

J'utilise du Pub/Sub quand je bosse avec des **flux d'événements** qu'il faut analyser dans leur ensemble.

### Cas d'usage typiques

**Analytics en temps réel**

Tu veux compter les clics, les vues, calculer des métriques ? Tous ces événements qui arrivent en continu, il faut pouvoir les lire en batch et les agréger.

**Détection d'anomalies**

Surveiller les connexions suspectes, détecter de la fraude, identifier des bots. Tu as besoin de l'historique et de l'ordre des événements pour détecter des patterns.

**Event sourcing**

Stocker tous les événements qui modifient l'état de ton système. Tu peux reconstruire l'état à n'importe quel moment en rejouant les événements.

**Streaming de données entre services**

Plusieurs équipes ont besoin de consommer les mêmes événements (nouvelles commandes, changements de prix, mises à jour d'inventaire). Chaque équipe lit à son rythme.

### Ce que j'aime avec les logs

**Le replay, cette fonctionnalité magique**

Un bug dans ton consumer a pourri tes données pendant 3 jours ? Pas de panique. Tu fixes le bug, tu remets l'offset à 3 jours en arrière, et tu rejoues tout.

J'ai sauvé ma peau plusieurs fois grâce à ça.

**Le read-fanout sans effort**

Tes événements de commande sont lus par :
- L'équipe comptabilité pour la facturation
- L'équipe logistique pour l'expédition
- L'équipe analytics pour les dashboards
- L'équipe marketing pour les recommandations

Chaque équipe lit le même stream à son rythme, avec son propre consumer group. Aucune duplication de données nécessaire.

**L'ordre garanti par clé**

Tous les événements d'un même utilisateur vont dans la même partition et sont traités dans l'ordre. C'est crucial quand tu fais du stateful processing.

Exemple : tu détectes de la triche dans un jeu en analysant les mouvements d'un joueur. Si les événements arrivent dans le désordre, ton algo de détection va partir en vrille.

**La scalabilité extrême**

Kafka peut facilement ingérer des millions de messages par seconde. J'ai bossé sur des systèmes qui généraient 50 000 événements par seconde, et Kafka ne bronchait pas.

### Le prix à payer

Pour scaler à ce niveau, Kafka et consorts sacrifient beaucoup de features :

- Pas de priorités sur les messages
- Pas de routing complexe
- Pas de validation de schéma côté serveur (faut utiliser un Schema Registry à côté)
- Pas de retry automatique avec backoff

C'est un "dumb pipe" volontairement simple. Les smarts, c'est toi qui les mets dans tes producers et consumers.

Et honnêtement ? Pour la plupart des use cases de message queuing, tu veux pas de ça. Tu veux des features, pas de la perf brute.

## Le cas particulier de NATS : l'hybride

NATS mérite qu'on en parle parce que c'est un peu l'exception qui confirme la règle.

**NATS Core**, c'est du pub/sub pur et simple. Ultra léger, ultra rapide, mais tout en mémoire. Pas de persistance, pas de replay, pas de garanties de livraison.

C'est parfait pour des use cases où tu t'en fous de perdre quelques messages :
- Communication temps réel entre microservices (discovery, health checks)
- Notifications non critiques
- Events légers où la fraîcheur prime sur la fiabilité

J'ai utilisé NATS Core pour de la communication inter-services dans un cluster Kubernetes. C'était parfait : latence ultra basse, simple à setup, et si un message se perd, c'est pas grave.

Mais bon, pour la plupart des use cases, perdre des messages c'est pas acceptable.

**NATS JetStream**, c'est là que ça devient intéressant.

JetStream ajoute la persistance à NATS. Du coup, tu as :
- La simplicité de NATS
- La persistance d'un log (comme Kafka)
- Le replay
- Des consumer groups
- Des acknowledgments

C'est comme si NATS avait décidé de jouer dans la cour des grands avec Kafka et Pulsar.

Mais avec un avantage : tu peux mixer les deux modes. NATS Core pour les trucs légers, JetStream quand tu as besoin de persistance.

### Où je mettrais NATS dans mon architecture

Pour être honnête, NATS occupe un créneau un peu particulier :

**NATS Core** : Quand tu veux du pub/sub ultra simple et que la perte de messages est acceptable. C'est rare dans la vraie vie, mais ça existe.

**NATS JetStream** : Alternative intéressante à Kafka pour de l'event streaming, surtout si :
- Tu veux quelque chose de plus simple à opérer que Kafka
- Tu as déjà NATS Core dans ton infra
- Ton volume reste raisonnable (millions de messages/jour, pas millions/seconde)

J'ai une préférence pour JetStream sur des projets mid-scale. C'est plus léger que Kafka à opérer, mais tu gardes les features essentielles du log.

Par contre, si tu scales vraiment fort (genre Netflix), tu vas quand même finir sur Kafka. L'écosystème et la maturité sont incomparables.

## Les erreurs que je vois tout le temps

### Erreur #1 : Kafka pour envoyer des emails

J'ai vu ça dans une boîte. Ils utilisaient Kafka pour envoyer des emails transactionnels.

Problèmes :
- Pas de retry automatique. Il faut gérer ça dans le consumer
- Pas de DLQ (dead letter queue) native. Faut l'implémenter soi-même
- Si le service d'email plante, tu dois gérer le replay manuellement
- C'est compliqué pour rien

Une simple SQS ou RabbitMQ avec retry et DLQ aurait été 10x plus simple et robuste.

### Erreur #2 : RabbitMQ pour de l'event streaming

Inverse : utiliser RabbitMQ pour streamer des millions d'événements analytics.

Problèmes :
- Les messages sont supprimés après lecture. Tu perds l'historique
- Pas de replay possible
- Le fanout est compliqué (il faut dupliquer les messages dans plusieurs queues)
- Performance limitée comparé à Kafka

Si tu veux de l'event streaming, prends un vrai système de streaming.

### Erreur #3 : Ne pas reconnaître qu'on a les deux besoins

Dans une vraie appli, tu as souvent besoin des deux.

- Kafka pour les événements métier (commandes, clics, logs)
- SQS/RabbitMQ pour les jobs (emails, génération de rapports)

C'est OK d'avoir les deux. Utilise le bon outil pour le bon job.

## Comment choisir

Je me pose toujours ces questions :

**Est-ce un job à faire une fois, ou un événement à analyser ?**

- Job une fois → Message Queue
- Événement à analyser → Pub/Sub

**Combien de consommateurs vont lire ce message ?**

- Un seul (point-à-point) → Message Queue
- Plusieurs équipes/services → Pub/Sub

**As-tu besoin de rejouer les messages ?**

- Non, une fois traité c'est fini → Message Queue
- Oui, pour replay ou debug → Pub/Sub

**Quel est le volume ?**

- Quelques milliers par seconde → Les deux marchent
- Des millions par seconde → Pub/Sub

**As-tu besoin de features (priorités, retry, routing) ?**

- Oui, c'est crucial → Message Queue
- Non, simple pipe suffit → Pub/Sub

## Pour conclure

Message Queues et Pub/Sub, c'est pas la même chose. Arrêtez de les interchanger.

Une queue, c'est pour des jobs. Tu lis, tu traites, tu jettes. Point à point. Plein de features pour gérer les erreurs.

Un log, c'est pour des événements. Tu écris, tu lis (et relis). One-to-many. Scale à mort mais simple comme un pipe.

Les deux ont leur place dans ton architecture. Apprends à reconnaître quel problème tu résous vraiment, et choisis le bon outil.

Ton futur toi te remerciera.

---

*La prochaine fois qu'on te propose "on va mettre Kafka", demande-toi : est-ce qu'on a vraiment besoin de stocker ces événements et de les rejouer ? Ou est-ce qu'on veut juste exécuter des jobs ?*
