
import { useState, useEffect } from 'react'
import en from 'i18n/en'
import uk from 'i18n/uk'
import ka from 'i18n/ka'
import fi from 'i18n/fi'
import { useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'

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



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
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