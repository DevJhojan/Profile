export interface IContactInfo {
  name: string;
  url: string;
  icon?: string; // URL o nombre de icono opcional
}

export class ContactInfo implements IContactInfo {
  name: string;
  url: string;
  icon?: string;

  constructor(
    name: string = '',
    url: string = '',
    icon?: string
  ) {
    this.name = name;
    this.url = url;
    this.icon = icon;
  }
}

