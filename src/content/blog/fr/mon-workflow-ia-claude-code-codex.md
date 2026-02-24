---
title: "J'ai mis deux IA en code review l'une contre l'autre — voici ce que ça donne"
date: 2026-02-24
tag: "IA"
description: "Comment j'ai arrêté de bricoler avec l'IA et construit un vrai process où Claude Code et Codex se challengent mutuellement avant que je ne regarde une seule ligne."
lang: fr
translationKey: claude-code-codex-workflow
---

Il y a un an, mon usage de l'IA pour coder ressemblait à celui de tout le monde. Un coup de Copilot par-ci, un prompt ChatGPT par-là, un "merci c'est parfait" sans vraiment relire. Ça marchait, plus ou moins. Surtout moins.

Le déclic, c'est un vendredi soir. Je bossais sur un POC interne — rien de critique, juste un outil pour l'équipe. Je venais de merger une PR générée quasi intégralement par IA. Tests verts, lint OK, ça avait l'air propre. Sauf que le lundi matin, un collègue me ping : "Ton endpoint, il renvoie les données du mauvais tenant quand t'as deux sessions actives." Sur un POC, c'est pas la fin du monde. Mais ça m'a fait réfléchir : si je laisse passer ça sur un projet sans enjeu, qu'est-ce que je laisse passer quand la pression est là ? J'avais fait confiance aveuglément, et même sur un POC, c'est une mauvaise habitude à prendre.

Ce jour-là, je me suis dit : si je veux vraiment déléguer à l'IA, il faut que je la traite comme un dev junior brillant mais qui a besoin de supervision. Et un seul regard ne suffit jamais.

## Le truc qui a tout changé : un fichier texte

Ça va paraître ridiculement simple, mais la première chose qui a transformé mon workflow, c'est un fichier. Un bête fichier `CLAUDE.md` à la racine de ma machine.

C'est le fichier de configuration de Claude Code. Quand tu lances une session, il le lit en premier. Et dedans, j'ai mis tout ce que je répétais en boucle à l'IA à chaque conversation :

*"Fais-moi un plan avant de coder." "Ne me dis pas que c'est fini si t'as pas lancé les tests." "Garde ça simple, arrête de sur-ingénierer."*

Ça a l'air de rien, mais avant ça, chaque session repartait de zéro. Je passais les 5 premières minutes à recadrer. Maintenant, Claude Code arrive avec le bon état d'esprit dès le départ. C'est comme bosser avec quelqu'un qui a lu la doc du projet avant de commencer — rafraîchissant.

J'y ai aussi mis une règle que j'adore : la boucle d'auto-amélioration. Chaque fois que je corrige Claude Code sur quelque chose, il le note dans un fichier de leçons. La prochaine session, il ne refait pas la même erreur. C'est bête, mais au bout de quelques semaines, la différence est flagrante.

## "Montre-moi ton plan avant de toucher au code"

C'est la règle numéro un de mon `CLAUDE.md`, et c'est celle qui me fait gagner le plus de temps.

Avant, quand je voulais une feature, je tapais un truc du genre "ajoute-moi la pagination sur l'endpoint /users" et Claude Code partait direct dans le code. Résultat : il modifiait 8 fichiers, cassait un truc que j'avais pas vu, et je passais plus de temps à comprendre ce qu'il avait fait qu'à le faire moi-même.

Maintenant, il me sort un plan. Quels fichiers il va toucher, dans quel ordre, pourquoi. Et moi, je lis. Vraiment. Je challenge. "Pourquoi tu veux modifier le middleware alors que c'est juste de la pagination ?" "T'as pensé au cas où le curseur est expiré ?"

Parfois je rejette tout et on repart de zéro. Et c'est OK. Un plan, ça coûte 30 secondes à générer. Du code mal pensé, ça coûte des heures à détricoter.

Le truc contre-intuitif, c'est que ça ralentit le début mais accélère tout le reste. Quand le plan est bon, l'implémentation sort quasi propre du premier coup.

## Et tout ça, je le dis à voix haute

Un détail qui surprend toujours quand j'en parle : je ne tape quasiment plus mes prompts. Je les dicte.

Des outils comme Wispr Flow ou SuperWhisper font de la dictée intelligente — tu parles, et le texte arrive directement dans ton terminal, ton IDE, ta fenêtre de chat. Pas besoin de bouton, pas besoin de corriger. Tu parles comme tu penses et le texte suit.

Au début, je me suis senti un peu ridicule à parler seul devant mon écran. Maintenant, c'est devenu tellement naturel que c'est le clavier qui me semble lent. Quand je challenge un plan de Claude Code — "non attends, pourquoi tu veux passer par un middleware ici alors qu'un simple wrapper suffit ?" — c'est plus fluide de le dire que de le taper. La pensée sort plus vite, plus brute, plus honnête.

Et il y a un effet secondaire que j'avais pas anticipé : parler m'oblige à formuler clairement. Quand tu tapes, tu peux écrire un prompt vague et espérer que l'IA comprenne. Quand tu parles, tu t'entends. Et si ta phrase est confuse, tu le sais immédiatement.

