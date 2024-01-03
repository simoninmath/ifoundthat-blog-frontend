import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleCategoryColorPipe'
})

export class ArticleCategoryColorPipe implements PipeTransform {

  transform(category: string): string {
    let color: string = 'grey lighten-1';  // Default color value

    switch (category) {
      case 'Default':
        color = 'red lighten-1';
        break;
      case 'Cat 1':
        color = 'blue lighten-1';
        break;
      case 'Cat 2':
        color = 'green lighten-2';
        break;
      case 'Cat 3':
        color = 'brown lighten-3';
        break;
      case 'Cat 4':
        color = 'grey lighten-1';
        break;
      case 'Cat 5':
        color = 'blue lighten-3';
        break;
    }

    return 'new badge ' + color;
  }
}
