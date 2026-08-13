---
title: "On a mis dix ans à enterrer le mythe du 10x engineer. L'IA est en train de le déterrer."
date: 2026-08-13
tag: "IA"
description: "Un article qui circule prédit que l'IA va faire disparaître la « classe moyenne » des développeurs. Le diagnostic est juste. La conclusion ressuscite un mythe qu'on avait mis dix ans à démonter — et c'est là que ça devient dangereux."
lang: fr
translationKey: 10x-engineer-myth-ai
---

Un article circule pas mal en ce moment : [*AI is removing the middle class of software engineering*](https://blog.florianherrengt.com/ai-removing-middle-class-software-engineering.html) de Florian Herrengt. Sa thèse : l'IA polarise le métier. Les excellents ingénieurs — ceux qui savent valider, cadrer et diriger le travail des agents — deviennent beaucoup plus précieux. Les médiocres deviennent inemployables. Et entre les deux, la « classe moyenne » du développement logiciel disparaît.

J'ai hoché la tête pendant les trois quarts de l'article. Le diagnostic est juste, je le vis tous les jours. Et puis je suis arrivé à la conclusion, et un truc m'a dérangé.

Pas parce qu'elle est fausse. Parce que je l'ai déjà entendue. C'est le mythe du 10x engineer qui revient par la porte de derrière — celui qu'on a passé dix ans à démonter.

## Il a raison sur le diagnostic

Soyons clairs : sur le constat, je suis d'accord avec quasiment tout.

L'IA a supprimé les garde-fous naturels du métier. Avant, la vitesse à laquelle une équipe pouvait produire du code était bornée par des humains qui tapent, relisent et comprennent. Aujourd'hui, un agent te génère des milliers de lignes en un après-midi, et rien ne t'oblige à les comprendre avant de merger. La dette s'accumule plus vite qu'on ne peut la rembourser, et la connaissance du système s'évapore : on demande à l'IA *pourquoi* ce code existe au lieu de le savoir soi-même.

Je ne parle pas en théorie. J'ai [raconté ici](/fr/blog/mon-workflow-ia-claude-code-codex) comment j'ai mergé une PR générée par IA — tests verts, lint OK — qui renvoyait les données du mauvais tenant. Ce jour-là, j'ai compris exactement ce que Herrengt décrit : la confiance aveugle ne se voit pas sur le moment. Elle se paie plus tard.

Et les chiffres vont dans son sens, même s'ils évoluent aussi vite que les outils. Le [rapport DORA 2024](https://dora.dev/research/2024/dora-report/) mesurait qu'une adoption accrue de l'IA s'accompagnait d'une *baisse* de la stabilité des livraisons. Une [étude de METR menée début 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) a même observé que seize développeurs expérimentés, travaillant sur leurs propres dépôts, mettaient 19 % plus de temps avec l'IA — tout en étant persuadés d'aller 20 % plus vite. Le [suivi publié en février 2026](https://metr.org/blog/2026-02-24-uplift-update/) suggère au contraire une accélération avec les outils de fin 2025, mais METR estime ses données trop biaisées pour la mesurer proprement. Le chiffre a changé ; l'écart entre productivité perçue et productivité mesurée reste un avertissement utile. Le problème est réel.

## Le retour du héros

Là où je décroche, c'est sur la conclusion économique : une segmentation extrême, où une élite d'ingénieurs exceptionnels capte toute la valeur pendant que les autres deviennent inemployables.

Ce récit a un nom, et il ne date pas de l'IA. Le « 10x engineer » vient d'une [étude de 1968](https://leanpub.com/leprechauns) menée sur douze développeurs, dans des conditions expérimentales douteuses, et dont les conclusions ont été extrapolées bien au-delà de ce que les données permettaient — Laurent Bossavit a documenté toute la généalogie de ce chiffre dans *The Leprechauns of Software Engineering*. Le mythe a survécu parce qu'il flatte : tout le monde se pense du bon côté du ratio.

J'ai [écrit il y a un an sur l'ego dans les équipes d'ingénierie](/fr/blog/ego-equipe-ingenierie), et sur ce que la culture du héros coûte réellement : rétention d'information, revues de code défensives, bus factor critique, post-mortems où on cherche un coupable au lieu d'une cause. Les recherches de Google sur [Project Aristotle](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness) ont abouti à une conclusion moins spectaculaire et plus utile : parmi les cinq dynamiques identifiées dans les équipes étudiées chez Google, la sécurité psychologique arrivait en tête. Le talent individuel ne suffisait pas à expliquer l'efficacité collective. On avait fini par l'admettre.

Et voilà que l'IA offre au mythe une seconde jeunesse. Le raisonnement a l'air imparable : si un seul ingénieur peut piloter une flotte d'agents, alors seuls les meilleurs pilotes comptent. Recrutez des stars, payez des stars, le reste est remplaçable.

Sauf que ce raisonnement repose sur une erreur d'attribution.

## Un excellent ingénieur ne suffit pas : il faut un système

Le diagnostic de Herrengt décrit des échecs très concrets : une PR de 25 000 lignes qu'on accepte de relire, une abstraction que personne ne questionne, une décision que son auteur ne sait plus expliquer. Sa réponse tient au jugement individuel : quelqu'un doit comprendre ce qui se passe et refuser les mauvais changements. Sur ce point, il a raison.

Mais ce jugement ne devient utile à l'échelle d'une équipe que lorsqu'il se traduit en pratiques : exiger un plan avant de laisser l'IA toucher au code, faire relire chaque changement par un deuxième regard, refuser de merger tant que les tests ne passent pas, documenter le *pourquoi* des décisions. Ce ne sont pas des dons réservés à quelques élus. Ce sont, pour l'essentiel, des pratiques qui peuvent s'apprendre, se transmettre et s'améliorer.

C'est exactement ce que j'ai construit dans [mon workflow Claude Code + Codex](/fr/blog/mon-workflow-ia-claude-code-codex) : un `CLAUDE.md` qui encode mes exigences, un plan obligatoire avant chaque tâche, deux IA qui relisent mutuellement leur travail, des tests et du lint non négociables. Rien de tout ça ne remplace le jugement ou l'expérience. Mais ça évite qu'ils restent enfermés dans la tête d'une seule personne. Mon `CLAUDE.md`, je peux le donner à n'importe qui dans l'équipe demain matin.

La différence entre le dev qui se noie sous le code généré et celui qui surfe dessus ne tient donc pas seulement au jugement de la personne devant l'écran. Elle tient aussi aux garde-fous que l'équipe a construits autour d'elle. Le jugement individuel compte. Mais une organisation ne peut ni le transmettre ni le conserver tant qu'elle ne le transforme pas en pratiques collectives.

## La connaissance n'a pas à s'évaporer

Même chose pour la perte de connaissance institutionnelle. Herrengt écrit qu'« à un moment donné, quelqu'un doit toujours savoir ce qui se passe », et que cette personne devient la plus précieuse de l'équipe. Il a raison : on ne peut pas externaliser le jugement. Mais la conclusion qui s'impose n'est pas « il faut des héros qui savent tout » — c'est « il faut arrêter de stocker le savoir critique dans des têtes individuelles ».

C'est tout le pari qu'on a fait chez Formance en [installant nos agents IA dans Slack](/fr/blog/pourquoi-nos-agents-ia-vivent-dans-slack) plutôt que dans des onglets privés : quand une question et sa réponse vivent dans un canal public, dix personnes apprennent en passant. Le savoir devient un bien commun au lieu d'un historique de conversation perdu. Et quand je demande à Claude Code de rédiger des descriptions de PR qui expliquent le *pourquoi* — des mini-ADR plutôt que des « fix pagination » — c'est la même logique : la connaissance sort de ma tête et entre dans le système.

Le héros qui sait tout est un single point of failure. On a passé des années à éliminer les SPOF de nos infrastructures ; ce serait incohérent d'en réinstaller dans nos organigrammes.

## Le vrai danger : croire à la prophétie

Voilà pourquoi cette conclusion me dérange autant : c'est une prophétie autoréalisatrice.

Une boîte qui achète le récit du retour des 10x engineers va faire des choix très concrets. Recruter « les meilleurs » à prix d'or et négliger la montée en compétence des autres. Tolérer les comportements toxiques de ses stars parce que « ils livrent ». Récompenser les exploits individuels visibles plutôt que le travail invisible qui rend l'équipe meilleure. Autrement dit : détruire méthodiquement la sécurité psychologique et l'apprentissage collectif.

Et c'est là que l'ironie est cruelle. Parce qu'absorber l'IA dans une équipe, c'est précisément un travail collectif : partager les prompts qui marchent, construire les garde-fous ensemble, se former mutuellement aux nouveaux outils, oser dire « je ne comprends pas ce que cet agent a généré » sans craindre de passer pour le médiocre de service. Une culture du héros rend cette phrase imprononçable. Résultat : tout le monde merge en silence du code que personne ne comprend — exactement le scénario catastrophe que Herrengt décrit. La prophétie se réalise, non pas parce qu'elle était vraie, mais parce qu'on y a cru.

## Soyons honnêtes

Est-ce que ça veut dire que tout le monde s'en sortira ? Non. Et je ne vais pas faire semblant du contraire.

Je ne sais pas si la « classe moyenne » des développeurs va disparaître au sens économique où l'entend Herrengt. En revanche, un mode de travail fondé sur l'exécution de tickets sans compréhension du système devient clairement plus fragile. L'IA relève la barre sur le jugement et la vérification. Si ton mode de travail consiste à accepter ses suggestions sans les lire, aucun garde-fou ne te sauvera — et ce n'est la faute ni de Herrengt ni de l'IA.

Et les systèmes dont je parle ne se construisent pas tout seuls. Quelqu'un doit les créer, les maintenir, les défendre quand la pression du delivery pousse à prendre des raccourcis. C'est un investissement réel, pas un tour de magie.

Mais c'est justement ça, la bonne nouvelle : une équipe peut décider de faire cet investissement. Il ne supprimera pas les différences d'expérience ou de jugement ; il évitera qu'elles deviennent un point de défaillance unique.

## Par où commencer

Si tu es développeur et que l'article de Herrengt t'a mis un coup au moral, ne cherche pas seulement à « devenir excellent ». Commence par mettre les pratiques en place. Un `CLAUDE.md` de dix lignes. Un plan exigé avant chaque tâche. Un deuxième regard — IA ou humain — sur tout ce que tu merges. Tu peux commencer à améliorer ton travail en quelques semaines, sans attendre des années d'expérience supplémentaires.

Si tu es lead, pose-toi une seule question : si ton meilleur ingénieur partait demain, que resterait-il de son excellence ? Si la réponse est « rien », tu n'as pas un excellent ingénieur. Tu as un héros — et un risque. Ton boulot, c'est de transformer ce qu'il fait de mieux en pratiques que toute l'équipe applique : c'est exactement ce que l'ère de l'IA récompense.

---

*Le mythe du 10x engineer réduit l'excellence à des individus exceptionnels. Dans une équipe durable, elle repose aussi sur des systèmes — des boucles de feedback, des garde-fous, du savoir partagé. L'IA n'a pas changé ça. Elle a simplement augmenté le coût de l'ignorer.*
