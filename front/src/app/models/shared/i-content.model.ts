import { TitleComponent } from '../../shared/components/title/title.component';
export interface IContent{
  titleButton: string;
  listContent?: ISubContend[];
  count: number;
}
export class  Content implements IContent{
  titleButton: string;
  listContent?: ISubContend[];
  count: number;

  constructor(titleButton: string = '', listContent: ISubContend[] = [] , count: number = 0){
    this.titleButton = titleButton;
    this.listContent = listContent;
    this.count = count; 
  }
}
export interface ISubContend{
  subTitle: string;
  description: string;
  date: string;
}
export class Subcontent implements ISubContend{
  subTitle: string;
  description: string;
  date: string;
  constructor (subTitle: string = '', description: string = '', date: string = ''){
    this.subTitle = subTitle;
    this.description =description;
    this.date = date;
  }
}
