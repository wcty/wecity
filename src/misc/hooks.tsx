import React from 'react'
import { useState, useEffect } from 'react'
import { defaultLang } from './i18n'
import { useRecoilValue } from 'recoil'
import * as atoms from 'misc/recoil/atoms'
import { useApolloClient, gql } from '@apollo/client'

export function useLocation() {
  const defaultValue = {longitude: 30.5234, latitude: 50.4501}
  const [location, setLocation] = useState(defaultValue)
  
  useEffect(()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const updateLocation = position.coords.longitude?{
          longitude: position.coords.longitude, latitude: position.coords.latitude}:defaultValue
        setLocation(updateLocation);
      })
    }
  }, [ defaultValue ])

  return location
}

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
  type MapSchema<T extends Record<string, string>> = {
    -readonly [K in keyof T]: string
  }

  let dataObject = {...defaultLang} as const;
  type i18n = MapSchema<typeof dataObject>

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

  return function getI18n <K extends keyof i18n> (key:K, params?:any):i18n[K] {
    if (params===false || params || params === 0) {
        let i18nKey = i18nData[key];
        const choiceRegex = /{#choice.*#}/g;

        if(typeof params !== 'object'){
          if(i18nKey){
            i18nKey = i18nKey.replace('{0}', params);
          }
          Choice(params, i18nKey, choiceRegex)
        }else{
          for (let i = 0; i < params.length; i++) {
            if(i18nKey){
              i18nKey = i18nKey.replace(`{${i}}`, params[i]);
            }
            Choice(params[i], i18nKey, choiceRegex)
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

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
