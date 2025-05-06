import {Component, inject, OnInit} from '@angular/core';
import {CharacterService} from '@/services/character.service';
import {CharacterItemComponent} from '@/components/character-item/character-item.component';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CharacterItemComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  protected characterService = inject(CharacterService);

  ngOnInit(): void {
    this.characterService.fetchCharactersList(1);
  }
}
