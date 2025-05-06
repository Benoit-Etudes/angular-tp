import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodeService} from '@/services/episode.service';
import {EpisodeI} from '@/interfaces/episode.interface';
import {CharacterService} from '@/services/character.service';
import {CharacterI} from '@/interfaces/character.interface';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-character',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected characterService = inject(CharacterService);

  character: WritableSignal<CharacterI | null> = this.characterService.character;

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.params["characterId"]);

    if (!id) {
      this.router.navigateByUrl("erreur/404");
    }

    this.character.set(this.characterService.getCharacterByID(id));

    if (!this.character) {
      this.router.navigateByUrl("episodes");
    }
  }
}
