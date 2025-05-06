import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const appTitle = "TP Angular";

export const routes: Routes = [
  {
    path: "",
    title: `Accueil - ${appTitle}`,
    pathMatch: "full",
    loadComponent: () => import("@/components/landing-page/landing-page.component").then(m => m.LandingPageComponent)
  },
  {
    path:"dashboard",
    title:`Tableau de bord - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/dashboard/dashboard.component").then(m => m.DashboardComponent)
  },
  {
    path: "episodes",
    title: `Liste des épisodes - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/episodes/episodes.component").then(m => m.EpisodesComponent)
  },
  {
    path:"episodes/:episodeId",
    title:`Episode - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/episode/episode.component").then(m => m.EpisodeComponent)
  },
  {
    path: "auth",
    loadChildren: () => import("./routes/auth.routes").then(m => m.authRoutes)
  },
  {
    path:"erreur/404",
    title: `Erreur 404 - ${appTitle}`,
    loadComponent: () => import("@/components/error/error.component").then(m => m.ErrorComponent)
  },
  {
    path:"**",
    redirectTo: "erreur/404"
  }
];
