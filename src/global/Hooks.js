
import React, { useState, useEffect, useMemo } from 'react'
import * as geofirestore from 'geofirestore';
import { useFirestore } from 'reactfire';
import en from 'i18n/en.js'
import uk from 'i18n/uk.js'
import ka from 'i18n/ka.js'
import fi from 'i18n/fi.js'
import { useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'

export function useGeoFirestore() {
  const firestore = useFirestore()    //.settings({ experimentalForceLongPolling: true });
  const [GeoFirestore] = useState(geofirestore.initializeApp(firestore));
  return GeoFirestore;
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
  }, [navigator, navigator.geolocation ])

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
    if (params || params === 0) {
        let i18nKey = i18nData[key];
  
        if (typeof params !== 'object') {
            i18nKey = i18nKey.replace('{0}', params);
        } else {
            for (let i = 0; i < params.length; i++) {
                i18nKey = i18nKey.replace(`{${i}}`, params[i]);
            }
        }
        const choiceRegex = /{choice[a-zA-Z0-9{}\s<>=|#]+}/g;
        const choicesRegex = /#[<>=0-9a-zA-Z|\s]+#/g
        
        if (i18nKey.match(choiceRegex)) {
            for (const choicePattern of i18nKey.match(choiceRegex)) {
                const decisionMaker = parseInt(choicePattern.replace(choicesRegex, '')
                                                   .replace('{choice', '')
                                                   .replace('}', '')
                                                   .trim(), 10);
        
                const choices = choicePattern.match(choicesRegex)[0]
                                             .replace(/#/g, '');
        
                const operators = choices.match(/[<>=]+/g);
                const numbers = choices.match(/[0-9]+/g).map(num => parseInt(num, 10));
                const words = choices.match(/[a-zA-Z]+/g);
        
                let indexToUse = 0;
        
                for (let i = 0; i < words.length; i++) {
                    switch (operators[i]) {
                        case '<':  indexToUse = numbers[i] < decisionMaker ? i : indexToUse; break;
                        case '>':  indexToUse = numbers[i] > decisionMaker ? i : indexToUse; break;
                        case '<=': indexToUse = numbers[i] <= decisionMaker ? i : indexToUse; break;
                        case '>=': indexToUse = numbers[i] >= decisionMaker ? i : indexToUse; break;
                        case '=':  indexToUse = numbers[i] === decisionMaker ? i : indexToUse; break;
                        default: indexToUse = numbers[i] === decisionMaker ? i : indexToUse; break;
                    }
                }
        
                i18nKey = i18nKey.replace(choicePattern, [decisionMaker, words[indexToUse]].join(' '));
            }
        }
        return i18nKey;
    } else {
        return i18nData[key];
    }
  };
}