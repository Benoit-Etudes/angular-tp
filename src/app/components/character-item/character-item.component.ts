import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CharacterI} from '@/interfaces/character.interface';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-character-item',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.css'
})
export class CharacterItemComponent {
  private router = inject(Router);
  @Input({required: true}) character!: CharacterI;

  onShowCharacter(characterId: number): void {
    this.router.navigateByUrl(`characters/${characterId}`);
  }
}
