import { useState, useEffect } from 'react'
import { default as defaultLang } from './defaultLang.json'
import { useRecoilValue } from 'recoil'
import { atoms } from 'misc'
import { useApolloClient, gql } from '@apollo/client'

export type MapSchema<T extends Record<string, string>> = {
  -readonly [K in keyof T]: string
}

const dataObject = {...defaultLang} as const;

type i18n = MapSchema<typeof dataObject>

export type I18nGetter = <K extends keyof i18n> (key:K, params?:any)=>i18n[K] 

export const useI18n = ()=>{
  const lang = useRecoilValue(atoms.lang)
  const client = useApolloClient()

  const DICTIONARY = (l:String)=> gql`
    query Dictionary{
      i18n(order_by: {key: asc}) {
        ${l}
        key
      }
    }
  `
  const [i18nData, setI18nData] = useState<i18n>({...defaultLang})

  useEffect(()=>{
    client?.query({
      query : DICTIONARY(lang)
    }).then((data)=>{
      const langObject:i18n = data.data.i18n.reduce((a:any,b:any)=>{
        const {key, ...value} = b
        a[key]=Object.values(value)[0]
        return a
      }, {})
      console.log(data, langObject)

      setI18nData(langObject)
    })
  },[lang, client])


  return function getI18n<K extends keyof i18n>(key:K, ...params:(number|string|boolean)[]):i18n[K] {
    if ( params.length > 0) {
        let i18nKey = i18nData[key];
        const choiceRegex = /{#choice.*#}/g;
        if( i18nKey ) {
          for (let i = 0; i < params.length - 1; i++) {
            if( typeof params[i] !== 'boolean' ){
              i18nKey = i18nKey.replace(`{${i}}`, String(params[i]));
            }else{
              Choice(params[i], i18nKey, choiceRegex)
            }
          } 
        }
        return i18nKey;
    }else{
        return i18nData[key];
    }
  }
}

function Choice(value:any, i18nKey:String, choiceRegex:RegExp){
  for (const choicePattern of i18nKey.match(choiceRegex)??[]) {
    const choices = choicePattern.replace('{#choice','').replace('#}','').split('|')
    if(i18nKey){
      i18nKey = i18nKey.replace(choicePattern, choices[!value?0:1]);
    }
  }
}
