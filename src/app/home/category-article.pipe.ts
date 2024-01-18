import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleCategoryColorPipe'
})

export class ArticleCategoryColorPipe implements PipeTransform {

  transform(category: string): string {
    let color: string = 'grey lighten-1';  // Default color value

    switch (category) {
      case 'Default':
        color = 'grey lighten-1';
        break;
      case 'Cat 1':
        color = 'deep-orange darken-1';
        break;
      case 'Cat 2':
        color = 'deep-orange darken-1';
        break;
      case 'Cat 3':
        color = 'deep-orange darken-1';
        break;
      case 'Cat 4':
        color = 'deep-orange darken-1';
        break;
      case 'Cat 5':
        color = 'deep-orange darken-1';
        break;
    }

    return 'new badge ' + color;
  }
}
