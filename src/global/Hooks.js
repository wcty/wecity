
import { useState, useEffect } from 'react'
import en from 'i18n/en.js'
import uk from 'i18n/uk.js'
import ka from 'i18n/ka.js'
import fi from 'i18n/fi.js'
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

const languages = {
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

  return (key, params) => {
    if (params===false || params || params === 0) {
        let i18nKey = i18nData[key];
        const choiceRegex = /{#choice.*#}/g;

        if(typeof params !== 'object'){
          if(i18nKey){
            i18nKey = i18nKey.replace('{0}', params);
          }
          Choice(params)
        }else{
          for (let i = 0; i < params.length; i++) {
            if(i18nKey){
              i18nKey = i18nKey.replace(`{${i}}`, params[i]);
            }
            Choice(params[i])
          }
        }
        function Choice(value){
          if (i18nKey && i18nKey.match(choiceRegex)) {
            for (const choicePattern of i18nKey.match(choiceRegex)) {
              const choices = choicePattern.replace('{#choice','').replace('#}','').split('|')
              //console.log(choices, choicePattern, value)
              if(i18nKey){
                i18nKey = i18nKey.replace(choicePattern, choices[!value?0:1]);
              }
            }
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