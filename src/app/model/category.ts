export class Category {
    id! :number;
    name! :string;
    label! :string;

    constructor(
      name: string = '', 
      label: string = '', 
    ){
      this.name = name;
      this.label = label;
    }

  }