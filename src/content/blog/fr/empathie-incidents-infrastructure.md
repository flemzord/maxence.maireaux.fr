---
title: "Quand l'infrastructure tombe : pourquoi le trolling doit cesser"
description: "C'est toujours la même chose : quand un provider a des problèmes, les clients des concurrents trollent plutôt que d'envoyer de l'amour. Il est temps qu'on en parle."
date: 2025-10-20
---

C'est toujours la même chose, quand un provider tombe ou a des problèmes, tu as les clients des autres providers qui trollent plutôt que d'envoyer de l'amour. C'est juste totalement ridicule.

AWS a un incident ? Les clients GCP trollent. OVH rencontre des problèmes ? Scaleway et consorts en profitent pour tacler. Un provider quelconque a une panne ? Les clients des concurrents et même certains membres du staff arrivent avec leurs critiques ouvertes et leurs remarques acerbes.

Et pendant ce temps, des équipes d'ops sont en train de suer sang et eau, à 3h du matin, pour rétablir le service.

Aujourd'hui, j'ai envie de parler de ce comportement que j'observe depuis des années dans notre industrie. Parce que franchement, il est temps qu'on arrête ces conneries.

## Le comportement que j'observe (trop) souvent

Le schéma est toujours le même lors d'un incident d'infrastructure :

1. Un provider majeur annonce un incident sur son status page
2. Les équipes ops se mobilisent immédiatement pour diagnostiquer et résoudre
3. Les clients impactés commencent à signaler les problèmes (normal)
4. **Les clients des concurrents débarquent pour troller et critiquer**

Ce dernier point, c'est le problème. Sur Twitter, LinkedIn, dans les communautés Slack ou Discord, je vois fleurir :
- "Nous chez [concurrent] on n'a jamais ce genre de problème"
- "C'est pour ça qu'il faut pas utiliser [provider]"
- "Ah ah, et après ils se disent leaders du marché"
- Des memes, des gifs moqueurs, du schadenfreude à gogo

Parfois, c'est même des employés des concurrents qui se permettent des remarques limite marketing déguisé en "conseil technique".

## Pourquoi ce comportement existe-t-il ?

J'ai beaucoup réfléchi à ce phénomène, et je pense qu'il y a plusieurs facteurs psychologiques et sociaux qui entrent en jeu.

### Le tribalisme technologique

Je l'observe partout dans la tech : Linux vs Windows, Vim vs Emacs, React vs Vue... Et bien sûr, AWS vs GCP vs Azure. On choisit un camp, et ce camp devient une partie de notre identité professionnelle.

Quand "notre" choix technique semble validé par les problèmes du concurrent, ça nous conforte dans notre décision. C'est rassurant. C'est humain.

Mais c'est aussi toxique.

### Le marketing d'opportunité

Certaines personnes (parfois même du staff des entreprises) voient les incidents des concurrents comme une opportunité marketing gratuite. "Passez chez nous, on est plus fiables" devient le message sous-jacent.

Le problème ? C'est contre-productif. La prochaine fois que **leur** infrastructure aura un souci (et ça arrivera), ils seront les cibles des mêmes attaques.

### Le manque d'empathie technique

J'ai l'impression que beaucoup de ceux qui trollent n'ont jamais géré d'infrastructure critique à grande échelle. Ils ne savent pas ce que c'est que de :
- Être réveillé à 2h du matin par un pager
- Devoir diagnostiquer un problème complexe sous pression
- Communiquer avec des milliers de clients en colère
- Réparer un système tout en évitant d'aggraver la situation

C'est facile de critiquer quand on n'est pas dans les tranchées.

### L'illusion de l'invincibilité

"Ça n'arrivera jamais chez nous." C'est ce que pensent beaucoup de monde... jusqu'à ce que ça arrive.

