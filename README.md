
# Web app full stack  Bugtracker

## Idée générale du projet:

Bug tracker avec auth, base de données, etc...

## Parcours utilisateurs:

En tant qu'utilisateur je veux pouvoir:

- créer un compte
- me connecter
- créer un ticket
- voir mes tickets
- voir les tickets des autres utilisateurs
- modifier mes tickets

## organisation du projet :

- Frontend next pour UI/UX
- Backend node gestion des utilisateurs / tickets

### déploiement:

- docker
- google cloud
- github actions
- CI/CD

### frontend:

- react/next
- typescript
- tailwind css
- redux ?

### backend:

- node
- express
- typescript
- node-postgres
- psql

## Participation:

- fork / clone
- dans le terminal (racine projet):

		```bash
			# pour lancer les conteneurs
			(sudo) docker-compose up --build -d

			# pour arrêter les conteneurs
			(sudo) docker compose down

			# pour entrer dans un conteneur (si besoin)
			(sudo) docker exec -it <nom du conteneur> sh
		```
frontend next: port 3000; backend node: port 8000

- bases de données utilisables pour dev dans leurs conteneurs:

		psql:localhost:5000
		cf. docker-compose.yml

- compléter .env dans root folder pour base de données de dev avec docker-compose (voir example.rootenv)

- Tests/lint/format:
	- ```npm run test-all``` dans frontend next et backend node: eslint, prettier, type-check et tests unitaires (pour les commandes spécifiques: voir package.json)
	- ```task test-all``` dans api django: flake8, pylint, black, mypy, pytest (idem: voir Taskfile.yml pour les commandes spécifiques)
	- TODO: pre-commit hooks et Taskfile général (root folder)

- TODO: scripts de population / génération de données pour les db dev

Normalement, tout est bon. vous êtes prêts. si questions, n'hésitez pas.


### Progression :

#### démarrer le projet:

- [x] créer le repo
- [x] créer le readme avec explications du projet
- [x] créer le docker-compose / containers pour chaque partie de l'app
- [x] mettre en place intégration continue (gh actions: lint/format/test on push/pull; peut-être pre-hooks commits ? pas décider encore...)
- [x] connecter les bases de données (postgresql): local pour dev
- [] scripts population des bases et création de quelques users
- [] voir pour déploiement continue (quand il y aura qqchose à déployer)
- [] connecter les bases de données de prod projet google cloud (idem plus tard)

#### En Cours:

Frontend:
- [x] Page Accueil
- [x] pages auth: login page, node, Oauth...
- [x] tests unitaires: pages accueil, login, register
- ... cf. Readme front

Backend:
- [] auth et user models
- ... cf. Readme back
