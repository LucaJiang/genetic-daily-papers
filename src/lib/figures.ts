import type {CollectionEntry} from 'astro:content';
import {figuresFor,assetFor,figureKind} from './review-figures.mjs';
export type FigureKind='real-data'|'validation'|'workflow'|'simulation'|'resource';
export type PaperFigure={id:string;url?:string;assetPath:string;alt:string;label?:string;caption:string;credit:string;sourceUrl:string;license?:string;kind?:FigureKind};
export function figuresForPaper(paper:CollectionEntry<'papers'>):PaperFigure[]{return figuresFor(paper.data,paper.id) as PaperFigure[];}
export function figureAssetUrl(url:string):string{return assetFor({url});}
export function figureKindLabel(kind?:FigureKind):string{return figureKind(kind);}
export function figureTitle(f:PaperFigure,index:number):string{return f.label??`Figure ${index+1}`;}
export function figureReference(f:PaperFigure,index:number):string{return `Figure ${f.sourceUrl.match(/\/figures\/(\d+)/)?.[1]??index+1}`;}
