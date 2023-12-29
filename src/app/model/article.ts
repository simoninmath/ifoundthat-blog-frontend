import { Category } from "./category";
export class Article {
    id! :number;
    title! :string;
    content! :string;
    picture! :string;
    slug! :string;
   /*  isPublished! :string;
    updatedAt! :string;*/
    category! : string;
}