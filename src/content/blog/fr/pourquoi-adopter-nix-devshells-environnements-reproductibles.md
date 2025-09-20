---
title: "Pourquoi adopter les devShells Nix pour des environnements reproductibles"
description: "L'environnement de développement parfait, enfin reproductible. Mon retour d'expérience sur Nix et pourquoi cette solution change tout."
date: 2025-09-10
tag: "Nix"
lang: fr
---

## L'environnement de développement parfait, enfin reproductible

Après des années à me battre avec des conflits de versions, des environnements qui divergent entre collègues et des « ça marche sur ma machine » interminables, j'ai découvert Nix. Et pour moi, c'est une révolution dans la gestion des environnements de développement.

Contrairement aux gestionnaires de paquets traditionnels que j'ai tous essayés (Homebrew, apt, conda, nvm...), Nix adopte une approche purement fonctionnelle qui garantit enfin la reproductibilité des builds et des environnements, du laptop à la CI jusqu'à la production.

## Qu'est-ce que Nix exactement ?

Nix, c'est à la fois :

- Un gestionnaire de paquets multiplateforme (Linux, macOS, WSL)
- Un gestionnaire d'environnements de développement (devShells)
- Un système de build déclaratif (flakes et dérivations)

Sa particularité clé : chaque paquet (et environnement) est construit dans un chemin unique du store Nix, dérivé de l'ensemble de ses dépendances de build. Deux builds avec les mêmes entrées produisent les mêmes sorties, au même chemin — c'est la base de la reproductibilité.

## Mon déclic avec les devShells

Les devShells sont des environnements de développement par projet, décrits en Nix, que l'on active à la demande. Pour moi, ils ont résolu quatre galères quotidiennes que je vivais depuis des années.

1) Isolation fiable et sans bricolage

- Chaque repo décrit ses dépendances outils (compilateurs, CLIs, linters, SDKs) et leurs versions.
- L'activation n'écrit rien dans votre système global, ne pollue pas votre `/usr/local`, et ne casse pas d'autres projets.
- Passer d'un projet à l'autre revient à changer de dossier.

2) Versions verrouillées et partagées

- Le fichier `flake.lock` fige précisément les entrées utilisées. Toute l'équipe travaille sur les mêmes versions.
- La CI consomme les mêmes entrées, ce qui évite les « ça passe sur ma CI mais pas chez toi ».

3) Onboarding éclair

- Cloner → `nix develop` → c'est prêt. Fini les longues sections « Installation » dans le README.
- Le shell peut exposer des commandes d'équipe (tests, lint, build) et configurer des variables d'environnement communes.

4) Polyglotte et cross‑platform

- Python, Node, Go, Rust, Java… cohabitent proprement via un seul mécanisme.
- Les mêmes définitions fonctionnent sous macOS, Linux et WSL.

### Mon avant/après au quotidien

**Avant Nix :**
- Débugger pendant des heures un projet qui ne build plus après une mise à jour système
- Passer une demi-journée à installer l'environnement d'un nouveau projet
- Écumer les issues GitHub pour comprendre pourquoi "ça marche chez lui mais pas chez moi"

**Avec Nix :**
- Plus jamais d'incident Node 18 vs 20, ou OpenSSL 1.1 vs 3
- Les nouveaux arrivants sont opérationnels en minutes, pas en heures
- Les commandes d'équipe deviennent enfin mémorisables (`task test`, `task fmt`, `task check`)

## Isolation parfaite : finies les dépendances qui s'entrechoquent

Grâce aux flakes et à `direnv`/`nix-direnv`, chaque projet définit précisément ses outils et bibliothèques. En entrant dans le dossier, l'environnement adéquat est chargé automatiquement, sans polluer le système global.

Ce que j'ai pu faire concrètement, en parallèle sur ma machine :

- GCC 11 pour un projet legacy et GCC 13 pour un projet récent
- Python 2.7 + Node.js 14 pour un ancien projet et Python 3.12 + Node.js 20 pour un nouveau
- Versions distinctes d'OpenSSL, de bases de données, etc.

Terminé le casse-tête des versions système globales !

### Exemple minimal avec flakes + direnv

`flake.nix` :

```nix
{
  description = "devShell Nix minimal";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";

  outputs = { self, nixpkgs }: let
    system = "x86_64-darwin"; # ou x86_64-linux / aarch64-darwin
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = [ pkgs.nodejs_20 pkgs.python311 pkgs.git ];
      # Variables d'environnement et hooks optionnels
      shellHook = ''
        echo "[devshell] Node: $(node -v), Python: $(python3 --version)";
        export PIP_DISABLE_PIP_VERSION_CHECK=1
        export UV_NO_CACHE=1
      '';
    };
  };
}
```

`.envrc` :

```sh
# Option A: direnv de base
use nix

# Option B (recommandée): nix-direnv pour des activations instantanées
# use flake
```

