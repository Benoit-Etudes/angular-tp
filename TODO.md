# TODO
- ✅ Service, interface et model pour l'épisode (voir api Rick and Morty)
- ✅ Récupérer tous les épisodes
- ✅ Boucler sur les épisodes (et récupérer les personnages ?)
- ✅ Pour chaque personnage de chaque épisode, afficher son image. Format de l'url : https://rickandmortyapi.com/api/character/avatar/{ID}.jpeg
- Se connecter à l'API de la NASA pour récupérer les images du jour (https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY)
- Afficher les images du jour de la NASA

# Consignes
- [ ] Créer un nouveau Service utilisant HttpClient pour interagir avec une API publique.
- [ ] Récupérer des données (une liste d'éléments) depuis l'API Rick and Morty [pas besoin de clé API] (https:/ /rickandmortyapi.com/) et sur une autre partie de l’application, depuis l’api de la NASA [clé API requise] (https:/ /api.nasa.gov).
- [ ] Créer un nouveau Composant pour afficher ces données.
- [X] Configurer le Routing pour accéder à ce composant.
- [ ] Protéger l'accès à la nouvelle page via un Guard existant (AuthGuard).
- [ ] Afficher la liste des éléments récupérés dans le composant.
- [X] Votre menu de navigation doit utiliser une structure conditionnelle, pour afficher uniquement les liens logiques, en fonction de l’état de connexion de l’utilisateur.
