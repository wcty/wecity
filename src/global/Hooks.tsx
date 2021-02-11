
import { useState, useEffect, useRef } from 'react'
import en from 'i18n/en.js'
import uk from 'i18n/uk.js'
import ka from 'i18n/ka.js'
import fi from 'i18n/fi.js'
import { useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'

export function usePrevious(value:any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

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

//Languages have to be added also to Atom.ts/type Language and defineLang()  declaration
const languages:any = {
    en,
    uk,
    ka,
    fi
}


export const useI18n = ()=>{
  
  const lang = useRecoilValue(Atoms.lang)
  const [i18nData, setI18nData] = useState(languages[lang])
  useEffect(()=>{
    setI18nData(languages[lang])
  },[lang])
  // const TypesArray = typeof (([...Object.keys(en)] as const)[0])
  const AAA = (([...Object.keys(en)] as const)[0])
  type TypesArray = typeof AAA

  return function getI18n (key:TypesArray, params?:any) {
    
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
    //console.log(choices, choicePattern, value)
    if(i18nKey){
      i18nKey = i18nKey.replace(choicePattern, choices[!value?0:1]);
    }
  }
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}