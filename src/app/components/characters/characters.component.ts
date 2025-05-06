import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CharacterService} from '@/services/character.service';
import {CharacterI} from '@/interfaces/character.interface';
import {CharacterItemComponent} from '@/components/character-item/character-item.component';
import {ResponseInfoI} from '@/interfaces/api/rickandmorty.interface';

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
  page: WritableSignal<number> = signal(1);
  infos: WritableSignal<ResponseInfoI> = this.characterService.infos;

  ngOnInit(): void {
    this.charactersList.set(this.characterService.getCharactersList());
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.charactersList.set(this.characterService.getCharactersList(this.page()));
  }
}
