import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {CharacterService} from '@/services/character.service';
import {CharacterI} from '@/interfaces/character.interface';
import {EpisodeItemComponent} from '@/components/episode-item/episode-item.component';
import {CharacterItemComponent} from '@/components/character-item/character-item.component';

@Component({
  selector: 'app-characters',
  imports: [
    CharacterItemComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {
  private characterService = inject(CharacterService);

  charactersList: WritableSignal<CharacterI[]> = this.characterService.charactersList;

  ngOnInit(): void {
    this.charactersList.set(this.characterService.getCharactersList());
  }
}
