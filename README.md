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

## Salleo — Frontend

**Application :** gestion et réservation de salles (frontend Angular).

## Résumé

Salleo est une interface moderne pour gérer des salles et leurs réservations. Le projet fournit :

- Authentification et gestion d'utilisateur
- Gestion des salles (création, listing, permissions)
- Réservations avec détection de conflits
- Stores légers (RxJS) pour l'état local

> Note : l'intégration complète à l'API REST sera ajoutée plus tard. En local, un utilisateur de test permet de se connecter sans API.

---

## Fonctionnalités déjà fonctionnelles (local/dev)

- Authentification : `AuthService` supporte soit l'envoi d'un mot de passe en clair (le client le hashe avant d'envoyer), soit l'envoi d'un `passwordHash` avec `clientHashed: true`. Le hash client est SHA‑256 (Web Crypto). Le backend doit BCrypter le hash reçu pour le stockage et la comparaison.
- Services API : `RoomApiService`, `ReservationApiService` exposent les endpoints et servent de couche principale (remplacent les anciens stores plus lourds).
- Interceptor HTTP : attache `Authorization: Bearer <token>` si `sessionStorage.salleo_token` est présent.
- Guards de route basiques (protection par authentification).
- UI : Pagination côté client pour les salles (10 éléments par page), loader pendant le chargement, et toasts via `ToastService` / `ToastComponent`.
- Thème "Neo‑Tech Funk" appliqué globalement.

---

## Spécifications techniques

- Framework : Angular (standalone components)
- Accès aux données : services `src/app/services/*` exposant méthodes `list()` / `create()` (remplacent les anciens stores lourds)
- HTTP : `HttpClient` + interceptor pour token; `proxy.conf.json` configure le proxy `/api` → `http://localhost:8080` pour le dev
- Auth : `AuthService` accepte `password` ou `passwordHash` (avec `clientHashed`), client calcule SHA‑256 avant envoi
- SSR : Express middleware dans `src/server.ts` gère headers de sécurité et CSP. En dev, la CSP autorise `http://localhost:8080` pour faciliter le front→API via proxy.

---

## Démarrage local

1. Installer les dépendances

```bash
npm install
```

1. Lancer le serveur de développement (watch)

```bash
npm run start
# ng serve --proxy-config proxy.conf.json
```

- Ouvrir <http://localhost:4200/>
- Le front utilise par défaut le proxy `/api` → `http://localhost:8080`. Assurez‑vous que votre backend écoute sur `http://localhost:8080` ou adaptez `src/environments/api.urls.ts` / variables d'environnement (`API_BASE_ENV`, `API_ENV`).

1. Build de production (optionnel)

```bash
npm run build
# servir le répertoire dist (exemple avec http-server)
npx http-server ./dist/salleo -p 4201
# puis ouvrir http://localhost:4201
```

1. Notes utiles

- Il n'y a plus de "dev-token" automatique dans le front. Pour bypasser l'auth en dev, vous pouvez insérer manuellement un token valide dans `sessionStorage` (clé `salleo_token`) ou utiliser un backend mock adapté.
- Pour le hashage : le client calcule SHA‑256 (Web Crypto) et envoie `{ passwordHash, clientHashed: true }` vers `/api/auth/*`.

## Seeder (peupler des données de test)

Les données de développement sont fournies en assets :

- `src/assets/dev-rooms.json` — jeu de salles (100 entrées) pour le développement local.
- `src/assets/seed_rooms.sql` et `src/assets/schema.sql` — scripts SQL pour peupler une base PostgreSQL locale.

(Ancien script `scripts/dev-seed.js` et `scripts/dev-seed.sh` ont été retirés.)

- CSP : en dev la configuration permet `http://localhost:8080` pour les connexions API. En production, retirez les exceptions (`unsafe-inline`, `blob:`) et utilisez nonces/hashes ou fichiers statiques pour les workers.
- X-Frame-Options : géré côté serveur (`src/server.ts`).
- Auth : le frontend calcule un hash client (SHA‑256) pour le mot de passe — le backend doit BCrypt ce hash pour le stockage et la comparaison.

---

## Structure importante (fichiers clés)

- `src/app/auth/*` — `AuthService`, `login.component.ts`, `register.component.ts`, `token.interceptor.ts`, `auth.guard.ts`
- `src/app/services/*` — services API (`rooms`, `reservations`, etc.) remplaçant les anciens stores
- `src/app/components/*` — composants pages (Rooms, Reservations, Login, Register, Toast)
- `src/server.ts` — serveur Express minimal + headers security
- `src/index.html`, `src/styles.scss` — thème et styles globaux

---

## Roadmap (prioritaire)

- Finaliser l'intégration REST pour l'authentification et les ressources (users, rooms, reservations). En particulier : accepter et BCrypt du `passwordHash` envoyé par le client.
- Restaurer/ajouter une option de session de développement (dev user / dev token) si nécessaire pour le flux local.
- Ajouter tests unitaires et e2e pour couvrir l'auth, rooms et reservations.
- Mettre en place CI/CD et renforcer les règles de sécurité (retirer `unsafe-inline` / `blob:` en prod, appliquer nonces/hashes).
- UX : ajouter spinners globaux, validation côté champ, et tests d'accessibilité.

## Gestion des salles par les Managers

-Un utilisateur qui créer une salle deviendra automatiquement un manager de salle.
-Un manager de salle pourra créer un groupe/une équipe.
-Un manager pourra inviter des utilisateurs à rejoindre son groupe . (notifications mail + application).
-Un manager pourra créer plus de salle par la suite.
-Un manager pourra créer un aménagement (équipements en tout genre, du meuble au feutre).
-Un manager pourra créer des plannings d'ouverture des salles.
-Un manager pourra accepter les demandes de réservation des utilisateurs de son/ses groupes.(Notification mail + application)
-Un manager pourra gérer les permissions des utilisateurs de leur groupe au sein de leur groupe. (possibilité d'élever les permissions de manière unitaire)(Notification mail + application)

- Un utilisateur membre d'un groupe pourra faire une demande de résérvation de salle de son groupe. (Notification mail + application manager + user)
- Un utilisateur membre d'un groupe pourra modifier une demande de résérvation de salle de son groupe.(Notification mail + application manager + user)
- Un utilisateur membre d'un groupe pourra supprimer une demande de résérvation de salle de son groupe.(Notification mail + application manager + user)
- Un utilisateur membre d'un groupe pourra quitter un groupe.(Notification mail + application manager groupe)
- Un utilisateur membre d'un groupe pourra pourra faire une demande de permission.(Notification mail + application manager groupe)

## Idées Améliorations

- Intégration du calendrier google pour pouvoir intégrer le calendrier du user et récupérér ses réunions pour qu'il calque ses résérvation visuelement avec ses besoins.
- Messagerie entre user d'un groupe, discussion de salle ?
- Signalement de salle? Equipement manquant ? Endommagé ?
- Intégrer un suivi de libération de salle ? Notifications de disponibilité sur créneaux configurés ?
