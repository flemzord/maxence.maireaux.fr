---
title: "Why Adopt Nix devShells for Reproducible Environments"
description: "The perfect development environment, finally reproducible. My experience with Nix and why this solution changes everything."
date: 2025-09-10
tag: "Nix"
lang: en
translationKey: nix-devshells
---

## The Perfect Development Environment, Finally Reproducible

After years of fighting with version conflicts, environments that diverge between colleagues, and endless "it works on my machine" scenarios, I discovered Nix. And for me, it's a revolution in development environment management.

Unlike traditional package managers I've tried them all (Homebrew, apt, conda, nvm...), Nix takes a purely functional approach that finally guarantees build and environment reproducibility, from laptop to CI to production.

## What Exactly is Nix?

Nix is simultaneously:

- A cross-platform package manager (Linux, macOS, WSL)
- A development environment manager (devShells)
- A declarative build system (flakes and derivations)

Its key feature: each package (and environment) is built in a unique path in the Nix store, derived from all its build dependencies. Two builds with the same inputs produce the same outputs, at the same path — that's the foundation of reproducibility.

## My Breakthrough with devShells

DevShells are per-project development environments, described in Nix, that you activate on demand. For me, they solved four daily struggles I'd been living with for years.

1) Reliable Isolation Without Hacks

- Each repo describes its tool dependencies (compilers, CLIs, linters, SDKs) and their versions.
- Activation writes nothing to your global system, doesn't pollute your `/usr/local`, and doesn't break other projects.
- Switching between projects is as simple as changing directories.

2) Locked and Shared Versions

- The `flake.lock` file precisely freezes the inputs used. The entire team works on the same versions.
- CI consumes the same inputs, avoiding "it passes on my CI but not on yours".

3) Lightning-Fast Onboarding

- Clone → `nix develop` → ready to go. No more lengthy "Installation" sections in the README.
- The shell can expose team commands (tests, lint, build) and configure common environment variables.

4) Polyglot and Cross-Platform

- Python, Node, Go, Rust, Java... coexist cleanly through a single mechanism.
- The same definitions work on macOS, Linux, and WSL.

### My Daily Before/After

**Before Nix:**
- Debug for hours a project that won't build after a system update
- Spend half a day installing a new project's environment
- Scour GitHub issues to understand why "it works for him but not for me"

**With Nix:**
- Never again Node 18 vs 20 incidents, or OpenSSL 1.1 vs 3
- New team members are operational in minutes, not hours
- Team commands finally become memorable (`task test`, `task fmt`, `task check`)

## Perfect Isolation: No More Clashing Dependencies

Thanks to flakes and `direnv`/`nix-direnv`, each project precisely defines its tools and libraries. When entering the folder, the appropriate environment is automatically loaded, without polluting the global system.

What I've been able to do concretely, in parallel on my machine:

- GCC 11 for a legacy project and GCC 13 for a recent project
- Python 2.7 + Node.js 14 for an old project and Python 3.12 + Node.js 20 for a new one
- Distinct versions of OpenSSL, databases, etc.

No more global system version headaches!

### Minimal Example with Flakes + direnv

`flake.nix`:

```nix
{
  description = "Minimal Nix devShell";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";

  outputs = { self, nixpkgs }: let
    system = "x86_64-darwin"; # or x86_64-linux / aarch64-darwin
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = [ pkgs.nodejs_20 pkgs.python311 pkgs.git ];
      # Optional environment variables and hooks
      shellHook = ''
        echo "[devshell] Node: $(node -v), Python: $(python3 --version)";
        export PIP_DISABLE_PIP_VERSION_CHECK=1
        export UV_NO_CACHE=1
      '';
    };
  };
}
```

`.envrc`:

```sh
# Option A: basic direnv
use nix

# Option B (recommended): nix-direnv for instant activations
# use flake
```

Then:

```sh
direnv allow      # execute once
```

Subsequent activations are instant with `nix-direnv` (shell caching).

## Multi-Version Without Compromise

Nix allows simultaneous installation of multiple versions of the same package, without hacks. This "time travel" is ideal for maintaining legacy projects while developing with the latest versions.

## Reproducibility Everywhere: Local, CI, and Ephemeral Environments

With declarative definitions and the lock file (`flake.lock`), I have the guarantee that the environment will be identical wherever I use it:

**Locally:** My MacBook, a colleague's, my Linux VM - same versions, same behavior.

**In CI:** GitHub Actions, GitLab CI, doesn't matter - CI uses exactly the same tools as I do locally.

**In ephemeral environments:** The most impressive is with tools like Devin.ai. I can share my `flake.nix` and the AI instantly has the same environment as me, without manual installation, without complex setup.

Result: no more "it works locally but not in CI", no more time wasted synchronizing versions between developers and automated systems.

## Simplified Team Collaboration

Near-instant onboarding:

1. Clone the repository
2. `nix develop`
3. Code immediately

This is actually the approach we adopted as a team: I started by proposing a simple `flake.nix` on a pilot project, without forcing anyone. Result: progressive and natural adoption, without friction.

## A Unified Package Manager

Nix effectively replaces a myriad of tools:

- System: MacPorts/Homebrew
- JavaScript: npm/yarn
- Python: pip/conda
- Ruby: gem
- Editor/CLI: vim/neovim plugins, VS Code, tmux, fish/zsh

One command to install everything on a new machine, one logic for all stacks.

## Remote Development and Ephemeral Environments

**Development servers:** No more begging the system admin to install the right version of Node or Python. I deploy my `flake.nix`, and the environment is identical to my laptop.

**With AIs like Devin:** This is where it gets magical. I share my Nix environment, and the AI instantly has the same setup as me. No "how to install X", no environment differences.

**In CI/CD:** No more version problems between my machine and CI. Same Nix, same environment, same results.

## A Powerful Tool Ecosystem

- direnv + nix-direnv: automatic activation and shell caching
- Home Manager: dotfiles and user preferences declaratively, portable between machines
- Flakes: composition, reproducibility, integrated lockfile

Useful complements:

- Cachix: team binary cache, installs even faster and identically
- `devenv.sh` (Cachix): ergonomic overlay for local services (DB, queues) and team scripts
- `process-compose`: orchestration of multiple dev processes in the shell

## Challenges and Considerations

- Real learning curve: it took me a few weeks to get comfortable with the terminology (derivations, store, flakes).
- Sometimes confusing documentation: rich but scattered, I often learned by example.
- Progressive adoption: I started with a single project, then gradually extended.

Despite this, my return on investment has been clear in productivity and peace of mind.

### Common Pitfalls and How to Avoid Them

- "Too impure" shells: if you depend on external states (local daemons, sockets, secrets), document them. For CI, favor the most hermetic shells possible.
- Large closures: use a team binary cache (Cachix/Nix server) to avoid rebuilding.
- macOS/Linux variants: structure your flakes to generate shells by `system` (e.g., via `flake-utils`).

## Growing Adoption

The Nix ecosystem exceeds 120,000 packages. More and more teams I meet are adopting it, whether in production or just to standardize their dev environments.

## Conclusion: Why I Adopted Nix

For me, Nix has been a game changer. No more "it works on my machine", no more hours lost debugging version conflicts, no more painful onboarding.

Today, I can't imagine starting a project without a Nix devShell. It's become as natural as creating a README.

Yes, I spent a few weekends understanding the concepts — but the daily peace of mind is invaluable. And when a colleague tells me "your project doesn't work on my machine", I know it's just because they haven't done `nix develop` yet 😉