Ensuite :

```sh
direnv allow      # à exécuter une fois
```

Les activations suivantes sont instantanées avec `nix-direnv` (cache de shells).

## Multi‑versions sans compromis

Nix permet l'installation simultanée de multiples versions d'un même paquet, sans hacks. Cette « navigation dans le temps » est idéale pour maintenir des projets legacy tout en développant avec les versions les plus récentes.

## Reproductibilité partout : local, CI et environnements éphémères

Avec des définitions déclaratives et le fichier de verrouillage (`flake.lock`), j'ai la garantie que l'environnement sera identique partout où je l'utilise :

**En local :** Mon MacBook, celui d'un collègue, ma VM Linux - même versions, même comportement.

**En CI :** GitHub Actions, GitLab CI, peu importe - la CI utilise exactement les mêmes outils que moi en local.

**Dans les environnements éphémères :** Le plus bluffant, c'est avec des outils comme Devin.ai. Je peux partager mon `flake.nix` et l'IA dispose instantanément du même environnement que moi, sans installation manuelle, sans setup complexe.

Résultat : plus de "ça marche en local mais pas en CI", plus de temps perdu à synchroniser les versions entre développeurs et systèmes automatisés.

## Collaboration d'équipe simplifiée

Onboarding quasi instantané :

1. Cloner le repository
2. `nix develop`
3. Coder immédiatement

C'est d'ailleurs l'approche que nous avons adoptée en équipe : j'ai commencé par proposer un simple `flake.nix` sur un projet pilote, sans forcer personne. Résultat : adoption progressive et naturelle, sans friction.

## Un gestionnaire de paquets unifié

Nix remplace efficacement une myriade d'outils :

- Système : MacPorts/Homebrew
- JavaScript : npm/yarn
- Python : pip/conda
- Ruby : gem
- Éditeur/CLI : plugins vim/neovim, VS Code, tmux, fish/zsh

Une commande pour tout installer sur une nouvelle machine, une logique unique pour toutes les stacks.

## Développement à distance et environnements éphémères

**Serveurs de développement :** Plus besoin de supplier l'admin système pour installer la bonne version de Node ou Python. Je déploie mon `flake.nix`, et l'environnement est identique à celui de mon laptop.

**Avec des IA comme Devin :** C'est là où ça devient magique. Je partage mon environnement Nix, et l'IA dispose instantanément du même setup que moi. Pas de "comment installer X", pas de différences d'environnement.

**En CI/CD :** Fini les problèmes de versions entre ma machine et la CI. Même Nix, même environnement, mêmes résultats.

## Un écosystème d'outils puissants

- direnv + nix-direnv : activation automatique et caching des shells
- Home Manager : dotfiles et préférences utilisateur en déclaratif, portables entre machines
- Flakes : composition, reproductibilité, lockfile intégré

Compléments utiles :

- Cachix : cache binaire d'équipe, installe encore plus vite et de façon identique
- `devenv.sh` (Cachix) : surcouche ergonomique pour services locaux (DB, queues) et scripts d'équipe
- `process-compose` : orchestration de plusieurs processus de dev dans le shell

## Défis et considérations

- Courbe d'apprentissage réelle : j'ai mis quelques semaines à être à l'aise avec la terminologie (derivations, store, flakes).
- Documentation parfois déroutante : riche mais dispersée, j'ai souvent appris par l'exemple.
- Adoption progressive : j'ai commencé par un seul projet, puis étendu petit à petit.

Malgré cela, mon retour sur investissement a été net en productivité et sérénité.

### Pièges fréquents et comment les éviter

- Shells « trop impurs » : si vous dépendez d'états externes (démons locaux, sockets, secrets), documentez‑les. Pour la CI, privilégiez des shells le plus hermétiques possible.
- Fermetures (closures) volumineuses : utilisez un cache binaire d'équipe (Cachix/serveur Nix) pour éviter de reconstruire.
- Variantes macOS/Linux : structurez vos flakes pour générer les shells par `system` (ex. via `flake-utils`).

## Adoption croissante

L'écosystème Nix dépasse les 120 000 paquets. De plus en plus d'équipes que je rencontre l'adoptent, que ce soit en production ou juste pour standardiser leurs environnements de dev.

## Conclusion : pourquoi j'ai adopté Nix

Pour moi, Nix a été un game changer. Fini le "ça marche sur ma machine", fini les heures perdues à débugger des conflits de versions, fini les onboardings pénibles.

Aujourd'hui, je ne conçois plus de démarrer un projet sans un devShell Nix. C'est devenu aussi naturel que de créer un README.

Oui, j'ai passé quelques weekends à comprendre les concepts — mais le gain en sérénité au quotidien est inestimable. Et quand un collègue me dit "ton projet ne fonctionne pas chez moi", je sais que c'est juste qu'il n'a pas encore fait `nix develop` 😉
