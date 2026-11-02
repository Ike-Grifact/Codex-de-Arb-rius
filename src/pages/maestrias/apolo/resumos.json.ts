import {apoloMaestrias} from "../../../data/apolo-maestrias.mjs";
export const GET=()=>new Response(JSON.stringify(Object.fromEntries(apoloMaestrias.map(item=>[item.slug,{
slug:item.slug,name:item.name,headline:item.headline,kind:item.kind,stage:item.stage,costs:item.costs,
stats:item.stats,rules:item.rules,warning:item.warning,sourceName:item.sourceName
}]))),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=3600"}});
