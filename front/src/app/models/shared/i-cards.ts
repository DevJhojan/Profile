export enum TypeApp {
  WEB,
  APPLICATION,
  GAME,
}
export interface ICardProjects {
  img: string;
  name: string;
  tool: string;
  state: string;
  type: TypeApp;
  url: string;
  imgs: string[];
}
export class CardProjects implements ICardProjects {
  img: string;
  name: string;
  tool: string;
  state: string;
  type: TypeApp;
  url: string;
  imgs: string[];
  constructor(
    img: string = '',
    name: string = '',
    tool: string = '',
    state: string = '',
    type: TypeApp = TypeApp.WEB,
    url: string = '',
    imgs = ['']
  ) {
    this.img = img;
    this.name = name;
    this.tool = tool;
    this.state = state;
    this.type = type;
    this.url = url;
    this.imgs = imgs;
  }
}
export interface ICardNormal {
  h2: string;
  items?: string[];
  itemsObject?: ItemsObjetc[];
}
export interface ItemsObjetc {
  name: string;
  img: string;
  url?: string;
}
export class CardNormal implements ICardNormal {
  h2: string;
  items: string[];
  itemsObject?: ItemsObjetc[];
  constructor(
    h2: string = '',
    items: string[] = [],
    itemsObject: ItemsObjetc[] = []
  ) {
    this.h2 = h2;
    this.items = items;
    this.itemsObject = itemsObject;
  }
}
