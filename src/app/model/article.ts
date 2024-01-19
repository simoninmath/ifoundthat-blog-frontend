export class Article {
    id!: number;
    title :string;
    chapo :string;
    content :string;
    picture :string;
    categories :string[];
    createdAt :Date;
    updatedAt :Date;
    slug :string;
  //  isPublished! :string;

  // Define default value for article Object 
  constructor(
    title: string = '',
    chapo: string = '',
    content: string = '',
    picture: string = '',
    categories: string[] = ['Categorie 1', 'Categorie 2', 'Categorie 3', 'Categorie 4', 'Categorie 5'],
    createdAt: Date = new Date,
    updatedAt: Date = new Date,
    slug :string = ''
    ){
    
    this.title = title;
    this.chapo = chapo;
    this.content = content;
    this.picture = picture;
    this.categories = categories;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.slug = slug;
  }
}