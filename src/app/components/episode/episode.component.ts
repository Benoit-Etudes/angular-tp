import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodeService} from '@/services/episode.service';
import {EpisodeI} from '@/interfaces/episode.interface';

@Component({
  selector: 'app-episode',
  imports: [],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected episodeService = inject(EpisodeService);
  episode!: EpisodeI | undefined;

  ngOnInit(): void{
    let id: number = Number(this.route.snapshot.params["id"]);

    if(!id){
      this.router.navigateByUrl("erreur/404");
    }

    this.episode = this.episodeService.getEpisodeByID(id);
    if(!this.episode) {
      this.router.navigateByUrl("websnaps");
    }
  }
}