## Là où ça devient intéressant : deux IA qui se parlent

OK, donc Claude Code a un plan validé, il implémente. Les tests passent, le lint est content. À ce stade, l'ancien moi aurait mergé. Le nouveau moi fait un truc un peu weird : j'envoie tout à Codex.

Pas pour qu'il corrige. Pour qu'il **review**.

Codex n'a pas écrit ce code. Il n'a pas le biais du créateur. Il débarque avec un œil frais et il n'est pas là pour faire plaisir. Et régulièrement, il trouve des trucs. Un edge case oublié, un nommage ambigu, un test qui teste la mauvaise chose.

Mais le plus intéressant, c'est ce qui se passe après. Je ne corrige pas moi-même les remarques de Codex. Je les renvoie à Claude Code. "Codex dit que ta gestion d'erreur ici est fragile, qu'est-ce que t'en penses ?"

Et là, Claude Code peut répondre. Parfois il est d'accord et corrige. Parfois il argumente : "Non, c'est intentionnel parce que [raison]." Codex re-review, contre-argumente ou valide.

**Je ne coupe pas tant que les deux ne sont pas alignés.**

C'est un peu comme observer deux développeurs seniors débattre en code review. Sauf que ça prend 3 minutes au lieu de 3 heures, personne ne prend les remarques personnellement, et moi je bois mon café en regardant.

Est-ce que c'est parfait ? Non. Ils ont parfois des angles morts communs. Mais le code qui sort de cette boucle est systématiquement meilleur que ce qu'un seul des deux aurait produit.

## Le filet de sécurité, c'est pas l'IA — c'est l'outillage

Un point important : je ne fais pas confiance aux IA *parce que* ce sont des IA. Je leur fais confiance parce que j'ai des garde-fous solides autour.

Tous mes projets tournent avec du linting strict, des tests automatisés, des pre-commit hooks. C'est non négociable. Si le lint pète, on corrige. Si un test échoue, on recommence. L'IA ne peut pas tricher et passer outre.

C'est ça qui me permet de dormir tranquille. Les tests ne sont pas là pour vérifier que l'IA a bien codé. Ils sont là pour vérifier que **le code fait ce qu'on attend**, peu importe qui l'a écrit.

Et une fois que tout est vert et que les deux IA sont d'accord, je fais quand même un tour rapide. Mais un tour ciblé. Je ne relis pas chaque ligne — ça, les machines l'ont fait. Je regarde les choix d'architecture, les interfaces exposées, et les trucs métier que seul quelqu'un qui connaît le contexte peut évaluer. Le genre de choses qu'aucun test ne peut attraper.

## La PR qui raconte une histoire

Dernier truc qui a changé ma vie : la description de PR.

Avant, mes descriptions c'était "fix pagination" ou "add user endpoint". Utile comme un panneau "route" au milieu d'une autoroute.

Maintenant, je demande à Claude Code de rédiger la description en se concentrant sur le *pourquoi*. Pas "ajouté un try/catch à la ligne 42" — ça, on le voit dans le diff. Je veux savoir : pourquoi cette approche ? Quel compromis a été fait ? Quel impact sur le reste du système ?

Une bonne description de PR, c'est une mini-ADR (Architecture Decision Record). Quelqu'un qui la lit dans 6 mois doit comprendre le raisonnement, pas juste les changements.

Effet secondaire inattendu : les discussions en review sont devenues plus intéressantes. Quand la description parle d'architecture, les reviewers parlent d'architecture. Quand elle parle de lignes de code, tout le monde nitpick des points de style.

## Soyons honnêtes

Ce workflow n'est pas magique. Il marche parce que j'ai investi du temps dans trois trucs :

**Un bon `CLAUDE.md`.** C'est un document vivant. Chaque fois que l'IA fait un truc qui m'agace, j'ajoute une règle. Au début ça fait 10 lignes, au bout de quelques mois c'est un vrai playbook.

**Des tests solides.** C'est le socle de tout. Sans tests, déléguer à l'IA c'est juste de l'espoir. L'IA peut écrire du code magnifique qui ne fait absolument pas ce qu'on attend.

**Rester dans la boucle.** Je valide le plan. Je valide le résultat. L'IA accélère, mais le jugement reste le mien. Le jour où j'arrête de relire les plans et les résultats, c'est le jour où je me retrouve avec un bug de tenant en prod un vendredi soir.

Si tu veux essayer, commence petit. Un `CLAUDE.md` de 10 lignes avec tes 3 règles les plus importantes. L'exigence d'un plan avant chaque tâche. Et un deuxième regard, que ce soit Codex, un autre LLM, ou un collègue humain. Personne ne devrait merger du code qu'une seule paire d'yeux a vu.

---

*Le meilleur code que j'ai shippé cette année, je ne l'ai pas écrit. Mais chaque ligne porte mon jugement.*
