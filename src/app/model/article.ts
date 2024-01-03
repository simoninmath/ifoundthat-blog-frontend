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
    categories: string[] = ['Cat 1'],
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