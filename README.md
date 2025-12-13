# Application Web de Réservation de Salles – Frontend

## 📖 Description

Cette application web permet la **réservation et la gestion de salles** (publiques ou privées) via une interface moderne et sécurisée.

Le frontend est responsable de :

- L’authentification et la gestion des utilisateurs
- L’accès conditionnel aux salles selon les permissions
- La gestion des réservations et des notifications
- L’expérience utilisateur selon les rôles (Utilisateur, Manager, Administrateur)

---

## 🎯 Fonctionnalités principales

### 👤 Gestion des utilisateurs

- Création de compte utilisateur
- Authentification sécurisée
- Gestion des rôles :
  - **Utilisateur**
  - **Utilisateur – Manager** (permissions étendues)
  - **Administrateur**

### 🏢 Gestion des salles

- Création de **salles publiques ou privées** (Administrateurs)
- Accès aux salles via une URL dédiée
  - Vérification de l’**authentification**
  - Vérification de l’**autorisation**
- Limitation à **5 salles maximum** pour les utilisateurs en version gratuite
- Version **payante** permettant la création de **plus de 5 salles**

### 🗓️ Réservations

- Création, modification et déplacement de réservations
- Gestion des conflits de réservation
- Événements exceptionnels (maintenance, indisponibilité, etc.)

### 👥 Groupes

- Création de groupes par les utilisateurs
- Rattachement d’utilisateurs à un groupe
- Gestion des préférences de notification par groupe

### 🔔 Notifications

- Notifications (activables/désactivables) pour :
  - Création de salle
  - Déplacement ou modification de réservation
  - Événements exceptionnels

---

## 🔐 Permissions et rôles

### Administrateur

- Création et gestion des salles (publiques / privées)
- Gestion globale des accès

### Utilisateur – Manager

- Permissions d’édition sur une ou plusieurs salles définies
- Gestion des réservations associées à ces salles

### Utilisateur

- Consultation des salles autorisées
# Salleo — Frontend

**Application :** gestion et réservation de salles (frontend Angular).

## Résumé
Salleo est une interface moderne pour gérer des salles et leurs réservations. Le projet fournit :
- Authentification et gestion d'utilisateur
- Gestion des salles (création, listing, permissions)
- Réservations avec détection de conflits
- Stores légers (RxJS) pour l'état local

> Note : l'intégration complète à l'API REST sera ajoutée plus tard. En local, un utilisateur de test permet de se connecter sans API.

---

**Fonctionnalités déjà fonctionnelles (local/dev)**

- Connexion locale avec un utilisateur de test (pas d'API requise)
  - Email : `test@example.com`
  - Mot de passe : `password`
  - En local, ces identifiants génèrent un token `dev-token` stocké dans `sessionStorage` sous la clé `salleo_token`.
- Stores RxJS pour `users`, `rooms`, `reservations` (lecture/écriture en mémoire ou via API si configurée)
- Interceptor HTTP qui attache `Authorization: Bearer <token>` si un token est présent
- Guards de route basiques (protection par authentification)
- Thème "Neo‑Tech Funk" appliqué globalement

---

**Spécifications techniques**

- Framework : Angular (standalone components)
- State management : RxJS BehaviorSubjects (services de store)
- HTTP : `HttpClient` + interceptor pour token
- Auth : `AuthService` (dev mock + fallback vers `/api/auth/login`)
- SSR: configuration minimale et middleware Express (`src/server.ts`) pour headers de sécurité
- Sécurité :
  - Les en-têtes security (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) sont définis côté serveur dans `src/server.ts`.
  - En dev, la meta CSP et l'en-tête serveur autorisent `unsafe-inline` et `blob:` pour faciliter le dev (WebWorkers blobs, scripts inline). En production, retirez ces exceptions et appliquez des nonces/hashes ou servez les workers depuis des fichiers statiques.

---

## Démarrage local

1) Installer les dépendances

```bash
npm install
```

2) Lancer le serveur de développement (watch)

```bash
npm run start
# ou
ng serve
```

- Ouvrir http://localhost:4200/
- Se connecter avec l'utilisateur de test : `test@example.com` / `password`.

3) Build de production (optionnel)

```bash
npm run build
# servir le répertoire dist (exemple avec http-server)
npx http-server ./dist/salleo -p 4201
# puis ouvrir http://localhost:4201
```

4) Notes utiles
- Le token dev est `dev-token` et est stocké en `sessionStorage` sous la clé `salleo_token`.
- Si vous voulez forcer la session dev sans passer par le formulaire, dans la console du navigateur :

```js
sessionStorage.setItem('salleo_token', 'dev-token');
```

- Pour effacer la session :

```js
sessionStorage.removeItem('salleo_token');
```

---

## Debug & sécurité (conseils)

## Seeder (peupler des données de test)

Un petit script permet de générer des jeux de données de développement dans `src/assets/mock-data.json`.

- Script Node : `scripts/dev-seed.js`
- Wrapper shell : `scripts/dev-seed.sh`
- NPM : `npm run dev-seed`

Exemple :

```bash
npm run dev-seed
# output: src/assets/mock-data.json
```

Le fichier généré contient des objets `users`, `rooms` et `reservations` (un `dev-user` et quelques salles). Vous pouvez utiliser ce fichier comme source pour un mock API local ou pour peupler votre backend de test.


- CSP : en dev on autorise `unsafe-inline` et `blob:` ; en production, retirez ces valeurs et utilisez :
  - nonces/hashes pour scripts inline
  - `worker-src 'self'` + servir les workers depuis un fichier statique
  - header `Strict-Transport-Security` (HSTS) uniquement derrière HTTPS
- X-Frame-Options : doit être envoyé côté serveur (défini dans `src/server.ts`) — ne laissez pas de meta `X-Frame-Options` dans `index.html`.
- Auth : l'implémentation actuelle propose un fallback mock local. L'API REST devra renvoyer `{ token }` pour que la connexion fonctionne sans fallback.

---

## Structure importante (fichiers clés)

- `src/app/auth/*` — `AuthService`, `login.component.ts`, `token.interceptor.ts`, `auth.guard.ts`
- `src/app/store/*` — stores RxJS (`users`, `rooms`, `reservations`)
- `src/app/rooms/*`, `src/app/reservations/*` — pages principales
- `src/server.ts` — serveur Express minimal + headers security
- `src/index.html`, `src/styles.scss`, `src/app/app.scss` — thème et styles globaux

---

## Roadmap (prioritaire)

- Finaliser l'intégration REST pour l'authentification et les ressources (users, rooms, reservations)
- Remplacer `unsafe-inline` / `blob:` par une stratégie sécurisée (nonces, fichiers statiques pour workers)
- Ajouter tests unitaires et e2e
- Mettre en place CI/CD et règles de sécurité pour la prod

---

Si vous voulez, j'ajoute au README :
- un exemple d'API contract pour `/api/auth/login` (body attendu et réponse `{ token }`),
- scripts pratiques (ex: `scripts/dev-seed.sh`) pour peupler des données de test.

Indiquez si vous voulez ces ajouts et je les intègre.
