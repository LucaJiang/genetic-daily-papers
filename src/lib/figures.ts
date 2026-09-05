/** Backwards-compatible exports for older components; all new logic is shared. */
import type { CollectionEntry } from 'astro:content';
import { figuresFor, assetFor, figureKind } from './review-figures.mjs';
export type FigureKind='real-data'|'validation'|'workflow'|'simulation'|'resource';
export type PaperFigure={id:string;url?:string;assetPath:string;alt:string;label?:string;caption:string;credit:string;sourceUrl:string;license?:string;kind?:FigureKind};
export function figuresForPaper(paper:CollectionEntry<'papers'>):PaperFigure[]{return figuresFor(paper.data,paper.id) as PaperFigure[];}
export function figureAssetUrl(figure:PaperFigure):string{return assetFor(figure);}
export function figureKindLabel(kind?:FigureKind):string{return figureKind(kind);}
export function figureReference(figure:PaperFigure,index:number):string{
 const match=figure.label?.match(/Figure\s*(\d+[A-Za-z]?)/i);
 return match?`Figure ${match[1]}`:`Figure ${index+1}`;
}
export function figureTitle(figure:PaperFigure,index:number):string{return figure.label??`Figure ${index+1}`;}