L'infrastructure parfaite n'existe pas. Tous les grands providers ont eu (et auront) des incidents :
- AWS a eu des pannes majeures dans plusieurs régions
- GCP a perdu des données suite à un incident réseau
- Azure a eu des coupures globales
- OVH a littéralement brûlé (et a géré l'incident de manière exemplaire)
- Scaleway, Digital Ocean, Linode... tous ont eu leurs moments difficiles

## Pourquoi je pense que c'est toxique pour toute la communauté

Ce comportement n'est pas qu'un problème de "hurt feelings". Je vois des conséquences concrètes et néfastes.

### Ça nuit à la transparence

Quand les équipes savent qu'elles seront trollées publiquement, elles peuvent être tentées de :
- Minimiser les incidents dans leur communication
- Retarder les annonces pour "être sûrs"
- Être moins transparentes sur les causes profondes

Résultat ? Moins de transparence, moins de post-mortems détaillés, moins d'apprentissage collectif.

### Ça détruit la solidarité de la communauté ops

Je suis convaincu qu'on est tous dans le même bateau. Ops, SRE, DevOps, Platform Engineers... on fait tous face aux mêmes défis :
- Maintenir des systèmes complexes à l'échelle
- Gérer la pression de la haute disponibilité
- Équilibrer innovation et stabilité

En se trollant mutuellement, on détruit cette solidarité qui devrait nous unir.

### Ça décourage le partage d'expérience

Les meilleurs post-mortems que j'ai lus viennent d'entreprises qui n'ont pas peur d'être transparentes sur leurs erreurs. Si le trolling devient la norme, on aura moins de :
- Retours d'expérience détaillés
- Analyses techniques approfondies
- Partage des leçons apprises

Et toute la communauté sera plus pauvre techniquement.

### Ça crée un climat de peur

Pour les équipes plus petites ou les startups, voir comment les "grands" se font traiter peut être terrorisant. Ça peut même les dissuader d'être transparents sur leurs propres incidents.

## Une nuance importante : on peut critiquer, mais pas pendant l'incident

Je ne dis pas qu'il faut être aveuglément positif envers tous les providers. Tu as parfaitement le droit de :
- Critiquer les choix techniques d'un fournisseur
- Partager ton retour d'expérience négatif
- Expliquer pourquoi tu as migré vers un autre provider
- Pointer du doigt des problèmes récurrents de fiabilité

**Mais il y a un moment et un lieu pour ça. Et ce n'est PAS pendant un incident actif.**

Imagine la situation : tu fais partie d'une équipe d'ops en pleine gestion d'incident. Tu es sous pression, tu n'as pas dormi, tu fais tout ce que tu peux pour restaurer le service. Et pendant ce temps, tu vois sur Twitter ou LinkedIn des gens qui se foutent de ta gueule, qui font des memes, qui utilisent ton stress comme argument marketing.

C'est terrible. C'est même cruel.

Ces équipes sont composées d'êtres humains. Des gens qui ont des familles, qui ont sacrifié leur nuit, qui sont déjà sous une pression énorme. Rajouter une couche de moquerie publique à ce moment précis, c'est juste inhumain.

Tu veux critiquer un provider ? Très bien. Fais-le :
- **Après l'incident**, quand tu peux analyser le post-mortem à froid
- **De manière constructive**, en expliquant ce qui n'a pas fonctionné selon toi
- **Sans schadenfreude**, sans cette joie malsaine de voir l'autre échouer
- **À un autre moment**, quand tu partages ton retour d'expérience ou ton choix de migration

Mais pendant l'incident ? Le minimum de décence, c'est soit de se taire, soit d'envoyer du soutien.

## Ce que je pense qu'on devrait faire à la place

J'ai ma petite idée sur comment on pourrait mieux réagir lors des incidents d'infrastructure. Voici ce que je fais (ou essaie de faire) personnellement.

### Envoyer du soutien, pas du mépris

Un simple message de soutien peut faire une énorme différence pour une équipe en crise :
- "Bon courage aux équipes qui gèrent l'incident"
- "On est passés par là, tenez bon"
- "Merci pour la transparence dans votre communication"

Ces messages coûtent rien, mais ils montrent qu'on comprend la réalité du métier.

### Apprendre de l'incident

Plutôt que de troller, je préfère :
- Lire attentivement les communications d'incident
- Analyser les causes techniques
- Me demander si ma propre infrastructure est vulnérable au même type de problème
- Partager des insights constructifs

C'est une opportunité d'apprentissage collectif, pas de division.

### Être humble

Je me rappelle toujours que :
- Tous les systèmes peuvent tomber
- La complexité de l'infrastructure moderne rend les incidents inévitables
- On a tous été (ou on sera) dans cette situation un jour

Un peu d'humilité ne fait jamais de mal.

### Défendre la transparence

Quand une entreprise fait un bon post-mortem transparent, j'essaie de le souligner publiquement :
- Remercier pour la transparence
- Partager les leçons apprises
- Encourager d'autres à faire de même

C'est comme ça qu'on crée une culture d'apprentissage.

## Mon appel à faire mieux

Je ne suis pas naïf. Je sais que le trolling ne va pas disparaître du jour au lendemain. Mais je crois qu'on peut tous faire notre part.

La prochaine fois qu'un provider a un incident, je t'invite à :
- **Résister à l'envie de troller** - même si c'est tentant, même si tu n'aimes pas l'entreprise
- **Envoyer un message de soutien** - aux équipes qui gèrent l'incident
- **Défendre la transparence** - remercier pour les communications claires
- **Apprendre quelque chose** - chaque incident est une leçon pour tous

Et si tu es client du provider en question et impacté, oui, tu as le droit d'être frustré. Mais même là, il y a une différence entre exprimer ta frustration de manière constructive et verser dans l'insulte ou le mépris.

## Pour conclure

L'infrastructure moderne est complexe. Les incidents sont inévitables. Ce qui n'est pas inévitable, c'est notre réaction face à ces incidents.

On peut choisir le trolling, le tribalisme et la toxicité. Ou on peut choisir l'empathie, le soutien et l'apprentissage collectif.

Pour ma part, mon choix est fait. Et toi ?

---

*La prochaine fois que tu vois un incident majeur, demande-toi : qu'est-ce que tu veux contribuer à la communauté ? Du bruit ou du soutien ?*
